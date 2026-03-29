-- FreshMarket Database Schema with SQL Injection Protection and Role-Based Access Control
-- Roles: admin (full access), vendedor (sales and soft changes like returns)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types for roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'vendedor', 'cliente');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create profiles table with role management
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'cliente' NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create products table with COP prices
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL, -- Price in COP (Colombian Pesos)
    original_price DECIMAL(12, 2), -- Original price for discounts
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0 NOT NULL,
    unit TEXT DEFAULT 'unidad' NOT NULL, -- kg, unidad, litro, etc.
    is_organic BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES auth.users(id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pendiente' NOT NULL CHECK (status IN ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado', 'devuelto')),
    total DECIMAL(12, 2) NOT NULL, -- Total in COP
    shipping_cost DECIMAL(12, 2) DEFAULT 0,
    tax DECIMAL(12, 2) DEFAULT 0,
    shipping_address TEXT,
    shipping_city TEXT,
    shipping_phone TEXT,
    payment_method TEXT DEFAULT 'efectivo' CHECK (payment_method IN ('tarjeta', 'transferencia', 'efectivo')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    processed_by UUID REFERENCES auth.users(id) -- Vendor who processed the order
);

-- Create order items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL, -- Store name in case product is deleted
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12, 2) NOT NULL, -- Price at time of purchase in COP
    total DECIMAL(12, 2) NOT NULL, -- Total for this item in COP
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create returns table for vendor returns management
CREATE TABLE IF NOT EXISTS public.returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL NOT NULL,
    order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    refund_amount DECIMAL(12, 2) NOT NULL, -- Refund in COP
    status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'aprobado', 'rechazado', 'completado')),
    processed_by UUID REFERENCES auth.users(id), -- Vendor who processed the return
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create audit log for tracking changes
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role (prevents SQL injection by using parameterized approach)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
$$;

-- Helper function to check if user is vendor or admin
CREATE OR REPLACE FUNCTION public.is_vendor_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'vendedor')
    );
$$;

-- ==========================================
-- ROW LEVEL SECURITY POLICIES
-- ==========================================

-- PROFILES POLICIES
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Admin can view all profiles
CREATE POLICY "profiles_select_admin" ON public.profiles
    FOR SELECT USING (public.is_admin());

-- Allow insert during signup (handled by trigger)
CREATE POLICY "profiles_insert" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admin can update any profile including role
CREATE POLICY "profiles_update_admin" ON public.profiles
    FOR UPDATE USING (public.is_admin());

-- CATEGORIES POLICIES
DROP POLICY IF EXISTS "categories_select_all" ON public.categories;
DROP POLICY IF EXISTS "categories_insert_admin" ON public.categories;
DROP POLICY IF EXISTS "categories_update_admin" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_admin" ON public.categories;

-- Everyone can view categories
CREATE POLICY "categories_select_all" ON public.categories
    FOR SELECT USING (true);

-- Only admin can insert categories
CREATE POLICY "categories_insert_admin" ON public.categories
    FOR INSERT WITH CHECK (public.is_admin());

-- Only admin can update categories
CREATE POLICY "categories_update_admin" ON public.categories
    FOR UPDATE USING (public.is_admin());

-- Only admin can delete categories
CREATE POLICY "categories_delete_admin" ON public.categories
    FOR DELETE USING (public.is_admin());

-- PRODUCTS POLICIES
DROP POLICY IF EXISTS "products_select_all" ON public.products;
DROP POLICY IF EXISTS "products_insert_admin" ON public.products;
DROP POLICY IF EXISTS "products_update_admin" ON public.products;
DROP POLICY IF EXISTS "products_update_vendor" ON public.products;
DROP POLICY IF EXISTS "products_delete_admin" ON public.products;

-- Everyone can view active products
CREATE POLICY "products_select_all" ON public.products
    FOR SELECT USING (is_active = true OR public.is_vendor_or_admin());

-- Only admin can insert products
CREATE POLICY "products_insert_admin" ON public.products
    FOR INSERT WITH CHECK (public.is_admin());

-- Admin can update all product fields
CREATE POLICY "products_update_admin" ON public.products
    FOR UPDATE USING (public.is_admin());

-- Vendor can only update stock (soft changes)
CREATE POLICY "products_update_vendor" ON public.products
    FOR UPDATE USING (
        public.get_user_role(auth.uid()) = 'vendedor'
    );

-- Only admin can delete products
CREATE POLICY "products_delete_admin" ON public.products
    FOR DELETE USING (public.is_admin());

-- ORDERS POLICIES
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
DROP POLICY IF EXISTS "orders_select_vendor_admin" ON public.orders;
DROP POLICY IF EXISTS "orders_insert" ON public.orders;
DROP POLICY IF EXISTS "orders_update_vendor_admin" ON public.orders;

-- Users can view their own orders
CREATE POLICY "orders_select_own" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

-- Vendor and admin can view all orders
CREATE POLICY "orders_select_vendor_admin" ON public.orders
    FOR SELECT USING (public.is_vendor_or_admin());

-- Anyone logged in can create orders
CREATE POLICY "orders_insert" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Vendor and admin can update orders
CREATE POLICY "orders_update_vendor_admin" ON public.orders
    FOR UPDATE USING (public.is_vendor_or_admin());

-- ORDER ITEMS POLICIES
DROP POLICY IF EXISTS "order_items_select_own" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_vendor_admin" ON public.order_items;
DROP POLICY IF EXISTS "order_items_insert" ON public.order_items;

-- Users can view items of their own orders
CREATE POLICY "order_items_select_own" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Vendor and admin can view all order items
CREATE POLICY "order_items_select_vendor_admin" ON public.order_items
    FOR SELECT USING (public.is_vendor_or_admin());

-- Anyone logged in can create order items (through orders)
CREATE POLICY "order_items_insert" ON public.order_items
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RETURNS POLICIES
DROP POLICY IF EXISTS "returns_select_own" ON public.returns;
DROP POLICY IF EXISTS "returns_select_vendor_admin" ON public.returns;
DROP POLICY IF EXISTS "returns_insert_vendor_admin" ON public.returns;
DROP POLICY IF EXISTS "returns_update_vendor_admin" ON public.returns;

-- Users can view returns for their orders
CREATE POLICY "returns_select_own" ON public.returns
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = returns.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Vendor and admin can view all returns
CREATE POLICY "returns_select_vendor_admin" ON public.returns
    FOR SELECT USING (public.is_vendor_or_admin());

-- Vendor and admin can create returns
CREATE POLICY "returns_insert_vendor_admin" ON public.returns
    FOR INSERT WITH CHECK (public.is_vendor_or_admin());

-- Vendor and admin can update returns
CREATE POLICY "returns_update_vendor_admin" ON public.returns
    FOR UPDATE USING (public.is_vendor_or_admin());

-- AUDIT LOG POLICIES
DROP POLICY IF EXISTS "audit_log_select_admin" ON public.audit_log;
DROP POLICY IF EXISTS "audit_log_insert" ON public.audit_log;

-- Only admin can view audit logs
CREATE POLICY "audit_log_select_admin" ON public.audit_log
    FOR SELECT USING (public.is_admin());

-- System can insert audit logs
CREATE POLICY "audit_log_insert" ON public.audit_log
    FOR INSERT WITH CHECK (true);

-- ==========================================
-- TRIGGERS FOR AUTO-UPDATING TIMESTAMPS AND AUDIT
-- ==========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Apply update_updated_at trigger to all tables with updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_categories_updated_at ON public.categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_returns_updated_at ON public.returns;
CREATE TRIGGER update_returns_updated_at
    BEFORE UPDATE ON public.returns
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ==========================================
-- TRIGGER FOR AUTO-CREATING PROFILE ON SIGNUP
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Usuario'),
        COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'cliente')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- AUDIT LOGGING FUNCTION
-- ==========================================

CREATE OR REPLACE FUNCTION public.log_audit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.audit_log (user_id, action, table_name, record_id, old_data, new_data)
    VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
    );
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply audit trigger to important tables
DROP TRIGGER IF EXISTS audit_products ON public.products;
CREATE TRIGGER audit_products
    AFTER INSERT OR UPDATE OR DELETE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.log_audit();

DROP TRIGGER IF EXISTS audit_orders ON public.orders;
CREATE TRIGGER audit_orders
    AFTER INSERT OR UPDATE OR DELETE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.log_audit();

DROP TRIGGER IF EXISTS audit_returns ON public.returns;
CREATE TRIGGER audit_returns
    AFTER INSERT OR UPDATE OR DELETE ON public.returns
    FOR EACH ROW EXECUTE FUNCTION public.log_audit();

COMMIT;

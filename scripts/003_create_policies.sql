-- ROW LEVEL SECURITY POLICIES

-- PROFILES POLICIES
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;

CREATE POLICY "profiles_select_own" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_admin" ON public.profiles
    FOR SELECT USING (public.is_admin());

CREATE POLICY "profiles_insert" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_update_admin" ON public.profiles
    FOR UPDATE USING (public.is_admin());

-- CATEGORIES POLICIES
DROP POLICY IF EXISTS "categories_select_all" ON public.categories;
DROP POLICY IF EXISTS "categories_insert_admin" ON public.categories;
DROP POLICY IF EXISTS "categories_update_admin" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_admin" ON public.categories;

CREATE POLICY "categories_select_all" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "categories_insert_admin" ON public.categories
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "categories_update_admin" ON public.categories
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "categories_delete_admin" ON public.categories
    FOR DELETE USING (public.is_admin());

-- PRODUCTS POLICIES
DROP POLICY IF EXISTS "products_select_all" ON public.products;
DROP POLICY IF EXISTS "products_insert_admin" ON public.products;
DROP POLICY IF EXISTS "products_update_admin" ON public.products;
DROP POLICY IF EXISTS "products_update_vendor" ON public.products;
DROP POLICY IF EXISTS "products_delete_admin" ON public.products;

CREATE POLICY "products_select_all" ON public.products
    FOR SELECT USING (is_active = true OR public.is_vendor_or_admin());

CREATE POLICY "products_insert_admin" ON public.products
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "products_update_admin" ON public.products
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "products_update_vendor" ON public.products
    FOR UPDATE USING (public.get_user_role(auth.uid()) = 'vendedor');

CREATE POLICY "products_delete_admin" ON public.products
    FOR DELETE USING (public.is_admin());

-- ORDERS POLICIES
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
DROP POLICY IF EXISTS "orders_select_vendor_admin" ON public.orders;
DROP POLICY IF EXISTS "orders_insert" ON public.orders;
DROP POLICY IF EXISTS "orders_update_vendor_admin" ON public.orders;

CREATE POLICY "orders_select_own" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "orders_select_vendor_admin" ON public.orders
    FOR SELECT USING (public.is_vendor_or_admin());

CREATE POLICY "orders_insert" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "orders_update_vendor_admin" ON public.orders
    FOR UPDATE USING (public.is_vendor_or_admin());

-- ORDER ITEMS POLICIES
DROP POLICY IF EXISTS "order_items_select_own" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_vendor_admin" ON public.order_items;
DROP POLICY IF EXISTS "order_items_insert" ON public.order_items;

CREATE POLICY "order_items_select_own" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "order_items_select_vendor_admin" ON public.order_items
    FOR SELECT USING (public.is_vendor_or_admin());

CREATE POLICY "order_items_insert" ON public.order_items
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RETURNS POLICIES
DROP POLICY IF EXISTS "returns_select_own" ON public.returns;
DROP POLICY IF EXISTS "returns_select_vendor_admin" ON public.returns;
DROP POLICY IF EXISTS "returns_insert_vendor_admin" ON public.returns;
DROP POLICY IF EXISTS "returns_update_vendor_admin" ON public.returns;

CREATE POLICY "returns_select_own" ON public.returns
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = returns.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "returns_select_vendor_admin" ON public.returns
    FOR SELECT USING (public.is_vendor_or_admin());

CREATE POLICY "returns_insert_vendor_admin" ON public.returns
    FOR INSERT WITH CHECK (public.is_vendor_or_admin());

CREATE POLICY "returns_update_vendor_admin" ON public.returns
    FOR UPDATE USING (public.is_vendor_or_admin());

-- AUDIT LOG POLICIES
DROP POLICY IF EXISTS "audit_log_select_admin" ON public.audit_log;
DROP POLICY IF EXISTS "audit_log_insert" ON public.audit_log;

CREATE POLICY "audit_log_select_admin" ON public.audit_log
    FOR SELECT USING (public.is_admin());

CREATE POLICY "audit_log_insert" ON public.audit_log
    FOR INSERT WITH CHECK (true);

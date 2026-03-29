-- SEED DATA: Categories and Products with COP prices

-- Insert categories
INSERT INTO public.categories (name, slug, image_url) VALUES
    ('Frutas', 'frutas', '/images/frutas.jpg'),
    ('Verduras', 'verduras', '/images/verduras.jpg'),
    ('Carnes', 'carnes', '/images/carnes.jpg'),
    ('Lácteos', 'lacteos', '/images/lacteos.jpg'),
    ('Panadería', 'panaderia', '/images/panaderia.jpg'),
    ('Bebidas', 'bebidas', '/images/bebidas.jpg'),
    ('Despensa', 'despensa', '/images/despensa.jpg'),
    ('Orgánicos', 'organicos', '/images/organicos.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Insert products with COP prices
INSERT INTO public.products (name, description, price, original_price, category_id, image_url, stock, unit, is_organic, is_active) VALUES
    -- Frutas
    ('Manzana Roja', 'Manzanas rojas frescas importadas', 4500.00, 5000.00, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/manzana.jpg', 100, 'kg', false, true),
    ('Banano', 'Bananos maduros del Urabá', 2800.00, NULL, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/banano.jpg', 150, 'kg', false, true),
    ('Naranja Valencia', 'Naranjas dulces para jugo', 3200.00, 3800.00, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/naranja.jpg', 80, 'kg', false, true),
    ('Fresa', 'Fresas frescas de tierra fría', 8500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/fresa.jpg', 40, 'kg', true, true),
    ('Mango Tommy', 'Mangos dulces y jugosos', 5500.00, 6200.00, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/mango.jpg', 60, 'kg', false, true),
    ('Papaya', 'Papaya madura lista para consumir', 4200.00, NULL, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/papaya.jpg', 35, 'kg', false, true),
    ('Uvas Rojas', 'Uvas rojas sin semilla', 12500.00, 14000.00, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/uvas.jpg', 25, 'kg', false, true),
    ('Piña Gold', 'Piña dulce variedad Gold', 6800.00, NULL, (SELECT id FROM public.categories WHERE slug = 'frutas'), '/images/pina.jpg', 30, 'unidad', false, true),
    
    -- Verduras
    ('Tomate Chonto', 'Tomates rojos maduros', 3800.00, 4200.00, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/tomate.jpg', 90, 'kg', false, true),
    ('Cebolla Cabezona', 'Cebolla blanca de primera', 2500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/cebolla.jpg', 120, 'kg', false, true),
    ('Papa Pastusa', 'Papa amarilla pastusa', 2800.00, 3200.00, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/papa.jpg', 200, 'kg', false, true),
    ('Zanahoria', 'Zanahorias frescas', 3200.00, NULL, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/zanahoria.jpg', 80, 'kg', false, true),
    ('Lechuga Batavia', 'Lechuga fresca hidropónica', 2200.00, 2800.00, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/lechuga.jpg', 50, 'unidad', true, true),
    ('Pepino', 'Pepinos frescos crujientes', 3500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/pepino.jpg', 45, 'kg', false, true),
    ('Aguacate Hass', 'Aguacate Hass premium', 9800.00, 11000.00, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/aguacate.jpg', 40, 'kg', false, true),
    ('Pimentón Rojo', 'Pimentón rojo dulce', 7500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'verduras'), '/images/pimenton.jpg', 35, 'kg', false, true),
    
    -- Carnes
    ('Pechuga de Pollo', 'Pechuga de pollo fresca', 16500.00, 18000.00, (SELECT id FROM public.categories WHERE slug = 'carnes'), '/images/pechuga.jpg', 50, 'kg', false, true),
    ('Carne Molida', 'Carne molida de res premium', 19800.00, NULL, (SELECT id FROM public.categories WHERE slug = 'carnes'), '/images/carne-molida.jpg', 40, 'kg', false, true),
    ('Lomo de Cerdo', 'Lomo de cerdo fresco', 21500.00, 24000.00, (SELECT id FROM public.categories WHERE slug = 'carnes'), '/images/lomo.jpg', 30, 'kg', false, true),
    ('Costilla de Res', 'Costilla de res para asar', 18500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'carnes'), '/images/costilla.jpg', 35, 'kg', false, true),
    ('Muslos de Pollo', 'Muslos de pollo frescos', 12800.00, 14500.00, (SELECT id FROM public.categories WHERE slug = 'carnes'), '/images/muslos.jpg', 55, 'kg', false, true),
    
    -- Lácteos
    ('Leche Entera', 'Leche entera pasteurizada', 4200.00, NULL, (SELECT id FROM public.categories WHERE slug = 'lacteos'), '/images/leche.jpg', 80, 'litro', false, true),
    ('Queso Campesino', 'Queso campesino fresco', 14500.00, 16000.00, (SELECT id FROM public.categories WHERE slug = 'lacteos'), '/images/queso.jpg', 40, 'kg', false, true),
    ('Yogurt Natural', 'Yogurt natural sin azúcar', 5800.00, NULL, (SELECT id FROM public.categories WHERE slug = 'lacteos'), '/images/yogurt.jpg', 60, 'litro', false, true),
    ('Mantequilla', 'Mantequilla sin sal', 8500.00, 9200.00, (SELECT id FROM public.categories WHERE slug = 'lacteos'), '/images/mantequilla.jpg', 45, 'unidad', false, true),
    ('Huevos AA', 'Huevos AA x 30 unidades', 18500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'lacteos'), '/images/huevos.jpg', 100, 'unidad', false, true),
    
    -- Panadería
    ('Pan Integral', 'Pan integral artesanal', 6800.00, 7500.00, (SELECT id FROM public.categories WHERE slug = 'panaderia'), '/images/pan-integral.jpg', 30, 'unidad', true, true),
    ('Croissant', 'Croissants de mantequilla', 3500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'panaderia'), '/images/croissant.jpg', 40, 'unidad', false, true),
    ('Pan Francés', 'Pan francés crujiente', 1200.00, 1500.00, (SELECT id FROM public.categories WHERE slug = 'panaderia'), '/images/pan-frances.jpg', 60, 'unidad', false, true),
    
    -- Bebidas
    ('Agua Natural 600ml', 'Agua natural embotellada', 1800.00, NULL, (SELECT id FROM public.categories WHERE slug = 'bebidas'), '/images/agua.jpg', 200, 'unidad', false, true),
    ('Jugo de Naranja', 'Jugo de naranja 100% natural', 8500.00, 9500.00, (SELECT id FROM public.categories WHERE slug = 'bebidas'), '/images/jugo-naranja.jpg', 50, 'litro', false, true),
    ('Gaseosa Cola 2L', 'Gaseosa sabor cola', 6200.00, NULL, (SELECT id FROM public.categories WHERE slug = 'bebidas'), '/images/gaseosa.jpg', 80, 'unidad', false, true),
    
    -- Despensa
    ('Arroz Premium', 'Arroz blanco premium x 1kg', 4800.00, 5200.00, (SELECT id FROM public.categories WHERE slug = 'despensa'), '/images/arroz.jpg', 150, 'kg', false, true),
    ('Aceite de Oliva', 'Aceite de oliva extra virgen', 32000.00, 36000.00, (SELECT id FROM public.categories WHERE slug = 'despensa'), '/images/aceite.jpg', 40, 'litro', false, true),
    ('Pasta Spaghetti', 'Pasta spaghetti x 500g', 4500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'despensa'), '/images/pasta.jpg', 100, 'unidad', false, true),
    ('Azúcar', 'Azúcar blanca refinada x 1kg', 3200.00, 3800.00, (SELECT id FROM public.categories WHERE slug = 'despensa'), '/images/azucar.jpg', 120, 'kg', false, true),
    
    -- Orgánicos
    ('Manzana Orgánica', 'Manzanas orgánicas certificadas', 8500.00, 9500.00, (SELECT id FROM public.categories WHERE slug = 'organicos'), '/images/manzana-organica.jpg', 30, 'kg', true, true),
    ('Espinaca Orgánica', 'Espinaca baby orgánica', 6800.00, NULL, (SELECT id FROM public.categories WHERE slug = 'organicos'), '/images/espinaca.jpg', 25, 'unidad', true, true),
    ('Huevos Orgánicos', 'Huevos de gallinas libres x 12', 15500.00, 17000.00, (SELECT id FROM public.categories WHERE slug = 'organicos'), '/images/huevos-organicos.jpg', 35, 'unidad', true, true),
    ('Quinoa', 'Quinoa orgánica x 500g', 12500.00, NULL, (SELECT id FROM public.categories WHERE slug = 'organicos'), '/images/quinoa.jpg', 40, 'unidad', true, true)
ON CONFLICT DO NOTHING;

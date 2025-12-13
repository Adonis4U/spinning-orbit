# 🗄️ Database Schema - Supabase

> **Database:** PostgreSQL via Supabase  
> **RLS:** Row Level Security abilitato

---

## 📋 Tabelle Principali

### `products`
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2),
    category_id UUID REFERENCES categories(id),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

### `categories`
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### `product_images`
```sql
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR NOT NULL,
    alt VARCHAR,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0
);
```

### `product_variants`
```sql
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR,
    color VARCHAR,
    stock INTEGER DEFAULT 0,
    sku VARCHAR UNIQUE
);
```

### `users` (gestito da Supabase Auth)
```sql
-- auth.users (Supabase managed)
-- Estensione profilo:
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name VARCHAR,
    venus_sign VARCHAR,
    ascending_sign VARCHAR,
    date_of_birth DATE,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### `orders`
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    status VARCHAR DEFAULT 'pending',
    total DECIMAL(10,2) NOT NULL,
    shipping_address JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### `order_items`
```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
```

---

## 🔒 Policies RLS

### Products (pubblico in lettura)
```sql
CREATE POLICY "Products are viewable by everyone"
ON products FOR SELECT
USING (is_active = true);
```

### Orders (solo proprietario)
```sql
CREATE POLICY "Users can view own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);
```

---

## 🔑 Edge Function Secrets

| Nome | Descrizione |
|------|-------------|
| GOOGLE_GEO_API_KEY | Google Geocoding API |
| SUPADB_URL | URL Database |
| SUPADB_ANON_KEY | Chiave anonima |
| SUPADB_SERVICE_ROLE_KEY | Chiave service role |

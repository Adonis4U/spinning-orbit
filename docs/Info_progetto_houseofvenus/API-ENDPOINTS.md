# 🔌 API & Endpoints

> **Backend:** Supabase (PostgreSQL + Edge Functions)  
> **Geocoding:** Nominatim + Google (fallback)

---

## 🗄️ Supabase API

### Products

```typescript
// Get all products
const { data } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('is_active', true);

// Get single product
const { data } = await supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .eq('slug', slug)
    .single();

// Get by category
const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId);
```

### Categories

```typescript
// Get all categories
const { data } = await supabase
    .from('categories')
    .select('*')
    .order('name');
```

### Auth

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
});

// Sign out
await supabase.auth.signOut();

// Get session
const { data: { session } } = await supabase.auth.getSession();
```

---

## 🌍 Geocoding APIs

### Nominatim (OSM) - Primario

```typescript
// City search
const response = await fetch(
    `https://nominatim.openstreetmap.org/search?` +
    `format=json&q=${query}&countrycodes=${countryCode}&limit=5`,
    {
        headers: {
            'User-Agent': 'HouseOfVenus/1.0'
        }
    }
);

// Response
[{
    display_name: "Warszawa, Masovia, Poland",
    lat: "52.2297",
    lon: "21.0122"
}]
```

### Google Geocoding - Fallback

```typescript
const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?` +
    `address=${query}&components=country:${countryCode}&key=${API_KEY}`
);

// Response
{
    results: [{
        formatted_address: "Warsaw, Poland",
        geometry: {
            location: { lat: 52.2297, lng: 21.0122 }
        }
    }]
}
```

---

## 📊 Rate Limits

| API | Limite |
|-----|--------|
| Nominatim | 1 req/secondo |
| Google Geocoding | 50 req/secondo |
| Supabase (Free) | 500MB storage, 2GB transfer |

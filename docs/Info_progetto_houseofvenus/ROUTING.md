# 🗺️ Routing

> **Router:** React Router v6  
> **Tipo:** Client-side routing

---

## 📍 Route Pubbliche

| Path | Componente | Descrizione |
|------|------------|-------------|
| `/` | `Home` | Homepage |
| `/shop` | `Shop` | Catalogo prodotti |
| `/products/:slug` | `ProductDetail` | Dettaglio prodotto |
| `/collections/:slug` | `Collection` | Collezione zodiacale |
| `/venus-calculator` | `VenusCalculator` | Calcolatore Venere |
| `/lookbook/:sign` | `Lookbook` | Lookbook per segno |
| `/about` | `About` | Chi siamo |
| `/contact` | `Contact` | Contatti |

---

## 🔐 Route Auth

| Path | Componente | Descrizione |
|------|------------|-------------|
| `/login` | `Login` | Pagina login |
| `/register` | `Register` | Pagina registrazione |
| `/forgot-password` | `ForgotPassword` | Reset password |

---

## 🛡️ Route Protette

| Path | Componente | Requisito |
|------|------------|-----------|
| `/account` | `Account` | Auth required |
| `/account/orders` | `Orders` | Auth required |
| `/account/profile` | `Profile` | Auth required |
| `/cart` | `Cart` | (Opzionale auth) |
| `/wishlist` | `Wishlist` | (Opzionale auth) |
| `/checkout` | `Checkout` | Cart non vuoto |

---

## 🛠️ Route Admin

| Path | Componente | Requisito |
|------|------------|-----------|
| `/admin` | `AdminDashboard` | Admin role |
| `/admin/products` | `AdminProducts` | Admin role |
| `/admin/orders` | `AdminOrders` | Admin role |

---

## 📄 Configurazione Router

```tsx
// App.tsx
<Routes>
    {/* Public */}
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/venus-calculator" element={<VenusCalculator />} />
    
    {/* Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected */}
    <Route element={<ProtectedRoute />}>
        <Route path="/account" element={<Account />} />
    </Route>
    
    {/* 404 */}
    <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🔄 Navigation Guards

```tsx
// ProtectedRoute.tsx
function ProtectedRoute() {
    const { user, loading } = useAuth();
    
    if (loading) return <LoadingSpinner />;
    if (!user) return <Navigate to="/login" />;
    
    return <Outlet />;
}
```

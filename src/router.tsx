import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Loading component for lazy loaded pages
const PageLoader = () => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
    }}>
        <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid hsla(265, 72%, 62%, 0.2)',
            borderTopColor: 'hsl(265, 72%, 62%)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

// Import Shop directly (not lazy) to fix navigation issue
import Shop from './pages/Shop/Shop';

// Lazy load other pages for code splitting
const Home = lazy(() => import('./pages/Home/Home'));
const ProductDetail = lazy(() => import('./pages/Product/ProductDetail'));
const Collections = lazy(() => import('./pages/Collections/Collections'));
const CollectionDetail = lazy(() => import('./pages/Collections/CollectionDetail'));
const VenusCalculator = lazy(() => import('./pages/VenusCalculator/VenusCalculator'));
const AstroCalc = lazy(() => import('./pages/AstroCalc/AstroCalc'));
const Lookbook = lazy(() => import('./pages/Lookbook/Lookbook'));
const LookbookDetail = lazy(() => import('./pages/Lookbook/LookbookDetail'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
const VenusCompatibility = lazy(() => import('./pages/VenusCompatibility/VenusCompatibility'));

// Account pages
const Login = lazy(() => import('./pages/Account/Login'));
const Register = lazy(() => import('./pages/Account/Register'));
const AccountDashboard = lazy(() => import('./pages/Account/AccountDashboard'));
const OrderDetail = lazy(() => import('./pages/Account/OrderDetail'));

// Admin pages (new modular structure)
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const DashboardOverview = lazy(() => import('./pages/Admin/DashboardOverview'));
const ProductsManager = lazy(() => import('./pages/Admin/ProductsManager'));
const OrdersManager = lazy(() => import('./pages/Admin/OrdersManager'));
const CustomersManager = lazy(() => import('./pages/Admin/CustomersManager'));

// Venus Collections pages
const VenusCollections = lazy(() => import('./pages/VenusCollections/VenusCollections'));
const VenusSignDetail = lazy(() => import('./pages/VenusCollections/VenusSignDetail'));

// Static pages
const PrivacyPolicy = lazy(() => import('./pages/Static/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Static/Terms'));
const ShippingReturns = lazy(() => import('./pages/Static/ShippingReturns'));
const NotFound = lazy(() => import('./pages/Static/NotFound'));

// Preload critical pages
export function preloadCriticalPages() {
    // Preload Shop page as it's frequently accessed
    import('./pages/Shop/Shop');
}

// Wrap lazy components with Suspense
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

// Main site routes (with standard Layout header/footer)
export const routes = [
    // Main pages
    {
        path: '/',
        element: withSuspense(Home),
    },
    {
        path: '/shop',
        element: <Shop />,
    },
    {
        path: '/product/:id',
        element: withSuspense(ProductDetail),
    },
    {
        path: '/collections',
        element: withSuspense(Collections),
    },
    {
        path: '/collections/:slug',
        element: withSuspense(CollectionDetail),
    },
    {
        path: '/venus-calculator',
        element: withSuspense(VenusCalculator),
    },
    {
        path: '/astro-calc',
        element: withSuspense(AstroCalc),
    },
    {
        path: '/lookbook',
        element: withSuspense(Lookbook),
    },
    {
        path: '/lookbook/:slug',
        element: withSuspense(LookbookDetail),
    },
    {
        path: '/blog',
        element: withSuspense(Blog),
    },
    {
        path: '/blog/:slug',
        element: withSuspense(BlogPost),
    },
    {
        path: '/about',
        element: withSuspense(About),
    },
    {
        path: '/contact',
        element: withSuspense(Contact),
    },
    {
        path: '/cart',
        element: withSuspense(Cart),
    },
    {
        path: '/checkout',
        element: withSuspense(Checkout),
    },
    {
        path: '/wishlist',
        element: withSuspense(Wishlist),
    },
    {
        path: '/venus-compatibility',
        element: withSuspense(VenusCompatibility),
    },
    // Venus Sign Collections
    {
        path: '/venus-collections',
        element: withSuspense(VenusCollections),
    },
    {
        path: '/venus-collections/:sign',
        element: withSuspense(VenusSignDetail),
    },
    // Account routes
    {
        path: '/account/login',
        element: withSuspense(Login),
    },
    {
        path: '/account/register',
        element: withSuspense(Register),
    },
    {
        path: '/account',
        element: withSuspense(AccountDashboard),
    },
    {
        path: '/account/settings',
        element: withSuspense(AccountDashboard),
    },
    {
        path: '/account/orders',
        element: withSuspense(AccountDashboard),
    },
    {
        path: '/account/orders/:orderId',
        element: withSuspense(OrderDetail),
    },
    // Static pages
    {
        path: '/privacy-policy',
        element: withSuspense(PrivacyPolicy),
    },
    {
        path: '/terms',
        element: withSuspense(Terms),
    },
    {
        path: '/shipping-returns',
        element: withSuspense(ShippingReturns),
    },
    // Style guide alias for lookbook
    {
        path: '/style-guide',
        element: <Navigate to="/lookbook" replace />,
    },
    // 404 catch-all
    {
        path: '*',
        element: withSuspense(NotFound),
    },
];

// Admin routes (separate layout, no site header/footer)
export const adminRoutes = {
    path: '/admin',
    element: withSuspense(AdminLayout),
    children: [
        { index: true, element: withSuspense(DashboardOverview) },
        { path: 'products', element: withSuspense(ProductsManager) },
        { path: 'orders', element: withSuspense(OrdersManager) },
        { path: 'customers', element: withSuspense(CustomersManager) },
        // Future: collections, blog, settings
        { path: '*', element: withSuspense(DashboardOverview) },
    ],
};

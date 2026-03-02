import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Sparkles,
    Instagram,
    Facebook,
    Twitter,
    Shield,
    Truck,
    RefreshCw,
    CreditCard,
    Mail,
} from 'lucide-react';
import styles from './Footer.module.css';

// Pinterest & TikTok custom icons (Lucide doesn't have these)
const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.05A6.34 6.34 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
);

// Payment method icons (simple SVGs for common payment methods)
const VisaIcon = () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <path d="M19.5 21H17L18.7 11H21.2L19.5 21Z" fill="white" />
        <path d="M28 11.2C27.5 11 26.8 10.8 25.9 10.8C23.4 10.8 21.7 12.1 21.7 13.9C21.7 15.3 22.9 16 23.9 16.5C24.9 17 25.2 17.3 25.2 17.8C25.2 18.5 24.4 18.8 23.6 18.8C22.5 18.8 21.9 18.6 21 18.3L20.6 18.1L20.2 20.6C20.9 20.9 22 21.2 23.2 21.2C25.9 21.2 27.5 19.9 27.5 18C27.5 16.9 26.8 16.1 25.3 15.4C24.4 14.9 23.9 14.6 23.9 14.1C23.9 13.6 24.5 13.1 25.6 13.1C26.5 13.1 27.2 13.3 27.7 13.5L28 13.6L28 11.2Z" fill="white" />
        <path d="M32.5 11H30.5C29.9 11 29.4 11.2 29.1 11.8L25.5 21H28.2L28.7 19.5H32L32.3 21H34.7L32.5 11ZM29.4 17.5C29.6 17 30.5 14.5 30.5 14.5C30.5 14.5 30.7 13.9 30.9 13.5L31.1 14.4C31.1 14.4 31.7 17 31.8 17.5H29.4Z" fill="white" />
        <path d="M16.5 11L14 17.8L13.7 16.3C13.2 14.7 11.7 13 10 12.1L12.3 21H15L19.2 11H16.5Z" fill="white" />
        <path d="M12.3 11H8.1L8 11.2C11.1 12 13.2 14.1 14 16.3L13.1 12C13 11.3 12.7 11 12.3 11Z" fill="#F9A533" />
    </svg>
);

const MastercardIcon = () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="#F5F5F5" />
        <circle cx="18" cy="16" r="8" fill="#EB001B" />
        <circle cx="30" cy="16" r="8" fill="#F79E1B" />
        <path d="M24 10.5C25.8 12.1 27 14.4 27 17C27 19.6 25.8 21.9 24 23.5C22.2 21.9 21 19.6 21 17C21 14.4 22.2 12.1 24 10.5Z" fill="#FF5F00" />
    </svg>
);

const PayPalIcon = () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="#F5F5F5" />
        <path d="M19.5 8H24C26.5 8 28 9 28.5 11C29.5 14 27.5 16 24.5 16H22.5L21.5 22H18L19.5 8Z" fill="#003087" />
        <path d="M22 10H25C27 10 28 10.5 28 12.5C28 14.5 26.5 16 24.5 16H23L22 10Z" fill="#009CDE" />
        <path d="M15.5 12H20C22.5 12 24 13 24.5 15C25.5 18 23.5 20 20.5 20H18.5L17.5 26H14L15.5 12Z" fill="#003087" />
        <path d="M18 14H21C23 14 24 14.5 24 16.5C24 18.5 22.5 20 20.5 20H19L18 14Z" fill="#009CDE" />
    </svg>
);

const ApplePayIcon = () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="#000" />
        <path d="M14 12.5C14.3 12 14.8 11.7 15.3 11.7C15.4 11.7 15.5 11.7 15.6 11.7C15.6 11.4 15.5 11.1 15.3 10.9C15.1 10.6 14.8 10.5 14.4 10.5C14 10.5 13.6 10.7 13.3 11C13 11.3 12.8 11.7 12.8 12.2C12.8 12.3 12.8 12.4 12.8 12.5C13.2 12.5 13.6 12.3 14 12.5Z" fill="white" />
        <path d="M15.6 13C15.1 13 14.6 13.3 14.3 13.3C14 13.3 13.5 13 13 13C12.3 13 11.6 13.4 11.2 14.1C10.4 15.5 11 17.6 11.8 18.8C12.2 19.4 12.6 20 13.2 20C13.7 20 13.9 19.7 14.5 19.7C15.1 19.7 15.3 20 15.9 20C16.5 20 16.9 19.4 17.3 18.8C17.7 18.2 17.9 17.6 17.9 17.5C17.9 17.5 16.7 17 16.7 15.6C16.7 14.4 17.7 13.8 17.7 13.8C17.2 13.1 16.4 13 16.1 13C15.9 13 15.8 13 15.6 13Z" fill="white" />
        <text x="20" y="18" fill="white" fontSize="7" fontWeight="500">Pay</text>
    </svg>
);

const BlikIcon = () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" rx="4" fill="#E6007A" />
        <circle cx="14" cy="16" r="5" fill="white" />
        <circle cx="14" cy="16" r="2" fill="#E6007A" />
        <text x="22" y="19" fill="white" fontSize="8" fontWeight="bold">BLIK</text>
    </svg>
);

interface FooterProps {
    language: 'en' | 'pl';
}

// Translations
const translations = {
    en: {
        newsletter: {
            title: 'Join the Venus Community',
            subtitle: 'Get exclusive offers, style tips, and cosmic inspiration delivered to your inbox.',
            placeholder: 'Enter your email',
            button: 'Subscribe',
        },
        trustBadges: {
            secureCheckout: {
                title: 'Secure Checkout',
                text: '256-bit SSL encryption',
            },
            freeShipping: {
                title: 'Free Shipping',
                text: 'On orders over 200 PLN',
            },
            easyReturns: {
                title: 'Easy Returns',
                text: '30-day return policy',
            },
            support: {
                title: '24/7 Support',
                text: 'We\'re here to help',
            },
        },
        columns: {
            shop: 'Shop',
            about: 'About',
            help: 'Help',
        },
        links: {
            newArrivals: 'New Arrivals',
            collections: 'Collections',
            bestsellers: 'Bestsellers',
            sale: 'Sale',
            ourStory: 'Our Story',
            venusPhilosophy: 'Venus Philosophy',
            sustainability: 'Sustainability',
            careers: 'Careers',
            contact: 'Contact Us',
            faq: 'FAQ',
            shipping: 'Shipping & Returns',
            sizeGuide: 'Size Guide',
        },
        tagline: 'Fashion written in the stars. Discover your cosmic style with House of Venus.',
        copyright: '© 2025 House of Venus. All rights reserved.',
        legal: {
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            cookies: 'Cookie Policy',
        },
    },
    pl: {
        newsletter: {
            title: 'Dołącz do społeczności Venus',
            subtitle: 'Otrzymuj ekskluzywne oferty, porady stylizacyjne i kosmiczną inspirację.',
            placeholder: 'Wpisz swój email',
            button: 'Zapisz się',
        },
        trustBadges: {
            secureCheckout: {
                title: 'Bezpieczne płatności',
                text: 'Szyfrowanie SSL 256-bit',
            },
            freeShipping: {
                title: 'Darmowa dostawa',
                text: 'Przy zamówieniach powyżej 200 zł',
            },
            easyReturns: {
                title: 'Łatwe zwroty',
                text: '30 dni na zwrot',
            },
            support: {
                title: 'Wsparcie 24/7',
                text: 'Jesteśmy tu, by pomóc',
            },
        },
        columns: {
            shop: 'Sklep',
            about: 'O nas',
            help: 'Pomoc',
        },
        links: {
            newArrivals: 'Nowości',
            collections: 'Kolekcje',
            bestsellers: 'Bestsellery',
            sale: 'Wyprzedaż',
            ourStory: 'Nasza historia',
            venusPhilosophy: 'Filozofia Venus',
            sustainability: 'Zrównoważony rozwój',
            careers: 'Kariera',
            contact: 'Kontakt',
            faq: 'FAQ',
            shipping: 'Wysyłka i zwroty',
            sizeGuide: 'Tabela rozmiarów',
        },
        tagline: 'Moda zapisana w gwiazdach. Odkryj swój kosmiczny styl z House of Venus.',
        copyright: '© 2025 House of Venus. Wszelkie prawa zastrzeżone.',
        legal: {
            privacy: 'Polityka prywatności',
            terms: 'Regulamin',
            cookies: 'Polityka cookies',
        },
    },
};

export default function Footer({ language }: FooterProps) {
    const t = translations[language];
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer className={styles.footer}>
            {/* Newsletter Section */}
            <section className={styles.newsletterSection}>
                <div className={styles.newsletterContent}>
                    <h3 className={styles.newsletterTitle}>{t.newsletter.title}</h3>
                    <p className={styles.newsletterSubtitle}>{t.newsletter.subtitle}</p>
                    <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                        <input
                            type="email"
                            placeholder={t.newsletter.placeholder}
                            className={styles.newsletterInput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label={t.newsletter.placeholder}
                        />
                        <button type="submit" className={styles.newsletterButton}>
                            <Mail size={16} style={{ marginRight: '8px', display: 'inline' }} />
                            {t.newsletter.button}
                        </button>
                    </form>
                </div>
            </section>

            {/* Trust Badges Section */}
            <section className={styles.trustBadgesSection}>
                <div className={styles.trustBadgesGrid}>
                    <div className={styles.trustBadge}>
                        <div className={styles.trustBadgeIcon}>
                            <Shield />
                        </div>
                        <span className={styles.trustBadgeTitle}>{t.trustBadges.secureCheckout.title}</span>
                        <span className={styles.trustBadgeText}>{t.trustBadges.secureCheckout.text}</span>
                    </div>
                    <div className={styles.trustBadge}>
                        <div className={styles.trustBadgeIcon}>
                            <Truck />
                        </div>
                        <span className={styles.trustBadgeTitle}>{t.trustBadges.freeShipping.title}</span>
                        <span className={styles.trustBadgeText}>{t.trustBadges.freeShipping.text}</span>
                    </div>
                    <div className={styles.trustBadge}>
                        <div className={styles.trustBadgeIcon}>
                            <RefreshCw />
                        </div>
                        <span className={styles.trustBadgeTitle}>{t.trustBadges.easyReturns.title}</span>
                        <span className={styles.trustBadgeText}>{t.trustBadges.easyReturns.text}</span>
                    </div>
                    <div className={styles.trustBadge}>
                        <div className={styles.trustBadgeIcon}>
                            <CreditCard />
                        </div>
                        <span className={styles.trustBadgeTitle}>{t.trustBadges.support.title}</span>
                        <span className={styles.trustBadgeText}>{t.trustBadges.support.text}</span>
                    </div>
                </div>
            </section>

            {/* Main Footer Content */}
            <div className={styles.footerMain}>
                <div className={styles.footerGrid}>
                    {/* Brand Column */}
                    <div className={styles.footerBrand}>
                        <Link to="/" className={styles.footerLogo}>
                            <Sparkles className={styles.footerLogoIcon} />
                            <span>
                                House of <span className={styles.footerLogoVenus}>Venus</span>
                            </span>
                        </Link>
                        <p className={styles.footerTagline}>{t.tagline}</p>
                        <div className={styles.socialLinks}>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                <Instagram />
                            </a>
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="TikTok"
                            >
                                <TikTokIcon />
                            </a>
                            <a
                                href="https://pinterest.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Pinterest"
                            >
                                <PinterestIcon />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="X (Twitter)"
                            >
                                <Twitter />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Facebook"
                            >
                                <Facebook />
                            </a>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.footerColumnTitle}>{t.columns.shop}</h4>
                        <nav className={styles.footerLinks}>
                            <Link to="/shop?filter=new" className={styles.footerLink}>
                                {t.links.newArrivals}
                            </Link>
                            <Link to="/collections" className={styles.footerLink}>
                                {t.links.collections}
                            </Link>
                            <Link to="/shop?filter=bestsellers" className={styles.footerLink}>
                                {t.links.bestsellers}
                            </Link>
                            <Link to="/shop?filter=sale" className={styles.footerLink}>
                                {t.links.sale}
                            </Link>
                        </nav>
                    </div>

                    {/* About Column */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.footerColumnTitle}>{t.columns.about}</h4>
                        <nav className={styles.footerLinks}>
                            <Link to="/about" className={styles.footerLink}>
                                {t.links.ourStory}
                            </Link>
                            <Link to="/about#philosophy" className={styles.footerLink}>
                                {t.links.venusPhilosophy}
                            </Link>
                            <Link to="/about#sustainability" className={styles.footerLink}>
                                {t.links.sustainability}
                            </Link>
                            <Link to="/careers" className={styles.footerLink}>
                                {t.links.careers}
                            </Link>
                        </nav>
                    </div>

                    {/* Help Column */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.footerColumnTitle}>{t.columns.help}</h4>
                        <nav className={styles.footerLinks}>
                            <Link to="/contact" className={styles.footerLink}>
                                {t.links.contact}
                            </Link>
                            <Link to="/faq" className={styles.footerLink}>
                                {t.links.faq}
                            </Link>
                            <Link to="/shipping-returns" className={styles.footerLink}>
                                {t.links.shipping}
                            </Link>
                            <Link to="/size-guide" className={styles.footerLink}>
                                {t.links.sizeGuide}
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className={styles.footerBottom}>
                <div className={styles.footerBottomContent}>
                    <p className={styles.copyright}>{t.copyright}</p>

                    {/* Payment Icons */}
                    <div className={styles.paymentIcons}>
                        <div className={styles.paymentIcon} title="Visa">
                            <VisaIcon />
                        </div>
                        <div className={styles.paymentIcon} title="Mastercard">
                            <MastercardIcon />
                        </div>
                        <div className={styles.paymentIcon} title="PayPal">
                            <PayPalIcon />
                        </div>
                        <div className={styles.paymentIcon} title="Apple Pay">
                            <ApplePayIcon />
                        </div>
                        <div className={styles.paymentIcon} title="BLIK">
                            <BlikIcon />
                        </div>
                    </div>

                    <nav className={styles.legalLinks}>
                        <Link to="/privacy-policy" className={styles.legalLink}>
                            {t.legal.privacy}
                        </Link>
                        <Link to="/terms" className={styles.legalLink}>
                            {t.legal.terms}
                        </Link>
                        <Link to="/cookies" className={styles.legalLink}>
                            {t.legal.cookies}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

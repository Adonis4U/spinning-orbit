import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Instagram,
    Facebook,
    Twitter,
} from 'lucide-react';
import styles from './Footer.module.css';

// Pinterest & TikTok custom icons (Lucide doesn't have these)
const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.05A6.34 6.34 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
);

interface FooterProps {
    language: 'en' | 'pl';
}

// Translations
const translations = {
    en: {
        newsletter: {
            title: 'Join the Cosmic Circle',
            subtitle: 'Subscribe for exclusive style horoscopes, new arrivals & Venus-inspired looks',
            placeholder: 'Enter your email',
            button: 'Subscribe',
            success: 'Thank you for subscribing!',
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
            title: 'Dołącz do Kosmicznego Kręgu',
            subtitle: 'Zapisz się, aby otrzymywać ekskluzywne horoskopy stylowe, nowości i inspirowane Wenus stylizacje',
            placeholder: 'Wpisz swój email',
            button: 'Zapisz się',
            success: 'Dziękujemy za zapis!',
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
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const t = translations[language];

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with Supabase newsletter subscription
        if (email) {
            setIsSubmitted(true);
            setEmail('');
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    return (
        <footer className={styles.footer}>
            {/* Newsletter Section */}
            <section className={styles.newsletterSection}>
                <div className={styles.newsletterContent}>
                    <motion.h3
                        className={styles.newsletterTitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.newsletter.title}
                    </motion.h3>
                    <motion.p
                        className={styles.newsletterSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {t.newsletter.subtitle}
                    </motion.p>
                    <motion.form
                        className={styles.newsletterForm}
                        onSubmit={handleNewsletterSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {isSubmitted ? (
                            <motion.p
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ color: 'white', fontWeight: 500 }}
                            >
                                ✨ {t.newsletter.success}
                            </motion.p>
                        ) : (
                            <>
                                <input
                                    type="email"
                                    className={styles.newsletterInput}
                                    placeholder={t.newsletter.placeholder}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-label={t.newsletter.placeholder}
                                />
                                <button type="submit" className={styles.newsletterButton}>
                                    {t.newsletter.button}
                                </button>
                            </>
                        )}
                    </motion.form>
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

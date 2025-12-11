// 404 Not Found Page
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>Page Not Found | House of Venus</title>
            </Helmet>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                padding: 'var(--space-8)'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Sparkles size={64} style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-4)' }} />
                    <h1 style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'var(--font-size-5xl)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        404
                    </h1>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--space-6)',
                        maxWidth: '400px'
                    }}>
                        The stars couldn't find this page. It may have drifted into another cosmic dimension.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                        <Link
                            to="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                padding: 'var(--space-3) var(--space-6)',
                                background: 'var(--color-gold)',
                                color: 'var(--color-text-inverse)',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 'var(--font-weight-semibold)',
                                textDecoration: 'none'
                            }}
                        >
                            <Home size={18} />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                padding: 'var(--space-3) var(--space-6)',
                                background: 'transparent',
                                border: '2px solid var(--color-border-medium)',
                                color: 'var(--color-text-primary)',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 'var(--font-weight-semibold)',
                                cursor: 'pointer'
                            }}
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

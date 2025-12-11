/* ===========================================
   CHECKOUT PAGE
   Multi-step checkout flow
   =========================================== */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Check, CreditCard,
    Truck, User, ShoppingBag, Lock, Sparkles
} from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useCartStore, useCartSubtotal } from '../../stores';
import styles from './Checkout.module.css';

type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation';

const STEPS: CheckoutStep[] = ['information', 'shipping', 'payment', 'confirmation'];

export default function Checkout() {
    const { language } = useTranslation();
    const navigate = useNavigate();
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const subtotal = useCartSubtotal();

    const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Poland',
        shippingMethod: 'standard',
        paymentMethod: 'card',
    });

    const formatPrice = (price: number) => `${price.toFixed(0)} zł`;
    const isEmpty = items.length === 0;

    const shippingCost = formData.shippingMethod === 'express' ? 29 : subtotal >= 300 ? 0 : 15;
    const total = subtotal + shippingCost;

    const stepIndex = STEPS.indexOf(currentStep);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const goToStep = (step: CheckoutStep) => {
        setCurrentStep(step);
    };

    const nextStep = () => {
        const nextIndex = stepIndex + 1;
        if (nextIndex < STEPS.length) {
            setCurrentStep(STEPS[nextIndex]);
        }
    };

    const prevStep = () => {
        const prevIndex = stepIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStep(STEPS[prevIndex]);
        }
    };

    const handleSubmit = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
        setCurrentStep('confirmation');
    };

    const stepLabels = {
        information: language === 'en' ? 'Information' : 'Informacje',
        shipping: language === 'en' ? 'Shipping' : 'Wysyłka',
        payment: language === 'en' ? 'Payment' : 'Płatność',
        confirmation: language === 'en' ? 'Confirmation' : 'Potwierdzenie',
    };

    const stepIcons = {
        information: User,
        shipping: Truck,
        payment: CreditCard,
        confirmation: Check,
    };

    if (isEmpty && !orderComplete) {
        return (
            <main className={styles.page}>
                <div className={styles.emptyState}>
                    <ShoppingBag size={64} strokeWidth={1} />
                    <h2>{language === 'en' ? 'Your cart is empty' : 'Twój koszyk jest pusty'}</h2>
                    <Link to="/shop" className={styles.shopButton}>
                        {language === 'en' ? 'Continue Shopping' : 'Kontynuuj Zakupy'}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Checkout' : 'Kasa'} | House of Venus</title>
            </Helmet>

            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Progress Steps */}
                    {!orderComplete && (
                        <nav className={styles.progressBar}>
                            {STEPS.slice(0, -1).map((step, index) => {
                                const Icon = stepIcons[step];
                                const isActive = step === currentStep;
                                const isCompleted = STEPS.indexOf(step) < stepIndex;

                                return (
                                    <div key={step} className={styles.progressStep}>
                                        <button
                                            className={`${styles.stepButton} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                                            onClick={() => isCompleted && goToStep(step)}
                                            disabled={!isCompleted}
                                        >
                                            {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                                        </button>
                                        <span className={`${styles.stepLabel} ${isActive ? styles.active : ''}`}>
                                            {stepLabels[step]}
                                        </span>
                                        {index < STEPS.length - 2 && <div className={`${styles.stepLine} ${isCompleted ? styles.completed : ''}`} />}
                                    </div>
                                );
                            })}
                        </nav>
                    )}

                    <div className={styles.content}>
                        {/* Form Section */}
                        <section className={styles.formSection}>
                            <AnimatePresence mode="wait">
                                {/* Information Step */}
                                {currentStep === 'information' && (
                                    <motion.div
                                        key="information"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className={styles.stepContent}
                                    >
                                        <h2 className={styles.stepTitle}>
                                            {language === 'en' ? 'Contact Information' : 'Dane Kontaktowe'}
                                        </h2>

                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup + ' ' + styles.fullWidth}>
                                                <label>{language === 'en' ? 'Email' : 'Email'}</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="your@email.com"
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>{language === 'en' ? 'First Name' : 'Imię'}</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>{language === 'en' ? 'Last Name' : 'Nazwisko'}</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup + ' ' + styles.fullWidth}>
                                                <label>{language === 'en' ? 'Phone' : 'Telefon'}</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+48"
                                                />
                                            </div>
                                            <div className={styles.formGroup + ' ' + styles.fullWidth}>
                                                <label>{language === 'en' ? 'Address' : 'Adres'}</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>{language === 'en' ? 'City' : 'Miasto'}</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>{language === 'en' ? 'Postal Code' : 'Kod Pocztowy'}</label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    value={formData.postalCode}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.stepActions}>
                                            <Link to="/cart" className={styles.backLink}>
                                                <ChevronLeft size={18} />
                                                {language === 'en' ? 'Return to Cart' : 'Wróć do Koszyka'}
                                            </Link>
                                            <button className={styles.nextButton} onClick={nextStep}>
                                                {language === 'en' ? 'Continue to Shipping' : 'Przejdź do Wysyłki'}
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Shipping Step */}
                                {currentStep === 'shipping' && (
                                    <motion.div
                                        key="shipping"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className={styles.stepContent}
                                    >
                                        <h2 className={styles.stepTitle}>
                                            {language === 'en' ? 'Shipping Method' : 'Metoda Wysyłki'}
                                        </h2>

                                        <div className={styles.shippingOptions}>
                                            <label className={`${styles.shippingOption} ${formData.shippingMethod === 'standard' ? styles.selected : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="shippingMethod"
                                                    value="standard"
                                                    checked={formData.shippingMethod === 'standard'}
                                                    onChange={handleInputChange}
                                                />
                                                <div className={styles.shippingDetails}>
                                                    <span className={styles.shippingName}>
                                                        {language === 'en' ? 'Standard Shipping' : 'Wysyłka Standardowa'}
                                                    </span>
                                                    <span className={styles.shippingTime}>3-5 {language === 'en' ? 'business days' : 'dni roboczych'}</span>
                                                </div>
                                                <span className={styles.shippingPrice}>
                                                    {subtotal >= 300 ? (language === 'en' ? 'Free' : 'Gratis') : '15 zł'}
                                                </span>
                                            </label>

                                            <label className={`${styles.shippingOption} ${formData.shippingMethod === 'express' ? styles.selected : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="shippingMethod"
                                                    value="express"
                                                    checked={formData.shippingMethod === 'express'}
                                                    onChange={handleInputChange}
                                                />
                                                <div className={styles.shippingDetails}>
                                                    <span className={styles.shippingName}>
                                                        {language === 'en' ? 'Express Shipping' : 'Wysyłka Ekspresowa'}
                                                    </span>
                                                    <span className={styles.shippingTime}>1-2 {language === 'en' ? 'business days' : 'dni roboczych'}</span>
                                                </div>
                                                <span className={styles.shippingPrice}>29 zł</span>
                                            </label>
                                        </div>

                                        <div className={styles.stepActions}>
                                            <button className={styles.backLink} onClick={prevStep}>
                                                <ChevronLeft size={18} />
                                                {language === 'en' ? 'Return to Information' : 'Wróć do Informacji'}
                                            </button>
                                            <button className={styles.nextButton} onClick={nextStep}>
                                                {language === 'en' ? 'Continue to Payment' : 'Przejdź do Płatności'}
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Payment Step */}
                                {currentStep === 'payment' && (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className={styles.stepContent}
                                    >
                                        <h2 className={styles.stepTitle}>
                                            {language === 'en' ? 'Payment' : 'Płatność'}
                                        </h2>

                                        <div className={styles.paymentOptions}>
                                            <label className={`${styles.paymentOption} ${formData.paymentMethod === 'card' ? styles.selected : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="card"
                                                    checked={formData.paymentMethod === 'card'}
                                                    onChange={handleInputChange}
                                                />
                                                <CreditCard size={20} />
                                                <span>{language === 'en' ? 'Credit Card' : 'Karta Płatnicza'}</span>
                                            </label>

                                            <label className={`${styles.paymentOption} ${formData.paymentMethod === 'blik' ? styles.selected : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="blik"
                                                    checked={formData.paymentMethod === 'blik'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className={styles.blikIcon}>BLIK</span>
                                                <span>BLIK</span>
                                            </label>

                                            <label className={`${styles.paymentOption} ${formData.paymentMethod === 'przelewy24' ? styles.selected : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="przelewy24"
                                                    checked={formData.paymentMethod === 'przelewy24'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className={styles.p24Icon}>P24</span>
                                                <span>Przelewy24</span>
                                            </label>
                                        </div>

                                        {formData.paymentMethod === 'card' && (
                                            <div className={styles.cardForm}>
                                                <div className={styles.formGroup + ' ' + styles.fullWidth}>
                                                    <label>{language === 'en' ? 'Card Number' : 'Numer Karty'}</label>
                                                    <input type="text" placeholder="1234 5678 9012 3456" />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <label>{language === 'en' ? 'Expiry' : 'Data Ważności'}</label>
                                                    <input type="text" placeholder="MM/YY" />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <label>CVC</label>
                                                    <input type="text" placeholder="123" />
                                                </div>
                                            </div>
                                        )}

                                        <div className={styles.securityNote}>
                                            <Lock size={14} />
                                            {language === 'en'
                                                ? 'Your payment information is encrypted and secure.'
                                                : 'Twoje dane płatnicze są szyfrowane i bezpieczne.'}
                                        </div>

                                        <div className={styles.stepActions}>
                                            <button className={styles.backLink} onClick={prevStep}>
                                                <ChevronLeft size={18} />
                                                {language === 'en' ? 'Return to Shipping' : 'Wróć do Wysyłki'}
                                            </button>
                                            <button
                                                className={styles.payButton}
                                                onClick={handleSubmit}
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? (
                                                    <span className={styles.spinner} />
                                                ) : (
                                                    <>
                                                        <Lock size={16} />
                                                        {language === 'en' ? `Pay ${formatPrice(total)}` : `Zapłać ${formatPrice(total)}`}
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Confirmation Step */}
                                {currentStep === 'confirmation' && orderComplete && (
                                    <motion.div
                                        key="confirmation"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={styles.confirmationContent}
                                    >
                                        <div className={styles.successIcon}>
                                            <Sparkles size={48} />
                                        </div>
                                        <h2>{language === 'en' ? 'Thank You!' : 'Dziękujemy!'}</h2>
                                        <p>
                                            {language === 'en'
                                                ? 'Your order has been placed successfully. We\'ll send you a confirmation email shortly.'
                                                : 'Twoje zamówienie zostało złożone pomyślnie. Wkrótce wyślemy potwierdzenie na email.'}
                                        </p>
                                        <div className={styles.orderNumber}>
                                            {language === 'en' ? 'Order Number' : 'Numer Zamówienia'}: <strong>#HOV{Date.now().toString().slice(-8)}</strong>
                                        </div>
                                        <button
                                            className={styles.shopButton}
                                            onClick={() => navigate('/shop')}
                                        >
                                            {language === 'en' ? 'Continue Shopping' : 'Kontynuuj Zakupy'}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* Order Summary */}
                        {!orderComplete && (
                            <aside className={styles.summary}>
                                <h3 className={styles.summaryTitle}>
                                    {language === 'en' ? 'Order Summary' : 'Podsumowanie'}
                                </h3>

                                <div className={styles.summaryItems}>
                                    {items.map((item) => (
                                        <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
                                            <div className={styles.summaryItemImage}>
                                                <img src={item.image} alt={item.name} />
                                                <span className={styles.itemQty}>{item.quantity}</span>
                                            </div>
                                            <div className={styles.summaryItemDetails}>
                                                <span className={styles.summaryItemName}>
                                                    {language === 'pl' ? item.namePl : item.name}
                                                </span>
                                                {item.size && <span className={styles.summaryItemMeta}>{item.size}</span>}
                                            </div>
                                            <span className={styles.summaryItemPrice}>
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.summaryTotals}>
                                    <div className={styles.summaryRow}>
                                        <span>{language === 'en' ? 'Subtotal' : 'Suma częściowa'}</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>{language === 'en' ? 'Shipping' : 'Wysyłka'}</span>
                                        <span>{shippingCost === 0 ? (language === 'en' ? 'Free' : 'Gratis') : formatPrice(shippingCost)}</span>
                                    </div>
                                    <div className={styles.summaryTotal}>
                                        <span>{language === 'en' ? 'Total' : 'Razem'}</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

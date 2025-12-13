// Stripe Webhook Handler
// Supabase Edge Function for processing Stripe payment events
//
// Environment Variables Required:
// - STRIPE_SECRET_KEY: Stripe secret key
// - STRIPE_WEBHOOK_SECRET: Webhook signing secret from Stripe Dashboard
// - SUPABASE_URL: Supabase project URL
// - SUPABASE_SERVICE_ROLE_KEY: Service role key for database operations

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from 'https://esm.sh/stripe@14.0.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
});

const WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

Deno.serve(async (req: Request) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const signature = req.headers.get('stripe-signature');

        if (!signature) {
            return new Response(
                JSON.stringify({ error: 'Missing stripe-signature header' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const body = await req.text();

        // Verify webhook signature
        let event: Stripe.Event;
        try {
            event = await stripe.webhooks.constructEventAsync(
                body,
                signature,
                WEBHOOK_SECRET
            );
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return new Response(
                JSON.stringify({ error: 'Webhook signature verification failed' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log(`Received Stripe event: ${event.type}`);

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutComplete(session);
                break;
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentSucceeded(paymentIntent);
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentFailed(paymentIntent);
                break;
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionChange(subscription);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionDeleted(subscription);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new Response(
            JSON.stringify({ received: true }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Webhook error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});

// Handler functions

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
    const orderId = session.metadata?.order_id;

    if (orderId) {
        // Update order status to 'paid'
        const { error } = await supabase
            .from('orders')
            .update({
                status: 'paid',
                stripe_session_id: session.id,
                payment_intent_id: session.payment_intent as string,
                updated_at: new Date().toISOString(),
            })
            .eq('id', orderId);

        if (error) {
            console.error('Error updating order:', error);
            throw error;
        }

        console.log(`Order ${orderId} marked as paid`);

        // Trigger order confirmation email
        // This can be done by calling the send-order-confirmation function
        // or by using a database trigger
    }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    const orderId = paymentIntent.metadata?.order_id;

    if (orderId) {
        const { error } = await supabase
            .from('orders')
            .update({
                status: 'confirmed',
                payment_intent_id: paymentIntent.id,
                updated_at: new Date().toISOString(),
            })
            .eq('id', orderId);

        if (error) {
            console.error('Error confirming order:', error);
        }
    }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const orderId = paymentIntent.metadata?.order_id;

    if (orderId) {
        const { error } = await supabase
            .from('orders')
            .update({
                status: 'payment_failed',
                updated_at: new Date().toISOString(),
            })
            .eq('id', orderId);

        if (error) {
            console.error('Error updating failed order:', error);
        }
    }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.user_id;

    if (userId) {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                subscription_status: subscription.status,
                subscription_id: subscription.id,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) {
            console.error('Error updating subscription:', error);
        }
    }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.user_id;

    if (userId) {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                subscription_status: 'canceled',
                subscription_id: null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) {
            console.error('Error canceling subscription:', error);
        }
    }
}

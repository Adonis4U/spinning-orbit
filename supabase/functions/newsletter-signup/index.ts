// Newsletter Signup
// Supabase Edge Function for newsletter subscription handling
//
// Environment Variables Required:
// - SUPABASE_URL: Supabase project URL
// - SUPABASE_SERVICE_ROLE_KEY: Service role key
// - RESEND_API_KEY: (Optional) For sending welcome email

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'newsletter@houseofvenus.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface NewsletterRequest {
    email: string;
    language?: 'en' | 'pl';
    source?: string;
}

Deno.serve(async (req: Request) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { email, language = 'en', source = 'website' }: NewsletterRequest = await req.json();

        // Validate email
        if (!email || !isValidEmail(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email address' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Check if already subscribed
        const { data: existing } = await supabase
            .from('newsletter_subscribers')
            .select('id, is_active')
            .eq('email', email.toLowerCase())
            .single();

        if (existing) {
            if (existing.is_active) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: language === 'pl'
                            ? 'Ten email jest już zapisany do newslettera'
                            : 'This email is already subscribed'
                    }),
                    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            } else {
                // Reactivate subscription
                await supabase
                    .from('newsletter_subscribers')
                    .update({ is_active: true, updated_at: new Date().toISOString() })
                    .eq('id', existing.id);
            }
        } else {
            // Insert new subscriber
            const { error: insertError } = await supabase
                .from('newsletter_subscribers')
                .insert({
                    email: email.toLowerCase(),
                    language,
                    source,
                    is_active: true,
                    subscribed_at: new Date().toISOString(),
                });

            if (insertError) {
                console.error('Error inserting subscriber:', insertError);
                throw insertError;
            }
        }

        // Send welcome email if Resend is configured
        if (RESEND_API_KEY) {
            await sendWelcomeEmail(email, language);
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: language === 'pl'
                    ? 'Dziękujemy za zapisanie się do newslettera! ✨'
                    : 'Thank you for subscribing to our newsletter! ✨'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Newsletter signup error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function sendWelcomeEmail(email: string, language: 'en' | 'pl') {
    const isPolish = language === 'pl';

    const subject = isPolish
        ? '✨ Witaj w House of Venus!'
        : '✨ Welcome to House of Venus!';

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', sans-serif; background: #1a0a2e; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #2d1b4e, #1a0a2e); border-radius: 12px; overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #d4af37, #ffd700, #b8860b); padding: 30px; text-align: center;">
          <h1 style="margin: 0; color: #1a0a2e; font-size: 28px;">✨ House of Venus ✨</h1>
        </div>
        
        <div style="padding: 30px; color: #fff;">
          <h2 style="color: #d4af37;">
            ${isPolish ? 'Witaj w naszej kosmicznej społeczności!' : 'Welcome to our cosmic community!'}
          </h2>
          
          <p style="color: #e0e0e0; line-height: 1.6;">
            ${isPolish
            ? 'Dziękujemy za dołączenie do House of Venus. Teraz będziesz otrzymywać:'
            : 'Thank you for joining House of Venus. You\'ll now receive:'
        }
          </p>
          
          <ul style="color: #e0e0e0; line-height: 1.8;">
            <li>${isPolish ? 'Ekskluzywne oferty i rabaty' : 'Exclusive offers and discounts'}</li>
            <li>${isPolish ? 'Nowości kolekcji jako pierwsza/pierwszy' : 'New collection announcements first'}</li>
            <li>${isPolish ? 'Cotygodniowe horoskopy Wenus' : 'Weekly Venus horoscopes'}</li>
            <li>${isPolish ? 'Porady stylowe według Twojego znaku' : 'Style tips based on your sign'}</li>
          </ul>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://houseofvenus.com/venus-calculator" 
               style="display: inline-block; background: linear-gradient(135deg, #d4af37, #ffd700); color: #1a0a2e; padding: 14px 28px; text-decoration: none; border-radius: 25px; font-weight: bold;">
              ${isPolish ? 'Odkryj swój znak Wenus' : 'Discover Your Venus Sign'}
            </a>
          </div>
        </div>
        
        <div style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center; color: #888; font-size: 12px;">
          <p style="margin: 0;">
            ${isPolish ? 'Możesz zrezygnować w każdej chwili.' : 'You can unsubscribe at any time.'}
          </p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} House of Venus</p>
        </div>
      </div>
    </body>
    </html>
  `;

    try {
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [email],
                subject,
                html,
            }),
        });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        // Don't throw - subscription was successful, just email failed
    }
}

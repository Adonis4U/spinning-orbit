// Send Order Confirmation Email
// Supabase Edge Function using Resend for email delivery
//
// Environment Variables Required:
// - RESEND_API_KEY: API key from resend.com
// - FROM_EMAIL: Sender email address (verified in Resend)

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'orders@houseofvenus.com';

interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
    variant?: string;
}

interface OrderData {
    order_id: string;
    customer_email: string;
    customer_name: string;
    items: OrderItem[];
    total: number;
    currency: string;
    shipping_address: {
        street: string;
        city: string;
        postal_code: string;
        country: string;
    };
    language: 'en' | 'pl';
}

Deno.serve(async (req: Request) => {
    // CORS Headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    };

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        if (!RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY not configured');
        }

        const orderData: OrderData = await req.json();

        // Validate required fields
        if (!orderData.order_id || !orderData.customer_email || !orderData.items) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: order_id, customer_email, items' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Build email HTML
        const isPolish = orderData.language === 'pl';
        const subject = isPolish
            ? `House of Venus - Potwierdzenie zamówienia #${orderData.order_id}`
            : `House of Venus - Order Confirmation #${orderData.order_id}`;

        const itemsHtml = orderData.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
          ${item.product_name}${item.variant ? ` - ${item.variant}` : ''}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">
          ${orderData.currency} ${item.price.toFixed(2)}
        </td>
      </tr>
    `).join('');

        const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a0a2e; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 100%); border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #b8860b 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #1a0a2e; font-size: 28px;">✨ House of Venus ✨</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; color: #ffffff;">
            <h2 style="color: #d4af37; margin-top: 0;">
              ${isPolish ? 'Dziękujemy za zamówienie!' : 'Thank you for your order!'}
            </h2>
            
            <p style="color: #e0e0e0; line-height: 1.6;">
              ${isPolish
                ? `Cześć ${orderData.customer_name}, Twoje zamówienie zostało przyjęte i jest przetwarzane.`
                : `Hi ${orderData.customer_name}, your order has been received and is being processed.`
            }
            </p>
            
            <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #d4af37; margin-top: 0;">
                ${isPolish ? 'Numer zamówienia' : 'Order Number'}: #${orderData.order_id}
              </h3>
              
              <table style="width: 100%; border-collapse: collapse; color: #ffffff;">
                <thead>
                  <tr style="background: rgba(212, 175, 55, 0.2);">
                    <th style="padding: 12px; text-align: left;">${isPolish ? 'Produkt' : 'Product'}</th>
                    <th style="padding: 12px; text-align: center;">${isPolish ? 'Ilość' : 'Qty'}</th>
                    <th style="padding: 12px; text-align: right;">${isPolish ? 'Cena' : 'Price'}</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold; color: #d4af37;">
                      ${isPolish ? 'Razem' : 'Total'}:
                    </td>
                    <td style="padding: 12px; text-align: right; font-weight: bold; color: #d4af37;">
                      ${orderData.currency} ${orderData.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            ${orderData.shipping_address ? `
              <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="color: #d4af37; margin-top: 0;">
                  ${isPolish ? 'Adres dostawy' : 'Shipping Address'}
                </h4>
                <p style="color: #e0e0e0; margin: 0; line-height: 1.6;">
                  ${orderData.shipping_address.street}<br>
                  ${orderData.shipping_address.postal_code} ${orderData.shipping_address.city}<br>
                  ${orderData.shipping_address.country}
                </p>
              </div>
            ` : ''}
            
            <p style="color: #e0e0e0; line-height: 1.6; text-align: center; margin-top: 30px;">
              ${isPolish
                ? 'Masz pytania? Napisz do nas:'
                : 'Questions? Contact us at:'
            }
              <a href="mailto:support@houseofvenus.com" style="color: #d4af37;">support@houseofvenus.com</a>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center; color: #888;">
            <p style="margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} House of Venus. ${isPolish ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

        // Send email via Resend
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [orderData.customer_email],
                subject: subject,
                html: emailHtml,
            }),
        });

        if (!resendResponse.ok) {
            const errorData = await resendResponse.text();
            throw new Error(`Resend API error: ${errorData}`);
        }

        const result = await resendResponse.json();

        return new Response(
            JSON.stringify({ success: true, message_id: result.id }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error sending order confirmation:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});

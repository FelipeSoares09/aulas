import { stripe } from "../../../../lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { priceId } = req.body;

        if (!priceId) {
            return res.status(400).json({ error: 'Price ID is required' });
        }

        const successurl = `${process.env.NEXT_URL}/success`;
        const cancelurl = `${process.env.NEXT_URL}/`;

        const checkoutSession = await stripe.checkout.sessions.create({
            success_url: successurl,
            cancel_url: cancelurl,
            mode: 'payment',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
        });

        return res.status(201).json({
            checkoutUrl: checkoutSession.url,
        });
    } catch (error) {
        console.error('Stripe error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
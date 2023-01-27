import { FastifyInstance } from "fastify";
import WebPush from 'web-push';
import { z } from "zod";
require("dotenv").config();

const { PUBLIC_KEY_NOTIFICATION, PRIVATE_KEY_NOTIFICATION } = process.env;

WebPush.setVapidDetails(
    "http://localhost:3333",
    PUBLIC_KEY_NOTIFICATION || '',
    PRIVATE_KEY_NOTIFICATION || ''
);

export async function notificationRoutes(app: FastifyInstance) {
    app.get('/push/public_key', () => {
        return { publicKey: PUBLIC_KEY_NOTIFICATION }
    })

    app.post('/push/register', (req, reply) => {
        console.log(req.body)

        return reply.status(201).send()
    })

    app.post('/push/send', async (req, reply) => {
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string(),
                })
            })
        });

        const { subscription } = sendPushBody.parse(req.body);

        setTimeout(() => {
            WebPush.sendNotification(subscription, 'Hello do Backend');
        }, 5000)

        return reply.status(201).send()
    })
}

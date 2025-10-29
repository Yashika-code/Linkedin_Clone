import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

if (!TOKEN) {
    console.warn('Mailtrap token not found in environment variables');
}

if (!process.env.EMAIL_FROM || !process.env.EMAIL_FROM_NAME) {
    console.warn('Email sender configuration missing in environment variables');
}

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
    endpoint: process.env.MAILTRAP_ENDPOINT || 'https://send.api.mailtrap.io/'
});

export const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME,
};
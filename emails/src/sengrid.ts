import * as sgMail from '@sendgrid/mail';

export const sengrid = sgMail.setApiKey(process.env.SENGRID_API_KEY!);

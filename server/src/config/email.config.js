import nodemailer from 'nodemailer';
import { config } from './env.config.js';


export const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.auth.user,
      pass: config.smtp.auth.pass,
    },
  });
};


export const verifyTransporter = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✓ SMTP server connection verified');
    return true;
  } catch (error) {
    console.error('✗ SMTP server connection failed:', error.message);
    return false;
  }
};

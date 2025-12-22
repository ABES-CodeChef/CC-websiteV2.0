import { createApp } from './app.js';
import { config, validateConfig } from './config/env.config.js';
import { verifyTransporter } from './config/email.config.js';


const startServer = async () => {
  try {
    console.log('Validating configuration...');
    validateConfig();
    console.log('Configuration validated');

    console.log('Verifying SMTP connection...');
    await verifyTransporter();

    const app = createApp();

    const PORT = config.server.port;

    app.listen(PORT, () => {
      console.log('Server started successfully!');
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

startServer();

import express, { Request, Response } from 'express';
import consoleStamp from 'console-stamp';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { get } from 'config';
import DB from 'db';
import routes from 'api';
import Api from 'lib/Api';
import { devRequestLogger } from 'middlewares';

export default async () => {
  const PORT = get('PORT');

  const app = express();

  try {
    // Initialize the database
    DB.initializeDatabase();

    // Make sure the node log entries have timestamps
    consoleStamp(console, {
      pattern: 'mm/dd/yyyy HH:MM:ss.l',
    });

    app.get('/', (request: Request, response: Response) =>
      response.sendStatus(200),
    );
    app.get('/health', (request: Request, response: Response) =>
      response.sendStatus(200),
    );

    // Middlewares
    app.use(cors());
    app.use(morgan('short'));
    app.use(express.json());
    app.use(helmet());

    // Mount all API routes on /api path
    app.use('/api', routes);

    // Log requests in dev environment
    app.use(devRequestLogger);
  } catch (exception) {
    // Handle unexpected/uncaught errors
    app.use((req: Request, res: Response) =>
      Api.handleUncaughtException(exception, req, res),
    );
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  return app;
};

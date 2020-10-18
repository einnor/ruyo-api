import FirebaseAdmin, { app, ServiceAccount } from 'firebase-admin';

import { get } from 'config';
import serviceAccount from 'config/serviceAccountKey.json';

class Database {
  static database: app.App | null = null;

  public static initializeDatabase = () => {
    const database = FirebaseAdmin.initializeApp({
      credential: FirebaseAdmin.credential.cert(
        serviceAccount as ServiceAccount,
      ),
      databaseURL: get('FIREBASE_DATABASE_URL'),
    });
    if (database) {
      Database.database = database;
    }
  };
}

export default Database;

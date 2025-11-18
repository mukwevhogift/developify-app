'use server'
import "server-only";

import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { firebaseConfig } from '@/firebase/config';

// This is a server-only module.
// It uses the server-only package to ensure it's not accidentally imported on the client.

let app: App;

if (getApps().length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        // Use service account in production
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        app = initializeApp({
            credential: cert(serviceAccount),
            databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
        });
    } else {
        // Fallback for local development if service account key is not set.
        // The Admin SDK will try to find credentials via GOOGLE_APPLICATION_CREDENTIALS env var
        // or from the gcloud CLI.
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY not set. Admin SDK will try to find default credentials.");
        app = initializeApp({
            projectId: firebaseConfig.projectId,
            databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
        });
    }
} else {
    app = getApps()[0];
}


export const getAdminApp = () => app;
export const getAdminAuth = () => getAuth(app);

'use client';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

// Hooks
export { useCollection, type UseCollectionResult, type WithId } from './firestore/use-collection';
export { useDoc, type UseDocResult } from './firestore/use-doc';
export { useUser } from './provider';

// Providers and context
export {
  FirebaseClientProvider,
} from './client-provider';
export {
  FirebaseProvider,
  useFirebase,
  useAuth,
  useFirestore,
  useFirebaseApp,
  useMemoFirebase,
} from './provider';

// Non-blocking Firestore updates
export {
  setDocumentNonBlocking,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from './non-blocking-updates';

// Non-blocking Auth updates
export {
  initiateAnonymousSignIn,
  initiateEmailSignUp,
  initiateEmailSignIn,
} from './non-blocking-login';

// Initialize Firebase
let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// Initialize on the client
if (typeof window !== 'undefined' && getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
}

/**
 * Initializes Firebase services. Should be called once in the app's lifecycle,
 * ideally on the client-side.
 */
export function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }

  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);

  return { firebaseApp, auth, firestore };
}

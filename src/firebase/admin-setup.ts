/**
 * @file This script is for one-time use to set an admin user.
 * It should be run from the command line in a secure server environment.
 * DO NOT expose this as an API endpoint.
 *
 * Usage:
 * 1. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to point to your service account key file.
 *    (e.g., export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json")
 * 2. Run the script: `npx ts-node src/firebase/admin-setup.ts <user_uid_to_make_admin>`
 */

import { getAdminAuth } from './server-actions/admin-config';

async function setAdminRole(uid: string) {
  try {
    const auth = getAdminAuth();
    // Get existing claims to avoid overwriting them
    const { customClaims } = await auth.getUser(uid);

    // Set new claims, preserving existing ones
    await auth.setCustomUserClaims(uid, {
        ...customClaims,
        role: 'admin' 
    });
    
    console.log(`Successfully set user ${uid} as an admin.`);
    // You might also want to update the user's document in Firestore here
  } catch (error) {
    console.error('Error setting admin role:', error);
  }
}

const uid = process.argv[2];
if (!uid) {
  console.error('Please provide a user UID as an argument.');
  process.exit(1);
}

setAdminRole(uid);

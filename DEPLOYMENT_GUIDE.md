# Developify Deployment Guide

This document provides a checklist for deploying the Developify application and setting up the necessary user roles for testing.

## 1. Firebase Project Setup

Before deploying, ensure your Firebase project is configured correctly.

- **Billing**: Your Firebase project must be on the **Blaze (pay-as-you-go)** plan to use server-side functions required for role management and other backend logic.
- **Authentication**: Make sure Email/Password sign-in is enabled in the Firebase Authentication console.
- **Environment Variables**:
  - In your hosting environment (e.g., Vercel, Netlify, or Firebase App Hosting), you need to set the `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable.
  - The value should be the full JSON content of your Firebase service account key. You can generate a new private key from your project's settings in the Firebase console under `Project settings > Service accounts`.

## 2. Setting Up an Admin User

The application requires at least one user with an 'admin' role to manage KYC and property approvals. This role must be set manually using a secure, server-side script.

1. **Get the User's UID**:
   - Create a new user account through the application's registration page.
   - Go to the Firebase Authentication console, find the user you just created, and copy their UID.

2. **Run the Admin Setup Script**:
   - You have a script located at `src/firebase/admin-setup.ts`.
   - Before running it, ensure you have set up your local environment to authenticate with the Firebase Admin SDK. The easiest way is to set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the file path of your service account key.
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
     ```
   - Run the script from your terminal, passing the UID you copied as an argument:
     ```bash
     npx ts-node src/firebase/admin-setup.ts <PASTE_THE_USER_UID_HERE>
     ```
   - If successful, the script will print a confirmation message. This user will now have admin privileges.

## 3. Creating Test Accounts

To properly test the multi-role system, create at least three different user accounts:

- **Admin Account**: Follow the steps in section 2 to create this account. This user will be able to access the `/admin/approvals` dashboard.

- **Property Owner Account**:
  - Register a new user and select the "Property Owner" role.
  - This user will initially be redirected to `/owner-onboarding`.
  - Log in with your **Admin Account**, go to the KYC queue, and approve this user's request.
  - Once approved, log back in as the Property Owner. They should now be redirected to `/owner/dashboard` and be able to create property listings.

- **Investor Account**:
  - Register a new user and select the "Investor" role.
  - This user will be taken directly to the main investor dashboard at `/dashboard`. They will only be able to see "approved" properties.

## 4. Deployment Checklist

- [ ] Firebase project is on the Blaze plan.
- [ ] Authentication providers are enabled.
- [ ] All necessary environment variables (especially `FIREBASE_SERVICE_ACCOUNT_KEY`) are set in your deployment environment.
- [ ] At least one admin user has been created using the admin setup script.
- [ ] Firestore and Storage security rules have been deployed to the Firebase console.
- [ ] Run `npm run build` to ensure the project builds without errors.

After completing these steps, your application should be ready to deploy.

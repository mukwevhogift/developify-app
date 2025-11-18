'use server'

import { getAdminApp, getAdminAuth } from "./admin-config";
import { firestore } from 'firebase-admin';

export async function setUserRole(uid: string, role: string, status: string) {
    const auth = getAdminAuth();
    const db = getAdminApp().firestore();

    try {
        await auth.setCustomUserClaims(uid, { role, status });
        const userRef = db.collection('users').doc(uid);
        await userRef.update({ role, status, kycVerified: status === 'verified_owner' });
        console.log(`Successfully set custom claims and updated user doc for ${uid}`);
        return { success: true };
    } catch (error) {
        console.error('Error setting custom claims:', error);
        throw new Error('Failed to set user role.');
    }
}


export async function handleKycRequest(requestId: string, userId: string, action: 'approve' | 'reject') {
    const db = getAdminApp().firestore();
    try {
        const kycRef = db.collection('kyc_requests').doc(requestId);
        const userRef = db.collection('users').doc(userId);
        const adminActionRef = db.collection('admin_actions').doc();
        
        const batch = db.batch();

        if (action === 'approve') {
            await getAdminAuth().setCustomUserClaims(userId, { role: 'property_owner', status: 'verified_owner' });
            batch.update(userRef, { status: 'verified_owner', kycVerified: true });
            batch.update(kycRef, { status: 'approved' });
        } else { // reject
            await getAdminAuth().setCustomUserClaims(userId, { role: 'property_owner', status: 'rejected' });
            batch.update(userRef, { status: 'rejected' });
            batch.update(kycRef, { status: 'rejected' });
        }
        
        batch.set(adminActionRef, {
            action: `${action}_kyc`,
            targetId: requestId,
            targetUserId: userId,
            timestamp: firestore.FieldValue.serverTimestamp(),
            // adminId: 'placeholder_admin_id' // In a real app, get this from the authenticated admin user
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error(`Error handling KYC request ${requestId}:`, error);
        throw new Error(`Failed to ${action} KYC request.`);
    }
}


export async function handlePropertyRequest(propertyId: string, action: 'approve' | 'reject', reason?: string) {
    const db = getAdminApp().firestore();
    try {
        const propertyRef = db.collection('properties').doc(propertyId);
        const adminActionRef = db.collection('admin_actions').doc();

        const batch = db.batch();

        if (action === 'approve') {
            batch.update(propertyRef, { status: 'approved' });
        } else { // reject
             if (!reason) {
                throw new Error("Rejection reason is required.");
            }
            batch.update(propertyRef, { status: 'rejected', rejectedReason: reason });
        }
        
         batch.set(adminActionRef, {
            action: `${action}_property`,
            targetId: propertyId,
            timestamp: firestore.FieldValue.serverTimestamp(),
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error(`Error handling property request ${propertyId}:`, error);
        throw new Error(`Failed to ${action} property request.`);
    }
}

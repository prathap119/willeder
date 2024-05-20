import { logger } from 'firebase-functions/v1';
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
import { UserDocument } from '../../../models/user/user.entity';
import { db } from '../../../utils/firebase';
export const updateAccount = async ( address: string ,phone: string, name: string,email: string,user_id:string) => {
  // TODO
  try {
  const userRef = db.collection('users').doc(user_id);

  // Check if the user document exists
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    console.error('User not found');
    return { success: false, message: 'User not found' };
  }
  await userRef.update({
    address,
    phone,
    name,
    email
  });

  console.log('Account updated successfully');
  return { success: true, message: 'Account updated successfully' };
} catch (error) {
  console.error('Error updating account:', error);
  return { success: false, message: 'Error updating account', error };
}
};

export const updatePassword = async (user_id:string,password:string) => {
  // TODO
   try {
    const userRef = db.collection('users').doc(user_id);
  
    // Check if the user document exists
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      console.error('User not found');
      return { success: false, message: 'User not found' };
    }
    await userRef.update({
      password
    });
  
    return { success: true, message: 'Account password updated successfully' };
  } catch (error) {
    console.error('Error updating account:', error);
    return { success: false, message: 'Error updating account', error };
  }
};

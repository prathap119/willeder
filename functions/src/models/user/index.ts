import { db } from '../../utils/firebase'; // Adjust the import path as per your project structure

export const updateUserFieldsrefresh= async (userId:string) => {
  try {
    const fieldsToUpdate = {
        refresh_token: null
      };
  
      const userDocRef = db.collection('users').doc(userId);
      await userDocRef.update(fieldsToUpdate);

   
    console.log('User document updated successfully');
  } catch (error) {
    console.error('Error updating user document:', error);
    throw error;
  }
};

export const updateUserFields = async (userId:string,refresh_token:any) => {
    try {
      
        await db.collection('users').doc(userId).update(refresh_token, { merge: true });
        console.log('User document updated successfully');
      } catch (error) {
        console.error('Error updating user document:', error);
        throw new Error('Error updating user document');
      }
  };
export const getUser = async (userId:string) => {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (!userDoc.exists) {
        throw new Error('User not found');
      }
      return userDoc.data();
    } catch (error) {
      console.error('Error getting user document:', error);
      throw error;
    }
  };

  export const getUserByEmail = async (email:string) => {
    try {
        const userDoc = await db.collection('users').where('email', '==', email).get();

        if (userDoc.empty) {
          console.log('No user found with the email:', email);
          return [];
        }
        const userDataArray = userDoc.docs.map((doc) => doc.data());
        return userDataArray;
    } catch (error) {
      console.error('No user found with the email:', error);
      throw error;
    }
  };
  

  export const getUserByUser = async (user_id:string) => {
    try {
        const userDoc = await db.collection('users').where('user_id', '==', user_id).get();

        if (userDoc.empty) {
          console.log('No user found with the user_id:', user_id);
          return [];
        }
        const userDataArray = userDoc.docs.map((doc) => doc.data());
        return userDataArray;
    } catch (error) {
      console.error('No user found with the user_id:', error);
      throw error;
    }
  };
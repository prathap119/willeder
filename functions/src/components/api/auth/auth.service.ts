import { logger } from 'firebase-functions/v1';
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
import {
  badImplementationException,
  dataConflictException,
  dataNotExistException,
  HttpException,
  invalidException,
} from '../../../utils/apiErrorHandler';
import { sendMessage } from '../../../utils/sgMailer';
import { hashPassword } from '../../../utils/bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getAddToCurrentJST, getCurrentJST } from '../../../utils/dayjs';
import { TokenDocument } from '../../../models/token/token.entity';
import { addToken, deleteToken, getToken } from '../../../models/token';
import { MESSAGE_RESET_PASSWORD } from './auth.message';
// import { addUser, getUserByEmail, updateUserFields } from '../../../models/user';
import { UserDocument } from '../../../models/user/user.entity';
import { db } from '../../../utils/firebase';

export const createUser = async (email: string, password: string, name: string, phone: string, address: string) => {


    try {
    const userDocRef = db.collection('users').doc(); 
    const userId = userDocRef.id;
    const newUser = {
      user_id:userId,
      email: email,
      password: password, // You should hash the password before storing it
      name: name,
      phone: phone,
      address: address,
      status:true,
      refresh_token:null,
      createdat: new Date(),
      updatedat: new Date(),
      deleted_at:null
    };
    await userDocRef.set(newUser);
    logger.info(`User created successfully`);
    return userDocRef.id;  // Return the ID of the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');  
  }
  

};

export const forgotPassword = async (user: UserDocument) => {
  let error: Error | HttpException | undefined;
  try {
    const newToken: TokenDocument = {
      token_id: uuidv4(),
      user_id: user.user_id,
      token_type: 'resetPassword',
      user_type: 'user',
      created_at: getCurrentJST(),
      expired_at: getAddToCurrentJST(1, 'h'),
    };

    await addToken(newToken);

    const tokenUrl = process.env.FRONTEND_URL + '/user/password/reset/' + newToken.token_id;

    await sendMessage(MESSAGE_RESET_PASSWORD(user.email, tokenUrl));

    return Promise.resolve('success');
  } catch (err) {
    logger.error(err);
    error = err instanceof Error ? err : badImplementationException(err);
    return Promise.reject(error);
  }
};

export const updatePassword = async (password: string, tokenId: string) => {
  let error: Error | HttpException | undefined;
  try {
    const token = await getToken(tokenId);
    if (!token) throw dataNotExistException('Token does not exist');
    if (token.user_type !== 'user') throw invalidException('Token is not valid user type');
    if (token.token_type !== 'resetPassword') throw invalidException('Token is not valid token type');

    // TODO
    // await updateUserFields(token.user_id, { password: hashPassword(password), updated_at: getCurrentJST() });

    await deleteToken(tokenId);

    return Promise.resolve();
  } catch (err) {
    console.log(err);
    error = err instanceof Error ? err : badImplementationException(err);
    return Promise.reject(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { unauthorizedException } from './apiErrorHandler';
import { logger } from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {

   
    
    const bearer = req.headers['authorization'];
    if (!bearer) throw unauthorizedException('No token provided');

    const token = bearer.split(' ')[1];
    if (!token) throw unauthorizedException('Malformed token');

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) throw unauthorizedException('Invalid token');

    req.user = { user_id: decodedToken.uid, name: decodedToken.name || '' };



    // TODO

    // req.user = { user_id: undefined, name: '' };
    next();
  } catch (err) {
    logger.warn(err);
    next(err);
  }
};

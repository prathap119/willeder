import { Request, Response, NextFunction } from 'express';
import {
    badImplementationException,
    dataNotExistException,
    unauthorizedException,
  } from '../../../utils/apiErrorHandler';
  import { logger } from 'firebase-functions/v1';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';
import * as service from './account.service';
import { getUserByUser } from '../../../models/user';

export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address, phone ,name,email,user_id} = req.body;

  const update_data=await service.updateAccount(address, phone ,name,email,user_id);
  if(update_data){

    res.status(200).json(update_data);
  }

  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { user_id,password} = req.body;

  const updatePassword=await service.updatePassword(user_id,password);
  if(updatePassword){

    res.status(200).json(updatePassword);
  }

  } catch (err: any) {
    logger.error(err);
    next(err);
  }

};



export const getAccountInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { user_id } = req.body;
  
      const users = await getUserByUser(user_id);
  
      
      if (users.length === 0) throw dataNotExistException('User not exist');
      if (users.length > 1) throw badImplementationException('Something went wrong. User  is more than 1.');
  
  
      res.status(200).json(users);
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  };

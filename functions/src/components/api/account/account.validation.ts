import { Schema } from 'express-validator';
import { VALIDATION_STRING,VALIDATION_ACCOUNT_TEL,VALIDATION_PASSWORD,VALIDATION_EMAIL_NOT_EXIST,VALIDATION_EMAIL_EXIST,VALIDATION_PASSWORD_CHECK,VALIDATION_TOKEN} from '../../../constants/validation';

export const ACCOUNT_SCHEMA: Schema = {
    email: VALIDATION_EMAIL_NOT_EXIST('body'),
    name: VALIDATION_STRING('body'),
    phone: VALIDATION_ACCOUNT_TEL('body'),
    address: VALIDATION_STRING('body'),
};

export const ACCOUNT_PASSWORD_SCHEMA: Schema = {
    password: VALIDATION_PASSWORD('body'),
};

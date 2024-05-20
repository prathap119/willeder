import { ParamSchema, Location } from 'express-validator';

export const VALIDATION_STRING = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});
export const VALIDATION_ACCOUNT_TEL = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  matches: {
    options: /^[0-9]{10}$/,
    errorMessage: 'Phone number must be 10 digits'
  },
 
});
export const VALIDATION_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isLength: {
    options: { min: 6 },
    errorMessage: 'Password must be at least 6 characters long'
  },
});

export const VALIDATION_EMAIL_NOT_EXIST = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: {
    errorMessage: 'Invalid email format'
  },
  notEmpty: {
    errorMessage: 'Email cannot be empty'
  }
});

export const VALIDATION_EMAIL_EXIST = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: {
    errorMessage: 'Invalid email format'
  },
  notEmpty: {
    errorMessage: 'Email cannot be empty'
  },
 
});
export const VALIDATION_PASSWORD_CHECK = (where: Location, emailField: string): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,

});


export const VALIDATION_TOKEN = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
 
  
});



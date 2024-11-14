import { computed } from 'vue';
import { appUtils } from '.';

const requiredRule =
  (message: string = 'Field is required') =>
  (value: string) => {
    return value ? true : message;
  };

const emailFormatRule =
  (message: string = 'Email is invalid') =>
  (value: string) => {
    const emailRegex = appUtils.getEmailValidatorRegex();

    return emailRegex.test(value) ? true : message;
  };

const minLengthRule =
  (
    message: string = 'Value must be at least 8 characters',
    length: number = 8
  ) =>
  (value: string) => {
    return value.length >= length ? true : message;
  };

const maxLengthRule =
  (
    message: string = 'Value must be at most 16 characters',
    length: number = 16
  ) =>
  (value: string) => {
    return value.length <= length ? true : message;
  };

const passwordFormatRule =
  (
    message: string = "'Password must contain at least one uppercase, one lowercase, one number and one special character'"
  ) =>
  (value: string) => {
    const passwordRegex = appUtils.getPasswordValidatorRegex();

    return passwordRegex.test(value) ? true : message;
  };

const twitterFormatRule =
  (message: string = 'Twitter Url is invalid') =>
  (value: string) => {
    const twitterRegex = appUtils.getTwitterRegex();

    return twitterRegex.test(value) ? true : message;
  };

const facebookFormatRule =
  (message: string = 'Facebook Url is invalid') =>
  (value: string) => {
    const facebookRegex = appUtils.getFacebookRegex();

    return facebookRegex.test(value) ? true : message;
  };

const linkedinFormatRule =
  (message: string = 'Linkedin Url is invalid') =>
  (value: string) => {
    const linkedinRegex = appUtils.getLinkedinRegex();

    return linkedinRegex.test(value) ? true : message;
  };

const instagramFormatRule =
  (message: string = 'Instagram Url is invalid') =>
  (value: string) => {
    const InstagramRegex = appUtils.getInstagramRegex();

    return InstagramRegex.test(value) ? true : message;
  };

const numberEnsurityRule =
  (message: string = 'Each character must be a number') =>
  (value: string) => {
    return /^\d+$/.test(value) ? true : message;
  };

const matchPasswordRule =
  (message = 'Confirm Password must be same with password', passwordRef: any) =>
  (value: string) => {
    return value === passwordRef ? true : message;
  };

export default {
  requiredRule,
  emailFormatRule,
  minLengthRule,
  maxLengthRule,
  passwordFormatRule,
  twitterFormatRule,
  linkedinFormatRule,
  facebookFormatRule,
  instagramFormatRule,
  matchPasswordRule,
  numberEnsurityRule,
};

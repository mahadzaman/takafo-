import { IApp } from '@/interfaces';

const getEmailValidatorRegex = (): RegExp => {
  return /^(([^<>()#$%&*{}~=[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
};

const getPasswordValidatorRegex = (): RegExp => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`$!#^()_\-=+%*?&])[A-Za-z\d@~`$!#^()_\-=+%*?&]{3,16}$/;
};

/**
 * Return Regex for facebook URL validation
 * @return Regex for facebook URl validation. You can use .test function to validate string
 */
const getFacebookRegex = (): RegExp => {
  return /^(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/;
};

/**
 * Return Regex for instagram URL validation
 * @return Regex for instagram URl validation. You can use .test function to validate string
 */
const getInstagramRegex = (): RegExp => {
  return /^(?:https?:\/\/)?(?:www\.)?(m\.instagram|instagram)\.(com)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/;
};

/**
 * Return Regex for twitter URL validation
 * @return Regex for twitter URl validation. You can use .test function to validate string
 */

const getTwitterRegex = (): RegExp => {
  return /^(?:https?:\/\/)?(?:www\.)?(twitter)\.(com)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/;
};

/**
 * Return Regex for linkedin URL validation
 * @return Regex for linkedin URl validation. You can use .test function to validate string
 */
const getLinkedinRegex = (): RegExp => {
  return /^(?:https?:\/\/)?(?:www\.)?(linkedin)\.(com)\/(in|pub|public-profile\/in|public-profile\/pub|company|jobs)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/;
};

/**
 * Extracts error message from Axios error response object
 * @param error
 * @returns {string} error message
 */
const extractAxiosErrorMessage = (error: any): IApp.ErrorMsgResponse => {
  const errorMsg = 'Something went wrong. Please try again later.';

  const type = 'general';

  const resp = {
    msg: errorMsg,
    type: type,
  };

  const response = error?.response; // AxiosResponse

  if (!response) return resp; // No response
  const msg = response?.data?.message;

  resp.msg = msg || errorMsg;

  return resp;
};

const formatCounter = (counter: number) => {
  return counter < 10 ? `0${counter}` : counter.toString();
};

export default {
  getEmailValidatorRegex,
  getPasswordValidatorRegex,
  extractAxiosErrorMessage,
  getTwitterRegex,
  getFacebookRegex,
  getInstagramRegex,
  getLinkedinRegex,
  formatCounter,
};

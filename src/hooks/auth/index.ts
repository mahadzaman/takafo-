import { useMutation } from '@tanstack/vue-query';
import { AuthApis } from '@/stores/apis';

const useMenu = () => {
  return useMutation({
    mutationFn: AuthApis.fetchMenu,
  });
};

const useEmailLogin = () => {
  return useMutation({
    mutationFn: AuthApis.emailLogin,
  });
};

const useCandidateLogin = () => {
  return useMutation({
    mutationFn: AuthApis.candidateLogin,
  });
};

const useSsoLogin = () => {
  return useMutation({
    mutationFn: AuthApis.SsoLogin,
  });
};

const useSignUp = () => {
  return useMutation({
    mutationFn: AuthApis.signUp,
  });
};

const useForgotPasswordEmail = () => {
  return useMutation({
    mutationFn: AuthApis.forgotPasswordEmail,
  });
};

const useResetPassword = () => {
  return useMutation({
    mutationFn: AuthApis.resetPassword,
  });
};

const useOtpVerification = () => {
  return useMutation({
    mutationFn: AuthApis.verfiyOtp,
  });
};

const useUserType = () => {
  return useMutation({
    mutationFn: AuthApis.userType,
  });
};

export {
  useEmailLogin,
  useForgotPasswordEmail,
  useResetPassword,
  useOtpVerification,
  useUserType,
  useSignUp,
  useCandidateLogin,
  useSsoLogin,
  useMenu,
};

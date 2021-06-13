import { AuthError } from '@aws-amplify/auth/lib/Errors'
// forgot password
export const ExpiredCode = 'ExpiredCodeException'
export const CodeMismatch = 'CodeMismatchException'
export const LimitExceeded = 'LimitExceededException'
export const InvalidParameter = 'InvalidParameterException'
export const UserNotFound = 'UserNotFoundException'
// signin
export const UserNotConfirmed = 'UserNotConfirmedException'

export const SignInErrors = {
  UserNotConfirmed,
  UserNotFound,
}
export const ResetPassword = {
  ExpiredCode,
  CodeMismatch,
  LimitExceeded,
  InvalidParameter,
  UserNotFound,
}

export interface AwsError extends AuthError {
  code: string
}

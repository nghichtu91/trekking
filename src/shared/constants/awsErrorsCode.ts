import { AuthError } from '@aws-amplify/auth/lib/Errors'
// forgot password
export const ExpiredCode = 'ExpiredCodeException'
export const CodeMismatch = 'CodeMismatchException'
export const LimitExceeded = 'LimitExceededException'
export const InvalidParameter = 'InvalidParameterException'
export const UserNotFound = 'UserNotFoundException'
// signin
export const UserNotConfirmed = 'UserNotConfirmedException'
// verify account
export const NotAuthorized = 'NotAuthorizedException'
// signUp
export const UsernameExists = 'UsernameExistsException'

export const SignInErrors = {
  UserNotConfirmed,
  UserNotFound,
  NotAuthorized,
}

export const ResetPassword = {
  ExpiredCode,
  CodeMismatch,
  LimitExceeded,
  InvalidParameter,
  UserNotFound,
}

export const VerifyUsernameErrors = {
  LimitExceeded,
  InvalidParameter,
  CodeMismatch,
  UserNotFound,
  NotAuthorized,
}

export const SignUpErrors = {
  UsernameExists,
}

export interface AwsError extends AuthError {
  code: string
}

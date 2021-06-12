import { AuthError } from '@aws-amplify/auth/lib/Errors'
// forgot password
export type ResetPassword =
  | 'ExpiredCodeException'
  | 'CodeMismatchException'
  | 'LimitExceededException'

export interface AwsError extends AuthError {
  code: string
}

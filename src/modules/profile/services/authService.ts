/**
 * @author ThanhLe
 * @version v0.0.1
 *
 */

import { Auth, Storage } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types'
import { ISignUpResult } from 'amazon-cognito-identity-js'
interface IAuthService {
  signUp(
    username: string,
    password: string,
    email: string,
    phone_number: string
  ): Promise<ISignUpResult>
  signIn(username: string, password: string): Promise<unknown>
  signInWithEmail(): Promise<boolean>
  signInWithSocial(provider: CognitoHostedUIIdentityProvider): Promise<boolean>
}

export class AuthService implements IAuthService {
  signInWithEmail(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  signInWithSocial(provider: CognitoHostedUIIdentityProvider): Promise<boolean> {
    Auth.federatedSignIn({ provider: provider })
    return Promise.resolve(true)
  }

  signUp(
    username: string,
    password: string,
    email: string,
    phone_number: string,
    name?: string
  ): Promise<ISignUpResult> {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number, // optional - E.164 number convention
        name,
        // other custom attributes
      },
    })
  }

  signIn(username: string, password: string): Promise<unknown> {
    return Auth.signIn(username, password)
  }

  async updateUserAttributes(attributes: Record<string, unknown>): Promise<boolean> {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, attributes)
      return Promise.resolve(true)
    } catch (error) {
      return Promise.resolve(false)
    }
  }

  async uploadAvatar(fileUpload: File): Promise<boolean | string | unknown> {
    try {
      const avatar = await Storage.put(fileUpload.name, fileUpload)
      return Promise.resolve(avatar['key'])
    } catch (error) {
      return Promise.resolve(false)
    }
  }
}

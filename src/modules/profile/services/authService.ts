/**
 * @author ThanhLe
 * @version v0.0.1
 *
 */

import { Auth, Storage } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types'

interface IAuthService {
  signUp(username: string, password: string, email: string, phone_number: string): Promise<boolean>
  signIn(username: string, password: string): Promise<boolean>
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

  async signUp(
    username: string,
    password: string,
    email: string,
    phone_number: string
  ): Promise<boolean> {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number, // optional - E.164 number convention
          // other custom attributes
        },
      })
      console.log(user)
      return Promise.resolve(true)
    } catch (error) {
      console.log('error signing up:', error)
    }
  }

  async signIn(username: string, password: string): Promise<boolean> {
    try {
      await Auth.signIn(username, password)
      return Promise.resolve(true)
    } catch (error) {
      console.log('error signing in', error)
    }
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

import React, { useState, useEffect, useRef } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { Form, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { AuthError } from '@aws-amplify/auth/lib/Errors'
import { authService } from '@modules/profile/services'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

interface SignUpFields {
  username: string
  password: string
  phone: string
}

interface SignInError extends AuthError {
  code: string
}

export interface IForumOperations {
  handleSignUp?: (fileds: SignUpFields) => void
  handleSignIn?: (opts: unknown) => void
  goToSignUpPage?: () => void
  signInWithGooogle?: () => void
  signInWithFacebook?: () => void
  handleForGotPassword?: () => void
  loading?: boolean
  formLoading?: boolean
  isUpdated?: boolean
  form?: FormInstance
  errors?: string[]
  forgot?: boolean
}

export function withLoginHandling<P extends IForumOperations>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const [isFormLoading, setIsFormLoading] = useState(false)
    const [isForgot, setIsForGot] = useState(false)
    const router = useRouter()
    const [signUpForm] = Form.useForm()
    const { t } = useTranslation()
    const [siginErrors, setSiginErrors] = useState<string[]>([])
    const usernameRef = useRef<string>()

    useEffect(() => {
      isCheckoutUser()
    }, [])

    const isCheckoutUser = async () => {
      const user = await Auth.currentUserInfo()
      if (user) {
        router.push({
          pathname: Routers.HomePage,
        })
      }
    }

    const goToHomePage = () => {
      return router.push(Routers.HomePage)
    }

    const handleSignIn = async (signInFileds: SignUpFields) => {
      setIsFormLoading(true)
      setSiginErrors([])
      try {
        await authService.signIn(signInFileds.username, signInFileds.password)
        afterSignInSuccess()
      } catch (error) {
        usernameRef.current = signInFileds.username
        afterSignInFailure(error)
      }
    }

    const afterSignInSuccess = () => {
      goToHomePage()
    }

    const goToPage = () => {
      return router.push(Routers.RegisterPage)
    }

    const handleOkBtn = () => {
      authService.resendOpt(usernameRef.current)
      router.push({
        pathname: Routers.VerifyPage,
        query: { username: usernameRef.current },
      })
    }

    const afterSignInFailure = (errors: SignInError) => {
      setIsFormLoading(false)
      const { code } = errors
      switch (code) {
        case 'UserNotConfirmedException':
          {
            Modal.error({
              title: t('authentication.signIn.verifyModalTitle'),
              content: t('authentication.signIn.verifyModalContent'),
              centered: true,
              okText: t('authentication.signIn.textVerifyNow'),
              maskClosable: true,
              closable: true,
              onOk: handleOkBtn,
            })
          }
          break
        case 'UserNotFoundException':
          {
            setSiginErrors([t('authentication.signIn.userNameOrPassIncorrect')])
          }
          break

        default:
          break
      }
    }

    const handleSignInFb = () => {
      authService.signInWithSocial(CognitoHostedUIIdentityProvider.Facebook)
    }

    const handleSignInGg = () => {
      authService.signInWithSocial(CognitoHostedUIIdentityProvider.Google)
    }
    const handleForGotPassword = () => {}

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleSignIn={handleSignIn}
        goToSignUpPage={goToPage}
        signInWithFacebook={handleSignInFb}
        signInWithGooogle={handleSignInGg}
        handleForGotPassword={handleForGotPassword}
        form={signUpForm}
        errors={siginErrors}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

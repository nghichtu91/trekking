import React, { useState, useEffect, useRef } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { Form, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { authService } from '@modules/profile/services'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import { AwsError, SignInErrors } from '@shared/constants/awsErrorsCode'
import { SignInField } from '@modules/profile/components/Authentication'

export interface IForumOperations {
  handleSignUp?: (fileds: SignInField) => void
  handleSignIn?: (opts: unknown) => void
  goToSignUpPage?: () => void
  goToForGotPassPage?: () => void
  signInWithGooogle?: () => void
  signInWithFacebook?: () => void
  handleForGotPassword?: (fileds: SignInField) => void
  loading?: boolean
  formLoading?: boolean
  isUpdated?: boolean
  form?: FormInstance
  forgotForm?: FormInstance
  errors?: string[]
  isGetOpt?: boolean
}

export function withLoginHandling<P extends IForumOperations>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const [isFormLoading, setIsFormLoading] = useState(false)
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

    const handleSignIn = async (signInFileds: SignInField) => {
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

    const goToPageSignUp = () => {
      return router.push(Routers.RegisterPage)
    }

    const handleOkBtn = () => {
      authService.resendOpt(usernameRef.current)
      router.push({
        pathname: Routers.VerifyPage,
        query: { username: usernameRef.current },
      })
    }

    const afterSignInFailure = (errors: AwsError) => {
      setIsFormLoading(false)
      const { code } = errors
      switch (code) {
        case SignInErrors.UserNotConfirmed:
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
        case SignInErrors.UserNotFound:
        case SignInErrors.NotAuthorized:
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

    const goToForGotPasswordPage = () => {
      router.push({
        pathname: Routers.ForgotPasswordPage,
      })
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleSignIn={handleSignIn}
        goToSignUpPage={goToPageSignUp}
        goToForGotPassPage={goToForGotPasswordPage}
        signInWithFacebook={handleSignInFb}
        signInWithGooogle={handleSignInGg}
        form={signUpForm}
        errors={siginErrors}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

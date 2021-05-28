import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { authService } from '@modules/profile/services'
import { Form, notification } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { AuthError } from '@aws-amplify/auth/lib/Errors'

interface SignUpFields {
  email: string
  password: string
  phone: string
}

interface VerifyParams {
  pin: string
  username?: string
}

interface SignUpError extends AuthError {
  code: string
}

export interface IForumOperations {
  handleSignUp?: (fileds: SignUpFields) => void
  handleSignIn?: (opts: unknown) => void
  handleVerify?: (opts: unknown) => void
  handleReSendOtp?: (opts: unknown) => void
  loading?: boolean
  formLoading?: boolean
  isUpdated?: boolean
  form?: FormInstance
}

export function withExtraAuthen<P extends IForumOperations>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const [isFormLoading, setIsFormLoading] = useState(false)
    const router = useRouter()
    const [signUpForm] = Form.useForm()
    const { t } = useTranslation()

    useEffect(() => {
      isCheckoutUser()
    }, [])

    const isCheckoutUser = async () => {
      const user = await Auth.currentUserInfo()
      console.log(user)
      if (user) {
        router.push({
          pathname: Routers.HomePage,
        })
      }
    }

    const handleSignUp = async (signInFileds: SignUpFields) => {
      setIsFormLoading(true)
      try {
        const { phone, password, email } = signInFileds
        await authService.signUp(email, password, email, `+${phone}`, '')
        afterSignUpSuccess(email)
      } catch (error) {
        afterSignUpFailure(error)
      }
    }

    const afterSignUpSuccess = (username: string) => {
      router.push({
        pathname: Routers.VerifyPage,
        query: { username },
      })
      return false
    }

    const afterSignUpFailure = (error: SignUpError) => {
      setIsFormLoading(false)
      switch (error.code) {
        case 'UsernameExistsException':
          {
            const emailExist = t('authentication.signUp.emailExist')
            signUpForm.setFields([
              {
                name: 'email',
                errors: [emailExist],
              },
            ])
          }
          break
        default:
      }
    }

    const handleSignIn = async (signInFileds: SignUpFields) => {
      console.log(signInFileds)
    }

    const handleVerify = async (verifyParams: VerifyParams) => {
      setIsFormLoading(true)
      if (!verifyParams.pin) {
        return false
      }
      try {
        authService.confirmAaccount('thanh2@yopmail.com', verifyParams.pin)
        afterVerifySuccess(verifyParams)
      } catch (error) {
        console.log(error)
        afterVerifyFailure(error)
      }
    }

    const afterVerifySuccess = (verifyParams: VerifyParams) => {
      console.log(verifyParams)
      notification.success({
        message: 'ABBB',
        description: 'dsdsds',
        placement: 'bottomRight',
      })
    }

    const afterVerifyFailure = (error: SignUpError) => {
      console.log(error)
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleSignUp={handleSignUp}
        handleSignIn={handleSignIn}
        handleVerify={handleVerify}
        form={signUpForm}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

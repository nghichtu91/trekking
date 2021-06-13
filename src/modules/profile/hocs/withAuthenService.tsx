import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { authService } from '@modules/profile/services'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { SignUpFields } from '@modules/profile/components/Authentication'
import { AwsError, SignUpErrors } from '@shared/constants/awsErrorsCode'

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

    const afterSignUpFailure = (error: AwsError) => {
      setIsFormLoading(false)
      switch (error.code) {
        case SignUpErrors.UsernameExists:
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

    const handleSignIn = () => {
      router.push({
        pathname: Routers.SignInPage,
      })
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleSignUp={handleSignUp}
        handleSignIn={handleSignIn}
        form={signUpForm}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

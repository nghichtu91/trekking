import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { AuthError } from '@aws-amplify/auth/lib/Errors'
import { authService } from '@modules/profile/services'
import { Modal } from 'antd'

interface SignUpFields {
  username: string
  password: string
  phone: string
  code: string
}

interface SignInError extends AuthError {
  code: string
}

export interface IForumOperations {
  handleSignIn?: (opts: unknown) => void
  handleGetOpt?: (fileds: SignUpFields) => void
  handleResetPassword?: (fileds: SignUpFields) => void
  hendleResendOpt?: () => void
  loading?: boolean
  formLoading?: boolean
  isUpdated?: boolean
  form?: FormInstance
  errors?: string[]
  isGetOpt?: boolean
}

export function withForGotPasswordHandling<P extends IForumOperations>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const [isFormLoading, setIsFormLoading] = useState(false)
    const [isGetOpt, setIsGetOpt] = useState(false)
    const router = useRouter()
    const [forGotForm] = Form.useForm()
    const { t } = useTranslation()
    const [forgotErrors, setForgotErrors] = useState<string[]>([])

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

    const getOptForGotPassword = async (fields: SignUpFields) => {
      setIsFormLoading(true)
      setForgotErrors([])
      try {
        await authService.getOtpForGot(fields.username)
        setIsGetOpt(true)
        setIsFormLoading(false)
      } catch (error) {
        getOtpFailure(error)
      }
    }

    const getOtpFailure = (errors: SignInError) => {
      setIsFormLoading(false)
      switch (errors.code) {
        case 'InvalidParameterException':
          {
            forGotForm.setFields([
              {
                name: 'username',
                errors: [''],
              },
            ])
            setForgotErrors([t('authentication.forgot.usernameNotVerified')])
          }
          break
        case 'LimitExceededException':
          {
            setForgotErrors([t('authentication.forgot.limited')])
            forGotForm.setFields([
              {
                name: 'username',
                errors: [''],
              },
            ])
          }
          break
        case 'UserNotFoundException':
          {
            forGotForm.setFields([
              {
                name: 'username',
                errors: [t('authentication.forgot.usernameNotExist')],
              },
            ])
          }
          break
        default:
          break
      }
    }

    const goToSignInPage = () => {
      router.push({
        pathname: Routers.SignUpPage,
      })
    }

    const handleResetPassword = async (fields: SignUpFields) => {
      setIsFormLoading(true)
      try {
        const { username, code, password } = fields
        await authService.resetPassword(username, code, password)
        resetPasswordSuccess()
      } catch (errors) {
        resetPasswordFailure(errors)
      }
    }

    const resetPasswordSuccess = () => {
      setIsFormLoading(false)
      Modal.success({
        content: t('authentication.forgot.resetPasswordSuccess'),
        title: t('authentication.forgot.modalTitle'),
        okText: t('authentication.forgot.textOk'),
        centered: true,
        onOk: goToSignInPage,
      })
    }

    const resetPasswordFailure = (errors: SignInError) => {
      setIsFormLoading(false)
      switch (errors.code) {
        case 'ExpiredCodeException':
        case 'CodeMismatchException':
          {
            forGotForm.setFields([
              {
                name: 'code',
                errors: [t('authentication.forgot.otpIncorrect')],
              },
            ])
          }
          break
        case 'InvalidPasswordException':
          {
            forGotForm.setFields([
              {
                name: 'password',
                errors: [t('authentication.forgot.newPasswordNotValid')],
              },
            ])
          }
          break
        default:
          break
      }
    }

    const resendOpt = () => {
      setForgotErrors([])
      setIsGetOpt(false)
      forGotForm.setFieldsValue({
        code: null,
        password: null,
        'confirm-password': null,
      })
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleGetOpt={getOptForGotPassword}
        handleResetPassword={handleResetPassword}
        hendleResendOpt={resendOpt}
        isGetOpt={isGetOpt}
        form={forGotForm}
        errors={forgotErrors}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

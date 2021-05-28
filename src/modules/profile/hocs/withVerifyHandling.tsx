import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { authService } from '@modules/profile/services'
import { Form, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { AuthError } from '@aws-amplify/auth/lib/Errors'

interface VerifyParams {
  pin: string
}

interface SignUpError extends AuthError {
  code: string
}

export interface IForumOperations {
  handleVerify?: (opts: unknown) => void
  handleReSendOtp?: (opts: unknown) => void
  loading?: boolean
  formLoading?: boolean
  isUpdated?: boolean
  form?: FormInstance
  errors?: string[]
  userName?: string
}

export function withVerifyHandling<P extends IForumOperations>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const [isFormLoading, setIsFormLoading] = useState(false)
    const router = useRouter()
    const [verifyForm] = Form.useForm()
    const { t } = useTranslation()
    const [verifyErrors, setVerifyErrors] = useState<string[]>([])
    const usernameVerify = useRef<string>()

    const getUserNameVerifyFormQuery = useCallback(() => {
      usernameVerify.current = router.query['username'] as string
    }, [router])

    useEffect(() => {
      getUserNameVerifyFormQuery()
    }, [getUserNameVerifyFormQuery])

    useEffect(() => {
      isCheckoutUser()
    }, [])

    const goToHomePage = () => {
      router.push({
        pathname: Routers.HomePage,
      })
    }

    const isCheckoutUser = async () => {
      const user = await Auth.currentUserInfo()
      if (user) {
        goToHomePage()
      }
    }

    const resetErrors = () => setVerifyErrors([])

    const handleVerify = async (verifyParams: VerifyParams) => {
      setIsFormLoading(true)
      if (!verifyParams.pin) {
        return false
      }
      try {
        await authService.confirmAaccount(usernameVerify.current, verifyParams.pin)
        afterVerifySuccess()
      } catch (error) {
        afterVerifyFailure(error)
      }
    }

    const handleResendOpt = async () => {
      resetErrors()
      try {
        await authService.resendOpt(usernameVerify.current)
        afterResendOptSuccess()
      } catch (error) {
        afterResendOptFailure(error)
      }
    }

    const afterResendOptSuccess = () => {
      Modal.success({
        title: 'Thông báo',
        content: t('verifyOTP.titleSub'),
        okText: t('verifyOTP.textClose'),
        centered: true,
        closable: true,
      })
    }

    const afterResendOptFailure = (error: SignUpError) => {
      switch (error.code) {
        case 'LimitExceededException':
          {
            setVerifyErrors([t('verifyOTP.limitExceeded')])
          }
          break
        case 'UserNotFoundException':
          {
            setVerifyErrors([t('verifyOTP.usernameNotExist')])
          }
          break
        case 'InvalidParameterException':
          {
            setVerifyErrors([t('verifyOTP.confirmed')])
          }
          break
        case 'CodeMismatchException':
          {
            verifyForm.setFields([
              {
                name: 'pin',
                errors: [t('verifyOTP.otpIncorrect')],
              },
            ])
          }
          break
        default:
      }
      setIsFormLoading(false)
    }

    const afterCloseModal = () => {
      goToHomePage()
    }

    const afterVerifySuccess = () => {
      Modal.success({
        title: 'Thông báo',
        content: t('verifyOTP.otpsuccess'),
        okText: t('verifyOTP.textClose'),
        centered: true,
        closable: true,
        onOk: afterCloseModal,
      })
    }

    const afterVerifyFailure = (error: SignUpError) => {
      switch (error.code) {
        case 'NotAuthorizedException':
          {
            setVerifyErrors([t('verifyOTP.confirmed')])
          }
          break
        case 'UserNotFoundException':
          {
            setVerifyErrors([t('verifyOTP.usernameNotExist')])
          }
          break
        case 'CodeMismatchException':
          {
            verifyForm.setFields([
              {
                name: 'pin',
                errors: [t('verifyOTP.otpIncorrect')],
              },
            ])
          }
          break
        default:
      }
      setIsFormLoading(false)
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleVerify={handleVerify}
        handleReSendOtp={handleResendOpt}
        form={verifyForm}
        errors={verifyErrors}
        loading={isFormLoading}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

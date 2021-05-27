import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { authService } from '@modules/profile/services'
import { Form, notification } from 'antd'
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
}

export function withVerifyHandling<P extends IForumOperations>(
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
      if (user) {
        router.push({
          pathname: Routers.HomePage,
        })
      }
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
        handleVerify={handleVerify}
        form={signUpForm}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

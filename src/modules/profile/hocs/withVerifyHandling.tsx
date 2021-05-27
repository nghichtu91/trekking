import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { authService } from '@modules/profile/services'
import { Form } from 'antd'
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
        const username = router.query['username'] as string
        await authService.confirmAaccount(username, verifyParams.pin)
        afterVerifySuccess(verifyParams)
      } catch (error) {
        afterVerifyFailure(error)
      }
    }

    const afterVerifySuccess = (verifyParams: VerifyParams) => {
      console.log(verifyParams)
    }

    const afterVerifyFailure = (error: SignUpError) => {
      switch (error.code) {
        case 'NotAuthorizedException':
          {
            // verifyForm.setFields([
            //   {
            //     name: 'pin',
            //     errors: ['Tài khoản đã được kích hoạt'],
            //   },
            // ])
            setVerifyErrors(['Tài khoản đã được kích hoạt'])
          }
          break
        case 'UserNotFoundException':
          {
            // verifyForm.setFields([
            //   {
            //     name: 'pin',
            //     errors: ['Email hoặc số điện thoại không tồn tại'],
            //   },
            // ])
            setVerifyErrors(['Email hoặc số điện thoại không tồn tại'])
          }
          break
        default:
      }
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleVerify={handleVerify}
        form={verifyForm}
        errors={verifyErrors}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

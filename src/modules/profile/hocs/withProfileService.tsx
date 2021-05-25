import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { ProfileFormProps } from '@modules/profile/components/general'
import { authService } from '@modules/profile/services'

export interface IForumOperations {
  updateBankingMethod?: (opts: unknown) => void
  updatePhoneNumber?: (opts: unknown) => void
  updateProfile?: (opts: unknown) => void
  updateAvatar?: (file: File) => void
  loading?: boolean
  formLoading?: boolean
  isUpdated?: boolean
}

export function withExtraInfo<P extends IForumOperations>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const [isFormLoading, setIsFormLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
      isCheckoutUser()
    }, [])

    const isCheckoutUser = async () => {
      const user = await Auth.currentUserInfo()
      if (!user) {
        router.push({
          pathname: Routers.RegisterPage,
        })
      }
    }

    const handleUpdateBankingMethod = () => {
      setIsFormLoading(true)
      setIsFormLoading(false)
    }

    const handleUpdateProfile = async (opts: ProfileFormProps) => {
      setIsFormLoading(true)
      const profileUpdate: Record<string, unknown> = {
        name: opts.fullName,
        address: opts.address,
        phone_number: opts.phoneNumber,
      }
      if (opts.fileUpload) {
        const fileUpload = opts.fileUpload
        const avatar = await authService.uploadAvatar(fileUpload)
        profileUpdate.picture = avatar
      }
      await authService.updateUserAttributes(profileUpdate)
      setIsFormLoading(false)
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        updateBankingMethod={handleUpdateBankingMethod}
        updateProfile={handleUpdateProfile}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

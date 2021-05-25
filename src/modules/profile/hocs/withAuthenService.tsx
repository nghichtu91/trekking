import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Routers } from '@shared/constants/routers'
import { ProfileFormProps } from '@modules/profile/components/general'
// import { authService } from '@modules/profile/services'

export interface IForumOperations {
  handleSignUp?: (opts: unknown) => void
  handleSignIn?: (opts: unknown) => void
  loading?: boolean
  formLoading?: boolean
  isUpdated?: boolean
}

export function withExtraAuthen<P extends IForumOperations>(
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
      if (user) {
        router.push({
          pathname: Routers.HomePage,
        })
      }
    }

    const handleSignUp = async (opts: ProfileFormProps) => {
      console.log(opts)
      setIsFormLoading(true)
    }

    const handleSignIn = async (opts: ProfileFormProps) => {
      console.log(opts)
    }

    return (
      <WrappedComponent
        formLoading={isFormLoading}
        handleSignUp={handleSignIn}
        handleSignIn={handleSignUp}
        {...props}
      />
    )
  }
  return ComponentWithExtraInfo
}

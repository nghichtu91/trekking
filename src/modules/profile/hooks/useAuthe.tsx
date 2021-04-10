import { useEffect, useContext, useState } from 'react'
import { Auth } from 'aws-amplify'
import { UserAttributesDTO } from '../dtos/userAttributesDto'
import { Context } from '@shared/infra/context/gobalContext'
import { IUser } from '@modules/profile/models/user'

export const UseAws = () => {
  const { dispatch } = useContext(Context)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const updateProfile = (payload: IUser) => {
    dispatch({
      type: 'profile_update',
      payload,
    })
  }

  const authListener = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      const userAttibutes: UserAttributesDTO = user.attributes
      const userPlayload: IUser = {
        fullName: userAttibutes.name,
        email: userAttibutes.email,
        userId: user.getUsername(),
        avatar: userAttibutes.picture,
      }
      updateProfile(userPlayload)
      setIsAuthenticated(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    authListener()
  }, [])

  return [isAuthenticated]
}

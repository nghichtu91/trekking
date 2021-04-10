import { useContext } from 'react'
import { Context } from '@shared/infra/context/gobalContext'

export const useProfile = () => {
  const { profile } = useContext(Context)
  return { profile }
}

import { useContext } from 'react'
import { Context } from '../context/gobalContext'
export const useDispatch = () => {
  const { dispatch } = useContext(Context)
  return dispatch
}

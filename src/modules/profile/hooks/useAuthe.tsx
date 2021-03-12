import { useEffect } from 'react'
import { Hub } from 'aws-amplify'

export const UseAws = () => {
  useEffect(() => {
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signIn':
          console.log('signIn')
          break
        // return setSignedInUser(true)
        case 'signOut':
          console.log('signIn')
          break
        // return setSignedInUser(false)
      }
    })
  })
}

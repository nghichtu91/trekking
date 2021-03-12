import { Draft } from 'immer'
import { IUser } from '../models/user'

export interface ProfileState {
  profile?: IUser
}

export const ProfileInitState: ProfileState = { profile: undefined }

export type ccc = 'OPEN_MENU111' | 'CLOSE_MENU1111'

export interface ActionCCC {
  type: ccc
  payload?: unknown
}

export const reducerProfile = (draft: Draft<ProfileState>, action: ActionCCC) => {
  switch (action.type) {
    case 'OPEN_MENU111':
      // draft.isMenuShown = true
      console.log('dsdsdsds')
      draft.profile.fullName = 'Lê Nhật Thành'
      break
    case 'CLOSE_MENU1111':
      // draft.isMenuShown = false
      console.log('dsdsdsds')
      draft.profile.fullName = 'Lê Nhật Thành'
      break
    default:
      return draft
  }
}

import { Draft } from 'immer'
import { IUser } from '../models/user'

export interface ProfileState {
  profile?: IUser
}

export const ProfileInitState: ProfileState = { profile: undefined }
export type ProfileActionTypes = 'profile_success' | 'profile_failed' | 'profile_update'
export type ProfileUpdate = 'profile_update'

export interface ProfleAction {
  type: ProfileActionTypes | ProfileUpdate
  payload?: unknown | IUser
}

export const reducerProfile = (draft: Draft<ProfileState>, action: ProfleAction) => {
  switch (action.type) {
    case 'profile_failed':
      draft.profile.fullName = 'Lê Nhật Thành'
      break
    case 'profile_success':
      draft.profile.fullName = 'Lê Nhật Thành'
      break
    case 'profile_update':
      draft.profile = action.payload
      break
    default:
      return draft
  }
}

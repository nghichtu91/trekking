import contextCreator from './contextCreator'
import { Draft } from 'immer'
import { combineReducers } from '@shared/utils/combineReducers'
import {
  reducerProfile,
  ProfileState,
  ProfileActionTypes,
  ProfileUpdate,
} from '@modules/profile/context/reducer'
import { IUser } from '@modules/profile/models'

interface State {
  theme?: {
    isMenuShown: boolean
    type: number | ''
  }
}

interface RootState extends ProfileState {
  theme?: {
    isMenuShown: boolean
    type: number | ''
  }
}

const initState: RootState = {
  theme: {
    isMenuShown: false,
    type: '',
  },
  profile: {},
}

type mainccc = ProfileActionTypes | ProfileUpdate | 'CLOSE_MENU' | 'OPEN_MENU'

interface Action {
  type: mainccc
  payload?: unknown | IUser
}

const reducer = (draft: Draft<State>, action: Action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      draft.theme.isMenuShown = true
      break
    case 'CLOSE_MENU':
      draft.theme.isMenuShown = false
      break
    default:
      return draft
  }
}

const mainReducers = combineReducers(reducer, reducerProfile)
const { Context, ContextProvider } = contextCreator<RootState, Action>(initState, mainReducers)
export { Context, ContextProvider }

import contextCreator from './contextCreator'
import { Draft } from 'immer'
import { combineReducers } from '@shared/utils/combineReducers'
import { reducerProfile, ProfileState, ccc } from '@modules/profile/context/store'

interface State extends ProfileState {
  theme?: {
    isMenuShown: boolean
    type: number | ''
  }
}

const initState: State = {
  theme: {
    isMenuShown: false,
    type: '',
  },
  profile: {},
}

type mainccc = ccc | 'CLOSE_MENU' | 'OPEN_MENU'

interface Action {
  type: mainccc
  payload?: unknown
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
const { Context, ContextProvider } = contextCreator<State, Action>(initState, mainReducers)
export { Context, ContextProvider }

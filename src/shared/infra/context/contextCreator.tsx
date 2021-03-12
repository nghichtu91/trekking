import React, { useReducer, Dispatch, Reducer } from 'react'
import { produce, Draft } from 'immer'

/**
 * Action
 */

interface Action {
  type: string
  payload?: unknown
}

/**
 * Dispatch
 */

interface ContextDispatch<Y> {
  dispatch: Dispatch<Y>
}

interface DraftReducer<X, Y> {
  (this: Draft<X>, draft: Draft<X>, action: Y): X
}

function contextCreator<X, Y extends Action>(initialState: X, reducer: DraftReducer<X, Y>) {
  const Context = React.createContext<X & ContextDispatch<Y>>(null)
  const ContextProvider = ({ children }) => {
    const immerReducer = produce(reducer) as Reducer<X, Y>
    const [state, dispatch] = useReducer(immerReducer, initialState)
    return <Context.Provider value={{ ...state, dispatch }}>{children}</Context.Provider>
  }

  return { Context, ContextProvider }
}

export default contextCreator

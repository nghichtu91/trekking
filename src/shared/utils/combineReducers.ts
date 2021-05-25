export const combineReducers = (...reducers) => (prevState, value, ...args) => {
  return reducers.reduce((newState, reducer) => {
    return reducer(newState, value, ...args)
  }, prevState)
}

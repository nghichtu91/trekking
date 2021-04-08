export const combineReducers = (...reducers) => (prevState, value, ...args) => {
  return reducers.reduce((newState, reducer) => {
    console.info('value: ', value)
    return reducer(newState, value, ...args)
  }, prevState)
}

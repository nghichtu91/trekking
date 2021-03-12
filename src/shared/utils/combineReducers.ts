export const combineReducers = (...reducers) => (prevState, value, ...args) => {
  return reducers.reduce((newState, reducer) => reducer(newState, value, ...args), prevState)
}

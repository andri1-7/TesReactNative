import createReducer from '../Components/Redux/CreateReducer';
import * as TYPES from '../Components/Redux/Types';

/**
 * Counter Reducer
 */
export const counter = createReducer(0, {
  [TYPES.COUNTER](state, action) {
    return action.counter;
  }
});

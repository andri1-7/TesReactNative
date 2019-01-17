import * as TYPES from '../Components/Redux/Types';

const TAG = "GENERAL ACTIONS";

/**
 * Counter Function
 * @param {Boolean} increment - Operation type, increment or not (decrement)
 */
export function counterStrike(increment = true) {
  return (dispatch, getState) => {
    return dispatch({
      type: TYPES.COUNTER,
      counter: (increment) ? getState().counter + 1 : getState().counter - 1
    });
  }
}

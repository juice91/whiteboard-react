/*

 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHECK_SESSION, LOAD_SESSION_SUCCESS } from './constants';

// The initial state of the App
export const initialState = fromJS({
  session: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SESSION_SUCCESS:
      return state.set('username', action.payload);
    default:
      return state;
  }
}

export default appReducer;

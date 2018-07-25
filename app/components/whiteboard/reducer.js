import { fromJS } from 'immutable';
import { EventEmitter } from 'events';

const initialState = fromJS({
  isDrawing: false,
  mode: 'Brush',
  stage: {},
  ui: new EventEmitter(),
});

function canvasReducer(state = initialState, action) {
  console.log(action);
  if (!action) return;
  switch (action.type) {
    case 'switch-mode':
      return state.set('mode', action.payload);
    case 'ui-command':
      state.get('ui').emit('command', action.payload);
    default:
      return state;
  }
}

export default canvasReducer;

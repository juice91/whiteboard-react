import { CHECKSESSION } from './constants';

export function checkSession() {
  return {
    type: CHECKSESSION,
  };
}

export function SessionLoaded(session) {
  return {
    type: LOAD_SESSION_SUCCESS,
    payload: session,
  };
}

const START_SESSION = 'START_SESSION';
const CANCEL_SESSION = 'CANCEL_SESSION';
const PAUSE_SESSION = 'PAUSE_SESSION';
const RESUME_SESSION = 'RESUME_SESSION';
const COMPLETE_SESSION = 'COMPLETE_SESSION';
const DURATION_CHANGE_SESSION = 'DURATION_CHANGE_SESSION';
const DURATION_CHANGE_BREAK = 'DURATION_CHANGE_BREAK';

export function startSession() {
  return {
    type: START_SESSION,
  };
}

export function cancelSession(sessionsCancelled) {
  return {
    type: CANCEL_SESSION,
    sessionsCancelled,
  };
}

export function pauseSession() {
  return {
    type: PAUSE_SESSION,
  };
}

export function resumeSession() {
  return {
    type: RESUME_SESSION,
  };
}

export function completeSession(newSessionsCompleted, totalSessionTimeCompleted) {
  return {
    type: COMPLETE_SESSION,
    newSessionsCompleted,
    totalSessionTimeCompleted,
  };
}

export function durationChangeSession(value) {
  return {
    type: DURATION_CHANGE_SESSION,
    value,
  };
}

export function durationChangeBreak(value) {
  return {
    type: DURATION_CHANGE_BREAK,
    value,
  };
}

const initialState = {
  sessionDuration: 25,
  breakDuration: 5,
  sessionsCompleted: 0,
  sessionTimeCompleted: 0,
  sessionsCancelled: 0,
  sessionStarted: false,
  sessionPaused: false,
  sessionResumed: false,
  sessionCancelled: false,
  breakStarted: false,
  breakCompleted: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case START_SESSION:
      return {
        ...state,
        sessionStarted: true,
      };
    case CANCEL_SESSION:
      return {
        ...state,
        sessionStarted: false,
        sessionPaused: false,
        sessionsCancelled: action.sessionsCancelled + 1,
      };
    case PAUSE_SESSION:
      return {
        ...state,
        sessionPaused: true,
      };
    case RESUME_SESSION:
      return {
        ...state,
        sessionPaused: false,
      };
    case COMPLETE_SESSION:
      return {
        ...state,
        sessionStarted: false,
        sessionsCompleted: action.newSessionsCompleted,
        sessionTimeCompleted: action.totalSessionTimeCompleted,
      };
    case DURATION_CHANGE_SESSION:
      return {
        ...state,
        sessionDuration: action.value,
      };
    case DURATION_CHANGE_BREAK:
      return {
        ...state,
        breakDuration: action.value,
      };
    default:
      return state;
  }
}

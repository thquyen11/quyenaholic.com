
import { INITIATE_RUNTIME, TIMEOUT_ID } from '../../constans';

/**
 * Tomato Clock
 */
const initialClock = {
	sessionSetting: 20,
	sessionRun: 0,
	breakSetting: 5,
	breakRun: 0,
	timeoutId: 0,
	isRun: false,
};

export const Clock = (state = initialClock, action: any = {}) => {
	switch (action.type) {
		case "session-increase":
			return Object.assign({}, state, { sessionSetting: action.payload + 1 });
		case "session-decrease":
			return Object.assign({}, state, { sessionSetting: action.payload - 1 });
		case "break-increase":
			return Object.assign({}, state, { sessionSetting: action.payload + 1 });
		case "break-increase":
			return Object.assign({}, state, { sessionSetting: action.payload - 1 });
		case "start":
			return Object.assign({}, state, { isRun: true });
		case "stop":
			return Object.assign({}, state, { isRun: false});
		case INITIATE_RUNTIME:
			return Object.assign({}, state, { sessionRun: action.payload.sessionLen, breakRun: action.payload.breakLen });
		case TIMEOUT_ID:
			return Object.assign({}, state, { timeoutId: action.payload });
		default:
			return state;
	}
};

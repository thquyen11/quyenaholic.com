
import {
	TIMEOUT_ID, REMAIN_SECONDS, SESSION_INCREASE, SESSION_DECREASE, BREAK_INCREASE, BREAK_DECREASE,
	QUERY_RANDOM_QUOTE_SUCCESS, QUERY_RANDOM_QUOTE_FAIL
} from '../../constans';

/**
 * Tomato Clock
 */
const initialClock = {
	sessionSetting: 30,
	breakSetting: 5,
	remainSeconds: 1200, //sessionSetting * 60
	timeoutId: [] as number[],
	isRun: false,
	clockStatus: "session",
};

export const Clock = (state = initialClock, action: any = {}) => {
	switch (action.type) {
		case SESSION_INCREASE:
			return Object.assign({}, state, { sessionSetting: state.sessionSetting + action.payload });
		case SESSION_DECREASE:
			return Object.assign({}, state, { sessionSetting: state.sessionSetting - action.payload });
		case BREAK_INCREASE:
			return Object.assign({}, state, { breakSetting: state.breakSetting + action.payload });
		case BREAK_DECREASE:
			return Object.assign({}, state, { breakSetting: state.breakSetting - action.payload });
		case "start":
			return Object.assign({}, state, { isRun: true });
		case "stop":
			return Object.assign({}, state, { isRun: false });
		case TIMEOUT_ID:
			state.timeoutId.push(action.payload);
			return state;
		case REMAIN_SECONDS:
			return Object.assign({}, state, { remainSeconds: action.payload });
		default:
			return state;
	}
};

/**
 * Quotes Box
 */
const initalQuotes = {
	quoteContent: "",
	quoteAuthor: "",
}

export const QuotesBox = (state = initalQuotes, action: any = {}) => {
	switch (action.type) {
		case QUERY_RANDOM_QUOTE_SUCCESS:
			return Object.assign({}, state, { quoteContent: action.payload.quoteContent, quoteAuthor: action.payload.quoteAuthor });
		case QUERY_RANDOM_QUOTE_FAIL:
			return Object.assign({}, state);
		default:
			return state;
	}
}

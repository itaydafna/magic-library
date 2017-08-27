import ACTIONS from "../actions/";

export default (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.EDIT_BOOK:
			return { ...{}, ...state, ...action.book };
		default:
			return state;
	}
};

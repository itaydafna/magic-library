import fetchBooks from "../services/fetch-books";
import ACTIONS, { receiveBooks } from "../actions";

export default store => next => action => {
	if (action.type === ACTIONS.FETCH_BOOKS) {
		fetchBooks().then(result => {
			if (result.status <= 300 && result.statusText === "OK") {
				return result.json().then(json => {
					if (json.books) {
						store.dispatch(receiveBooks({ books: json.books }));
					}
				});
			}
		});
	}
	return next(action);
};

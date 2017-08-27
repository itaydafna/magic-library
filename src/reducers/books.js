import _ from "lodash";
import ACTIONS from "../actions";
import book from "./book";

import createBookPath from "../services/create-book-path";

export default (state = [], action) => {
	let bookIndex;
	switch (action.type) {
		case ACTIONS.RECEIVE_BOOKS:
			//sort books alphabetically
			return (
				_.sortBy(action.books, "title")
					//add a url path to each book
					.map(
						book => ({
							...book,
							...{
								path: createBookPath({ bookTitle: book.title })
							}
						})
					)
			);

		case ACTIONS.DELETE_BOOK:
			bookIndex = state.findIndex(book => book.id === action.bookId);
			return [
				...state.slice(0, bookIndex),
				...state.slice(bookIndex + 1)
			];
		case ACTIONS.ADD_BOOK:
			//sort books alphabetically
			return _.sortBy([...state, action.book], "title");
		case ACTIONS.EDIT_BOOK:
			bookIndex = state.findIndex(book => book.id === action.book.id);
			return [
				...state.slice(0, bookIndex),
				book(state[bookIndex], action),
				...state.slice(bookIndex + 1)
			];
		default:
			return state;
	}
};

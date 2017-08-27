/*action types*/
const ACTIONS = {
	FETCH_BOOKS: "FETCH_BOOKS",
	RECEIVE_BOOKS: "RECEIVE_BOOKS",
	ADD_BOOK: "ADD_BOOK",
	EDIT_BOOK: "EDIT_BOOK",
	DELETE_BOOK: "DELETE_BOOK"
};

/*action creators*/
export const fetchBooks = () => ({
	type: ACTIONS.FETCH_BOOKS
});

export const receiveBooks = ({ books }) => ({
	type: ACTIONS.RECEIVE_BOOKS,
	books
});

export const addBook = ({ book }) => ({
	type: ACTIONS.ADD_BOOK,
	book
});

export const editBook = ({ book }) => ({
	type: ACTIONS.EDIT_BOOK,
	book
});

export const deleteBook = ({ bookId }) => ({
	type: ACTIONS.DELETE_BOOK,
	bookId
});

export default ACTIONS;

import { combineReducers } from "redux";

import books from "./books";
import book from "./book";

const rootReducer = combineReducers({
	books,
	book
});

export default rootReducer;

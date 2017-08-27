import { createStore, applyMiddleware } from "redux";
import fetchBooksMiddleware from "./middleware/fetch-books-middleware";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(fetchBooksMiddleware)(
	createStore
);

const store = createStoreWithMiddleware(reducers);

export default store;
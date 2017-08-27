const BOOKS_API_URL = "http://jsonstub.com/web-development-books";
const JSON_STUB_USER_KEY = "d4d6c613-b765-4bc3-9d31-9a42c2335f12";
const JSON_STUB_PROJECT_KEY = "d4fcadcf-3d5c-433f-975e-f1506560b43f";

export default () => {
	const headers = new Headers({
		"Content-Type": "application/json",
		"JsonStub-User-Key": JSON_STUB_USER_KEY,
		"JsonStub-Project-Key": JSON_STUB_PROJECT_KEY
	});
	const init = {
		method: "GET",
		headers
	};
    
	return fetch(BOOKS_API_URL, init);
};

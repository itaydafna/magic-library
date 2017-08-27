import validUrl from "valid-url";

/*The URL Fields in the app are valid either when empty or when they contain valid URLs*/
export default url => {
	if (url === "") {
		return true;
	}
	return validUrl.isUri(url);
};

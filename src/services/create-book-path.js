/*creates a normalized url path out of the book's title*/
export default ({ bookTitle }) =>
	bookTitle.replace(/\W+/g, " ").split(" ").join("-").toLowerCase();

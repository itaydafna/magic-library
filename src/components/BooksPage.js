import React from "react";
import BookCard from "./BookCard";
export default ({ books}) => {
	return (
		<section className="row justify-content-center">
			{books.map(book => <BookCard key={book.id} book={book} />)}
		</section>
	);
};

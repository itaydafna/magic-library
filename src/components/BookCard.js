import React from "react";
import moment from "moment";
import { Link } from "react-router";
import {
	Card,
	CardActions,
	CardHeader,
	CardText,
	CardTitle
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Edit from "material-ui/svg-icons/editor/mode-edit";
import Delete from "material-ui/svg-icons/action/delete";

export default ({ book }) => {
	const style = {
		card: {
			margin: 10
		},
		cardTitle: {
			height: 130
		},
		cardText: {
			height: 300,
			display: "flex",
			justifyContent: "center",
			background: "hsla(0, 33%, 96%, 0.87)",
			margin:"10px 35px",
			padding: 5
		},
		img: {
			display: "block",
			maxWidth: "100%",
			objectFit: "contain"
			
		},
		cardActions: {
			display: "flex",
			justifyContent: "center"
		}
	};
	return (
		<Card className="col-sm-11 col-lg-5 col-xl-3" style={style.card}>
			<CardHeader
				title={book.author}
				avatar={book.authorAvatarUrl || "images/avatar-placeholder.png"}
				subtitle={moment(book.published).format("MMM Do YYYY")}
			/>
			<CardTitle
				style={style.cardTitle}
				title={book.title}
				subtitle={book.subtitle}
			/>
			<CardText style={style.cardText}>
				<img
					src={book.coverImageUrl || "images/PlaceholderBook.png"}
					alt={book.title}
					style={style.img}
				/>
			</CardText>
			<CardActions style={style.cardActions}>
				<RaisedButton
					title="Edit This Book."
					primary={true}
					icon={<Edit />}
					containerElement={
						<Link to={`magic-library/edit/${book.path}`} />
					}
				/>

				<RaisedButton
					title="Delete This Book."
					icon={<Delete />}
					secondary={true}
					containerElement={
						<Link to={`magic-library/delete/${book.path}`} />
					}
				/>

			</CardActions>
		</Card>
	);
};

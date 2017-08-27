import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import * as actions from "../actions";

class ConfirmDelete extends Component {
	state = {
		bookToDelete: ""
	};

	/*checking if book hasn't been deleted already*/
	componentWillReceiveProps(nextProps) {
		const { books, params } = nextProps;
		const bookToDelete = books.filter(book => book.path === params.book)[0];
		if (!bookToDelete) {
			this.handleClose();
		} else {
			this.setState({
				bookToDelete
			});
		}
	}

	handleClose() {
		this.context.router.push("magic-library");
	}

	render() {
		const { deleteBook } = this.props;
    const {bookToDelete} = this.state;
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose.bind(this)}
			/>,
			<FlatButton
				label="Yes"
				primary={true}
				keyboardFocused={true}
				onTouchTap={() =>
					deleteBook({ bookId: bookToDelete.id })}
			/>
		];
		return (
			<Dialog
				title={`Are you sure you would like to delete this book?`}
				actions={actions}
				modal={false}
				open={true}
				onRequestClose={this.handleClose.bind(this)}
			>
				<h2>{bookToDelete.title}</h2>
			</Dialog>
		);
	}
}

ConfirmDelete.contextTypes = {
	router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	books: state.books
});

export default connect(mapStateToProps, { ...actions })(ConfirmDelete);

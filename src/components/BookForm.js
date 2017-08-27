/*dependencies*/
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
/*components*/
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import LinearProgress from "material-ui/LinearProgress";

/*services*/
import createBookPath from "../services/create-book-path";
import validateUrlField from "../services/validate-url-field";

/*action creators*/
import * as actions from "../actions";

class BookForm extends Component {
	state = {
		/*is the form used to create a new book or to edit an existing one*/
		new: true,
		/*is the form valid for submission*/
		formValid: true,
		id: Date.now(),
		title: "",
		author: "",
		/*publishing date*/
		published: new Date(),
		subtitle: "",
		coverImageUrl: "",
		authorAvatarUrl: ""
	};

	/*checking the form is for creating a new book (default) or editing an existing one*/
	componentWillReceiveProps(nextProps) {
		const { books, params } = nextProps;
		if (params.book) {
			const bookToEdit = books.filter(book => book.path === params.book)[
				0
			];
			if (bookToEdit) {
				this.setState({ new: false, ...bookToEdit });
			}
		}
	}

	handleClose() {
		this.context.router.push("magic-library");
	}

	handleFieldChange(stateProp, value) {
		this.setState({
			[stateProp]: value
		});
	}

	handleSave() {
		if (this.validateForm()) {
			if (this.state.new) {
				this.props.addBook({
					book: {
						...{
							path: createBookPath({
								bookTitle: this.state.title
							})
						},
						...this.state,
						...{ new: false }
					}
				});
			} else {
				this.props.editBook({ book: { ...{}, ...this.state } });
			}
			this.handleClose();
		}
	}

	validateForm() {
		let formValid =
			this.state.title &&
			this.state.author &&
			//making sure publishing date is in the past
			moment().diff(moment(this.state.published)) >= 0 &&
			//making sure there is no book with the same title
			this.props.books.findIndex(
				book =>
					book.path ===
						createBookPath({ bookTitle: this.state.title }) &&
					book.id !== this.state.id
			) < 0 &&
			validateUrlField(this.state.coverImageUrl) &&
			validateUrlField(this.state.authorAvatarUrl);
		this.setState({ formValid });
		return formValid;
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose.bind(this)}
			/>,
			<FlatButton
				label="Save"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleSave.bind(this)}
			/>
		];

		const style = {
			form: {
				display: "flex",
				flexDirection: "column"
			},
			textField: {
				width: "70%"
			}
		};

		const errors = {
			general: "There are errors in the form.",
			requiredField: "This field is required.",
			matchingTitles: "A book with this title already exists.",
			invalidDate: "Publishing date can't be in the future.",
			invalidUrl: "Invalid Url."
		};

		//handle a case of edit-form route rendering before books ajax request resolved
		const isLoadingEdit =
			this.props.params.book && this.props.books.length === 0;

		return (
			<Dialog
				title={
					isLoadingEdit
						? "Loading..."
						: this.state.new
								? "Create New Book"
								: <span><strong>Edit:</strong> {this.state.title}</span>
				}
				actions={actions}
				modal={false}
				autoScrollBodyContent={true}
				open={true}
				onRequestClose={this.handleClose.bind(this)}
			>
				{isLoadingEdit
					? <LinearProgress mode="indeterminate" />
					: <form style={style.form}>
							<TextField
								style={style.textField}
								floatingLabelText="Book Title"
								value={this.state.title}
								multiLine={true}
								errorText={
									this.state.formValid
										? ""
										: !this.state.title
												? errors.requiredField
												: this.props.books.findIndex(
														book =>
															book.path ===
																createBookPath({
																	bookTitle: this
																		.state.title
																}) &&
															book.id !== this.state.id
													) >= 0
														? errors.matchingTitles
														: ""
								}
								onChange={(e, value) => {
									this.handleFieldChange.call(
										this,
										"title",
										value
									);
								}}
							/>
							<TextField
								style={style.textField}
								floatingLabelText="Author"
								value={this.state.author}
								multiLine={true}
								onChange={(e, value) => {
									this.handleFieldChange.call(
										this,
										"author",
										value
									);
								}}
								errorText={
									this.state.formValid
										? ""
										: !this.state.author
												? errors.requiredField
												: ""
								}
							/>
							<DatePicker
								floatingLabelText="Published On"
								openToYearSelection={true}
								value={new Date(this.state.published)}
								onChange={(e, value) => {
									this.handleFieldChange.call(
										this,
										"published",
										value
									);
								}}
								errorText={
									this.state.formValid
										? ""
										: moment().diff(
												moment(this.state.published)
											) < 0
												? errors.invalidDate
												: ""
								}
							/>
							<TextField
								style={style.textField}
								floatingLabelText="Subtitle"
								value={this.state.subtitle}
								multiLine={true}
								onChange={(e, value) => {
									this.handleFieldChange.call(
										this,
										"subtitle",
										value
									);
								}}
							/>
							<TextField
								style={style.textField}
								floatingLabelText="Cover Image URL"
								value={this.state.coverImageUrl}
								multiLine={true}
								onChange={(e, value) => {
									this.handleFieldChange.call(
										this,
										"coverImageUrl",
										value
									);
								}}
								errorText={
									this.state.formValid
										? ""
										: validateUrlField(
												this.state.coverImageUrl
											)
												? ""
												: errors.invalidUrl
								}
							/>
							<TextField
								style={style.textField}
								floatingLabelText="Author Avatar URL"
								value={this.state.authorAvatarUrl}
								multiLine={true}
								onChange={(e, value) => {
									this.handleFieldChange.call(
										this,
										"authorAvatarUrl",
										value
									);
								}}
								errorText={
									this.state.formValid
										? ""
										: validateUrlField(
												this.state.authorAvatarUrl
											)
												? ""
												: errors.invalidUrl
								}
							/>
						</form>}
			</Dialog>
		);
	}
}

BookForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	books: state.books
});

export default connect(mapStateToProps, { ...actions })(BookForm);

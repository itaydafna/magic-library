import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import RefreshIndicator from "material-ui/RefreshIndicator";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Grade from "material-ui/svg-icons/action/grade";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Add from "material-ui/svg-icons/content/add";
import BooksPage from "./BooksPage";

import * as actions from "../actions";

class App extends Component {
	componentWillMount() {
		this.props.fetchBooks();
	}

	render() {
		const style = {
			appBar: {
				width: "100%",
				position: "fixed",
				top: 0
			},

			section: {
				marginTop: 75,
				height: "auto",
				minHeight: "700px",
				position: "relative",
			},
			addButton: {
				position: "fixed",
				bottom: 20,
				right: 20,
				zIndex: 100
			},
			refresh: {
				marginLeft: '50%'
			}
		};

		return (
			<div>
				<AppBar
					title="Magic Library"
					iconElementLeft={<IconButton><Grade /></IconButton>}
					style={style.appBar}
				/>
				<div className="container-fluid">
					<main className="row">
						<section
							className="container-fluid  justify-content-center"
							style={style.section}
						>
							{this.props.children}
							{this.props.books.length > 0
								? <BooksPage books={this.props.books} />
								: <RefreshIndicator
										size={200}
										top={200}
										left={-100}
										status="loading"
									/>}
							<FloatingActionButton
								style={style.addButton}
								backgroundColor="#49ce49"
								title="Add New Book"
								containerElement={
									<Link to={`magic-library/new`} />
								}
							>
								<Add />
							</FloatingActionButton>
						</section>
					</main>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	books: state.books
});

export default connect(mapStateToProps, {
	...actions
})(App);

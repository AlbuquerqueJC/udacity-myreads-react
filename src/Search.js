import React from 'react'
import {Link} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import SearchResults from "./SearchResults";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchBooks: []
        }
    }

    onSearch = (value) => {
        console.log('onSearch app.js:', value)
        if (value.length > 1) {
            this.searchAPI(value)
        }
    };

    searchAPI = (query) => {
        BooksAPI.search(query).then((results) => {
            console.log('SearchBooks:', results);

            if (results.constructor.name === "Array") {
                this.setState(() => ({
                    searchBooks: results
                }));
            } else {
                this.setState(() => ({
                    searchBooks: []
                }));
            }
        })
    }

    handleInputChange = (e) => {
        const { value } = e.target;

        this.setState(() => ({
            query: value
        }));

        this.onSearch(this.state.query)
    };

    render() {
        const { query, searchBooks } = this.state
        const { onChangeShelf } = this.props
        console.log('searchBooks:', searchBooks);

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               value={query}
                               onChange={(e) => this.handleInputChange(e)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {searchBooks.length === 0 && (
                        <div>No search results to display.</div>
                    )}
                    <SearchResults searchBooks={searchBooks} onChangeShelf={onChangeShelf} />
                </div>
            </div>
        )
    }
}

export default Search

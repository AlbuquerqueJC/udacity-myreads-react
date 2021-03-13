import React from 'react'
import {Link} from "react-router-dom"
import SearchResults from "./SearchResults"
import PropTypes from "prop-types"
import * as BooksAPI from "./BooksAPI";

class Search extends React.Component {
    state = {
        searchBooks: []
    }

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    handleInputChange = (e) => {
        const { value } = e.target;
        this.onSearch(value)
    };

    onSearch = (value) => {
        console.log('onSearch app.js:', value)
        this.setState(() => ({
            query: value
        }))
        console.log('onSearch state app.js:', this.state.query)
        this.searchAPI(this.state.query)
    };

    searchAPI = (query) => {
        const searchValue = query.toString().toLowerCase().replace(/\s/g, '+')
        console.log('SearchBooks: (string)', searchValue);
        BooksAPI.search(searchValue).then((results) => {
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

    render() {
        const { onChangeShelf } = this.props
        const { query, searchBooks } = this.state
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

import React from 'react'
import {Link} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import SearchResults from "./SearchResults";
import PropTypes from "prop-types";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchBooks: []
        }
    }

    updateSearch = (books) => {
        this.setState(() => ({
            searchBooks: books
        }))
    }
    clearSearch = () => {
        this.updateSearch([])
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }
    clearQuery = () => {
        this.updateQuery('')
    }

    onSearch = (value) => {
        // console.log('onSearch app.js:', value)
        if (value.length > 0) {
            this.searchAPI(value)
        }
    }

    searchAPI = (query) => {
        BooksAPI.search(query).then((results) => {
            if (results.constructor.name === "Array") {
                this.updateSearch(results)
            } else {
                this.clearSearch()
            }
        })
    }

    handleInputChange = (e) => {
        const { value } = e.target

        // If there is a query value, search for it
        if (value) {
            this.updateQuery(value)
            // Search for value
            this.onSearch(value.toString().toLowerCase())
        }
        // Else set to blank
        else {
            this.clearQuery()
            this.clearSearch()
        }
    }

    render() {
        const { query, searchBooks } = this.state
        const { onChangeShelf, books } = this.props

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
                    {query.length === 0 && (
                        <div>No search results to display.</div>
                    )}
                    {query.length > 0 && (
                        <SearchResults books={books} searchBooks={searchBooks} onChangeShelf={onChangeShelf} />
                    )}
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}
export default Search

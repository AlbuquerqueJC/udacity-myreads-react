import React from 'react'
import Book from "./Book"
import PropTypes from "prop-types"

const SearchResults = props => {
    const { searchBooks, onChangeShelf } = props;

    return (
            <ol className="books-grid">
                {searchBooks.map((book, index) => (
                    <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                ))}
            </ol>
    )
}

SearchResults.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    searchBooks: PropTypes.array.isRequired
}

export default SearchResults

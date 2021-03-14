import React from 'react'
import Book from "./Book";
import PropTypes from "prop-types";

class SearchResults extends React.Component {

    matchShelfValue(book) {
        const matchingBook = this.props.books.filter((b) => (b.id.includes(book.id)))
        matchingBook.map((b) => ( book.shelf = b.shelf ))
        if (book.shelf === undefined) {
            book.shelf = 'none'
        }
        return book
    }

    render() {
        const { searchBooks, onChangeShelf } = this.props;

        return (
                <ol className="books-grid">
                    {searchBooks.map((book, index) => {
                        const resultBook = this.matchShelfValue(book)
                        return (
                            // Compare to existing book, add shelf value to book
                            <Book key={index} book={resultBook} onChangeShelf={onChangeShelf} />
                        )
                    })}
                </ol>
        )
    }
}

SearchResults.propTypes = {
    searchBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default SearchResults

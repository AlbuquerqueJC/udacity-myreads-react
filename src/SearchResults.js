import React from 'react'
import Book from "./Book";
import PropTypes from "prop-types";

class SearchResults extends React.Component {

    matchShelfValue(book) {
        let matchingBook = this.props.books.filter((b) => (b.id.includes(book.id)))
        matchingBook.map((b) => ( book.shelf = b.shelf ))
        return book
    }

    render() {
        const { searchBooks, onChangeShelf, books } = this.props;
        console.log('SearchResults books:', books)

        return (
                <ol className="books-grid">
                    {searchBooks.map((book, index) => (
                        // Compare to existing book, add shelf value to book
                        <Book key={index} book={this.matchShelfValue(book)} onChangeShelf={onChangeShelf} />
                    ))}
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

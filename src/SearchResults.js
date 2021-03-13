import React from 'react'
import Book from "./Book";

class SearchResults extends React.Component {
    render() {
        const { searchBooks, onChangeShelf } = this.props;

        return (
                <ol className="books-grid">
                    {searchBooks.map((book, index) => (
                        <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                    ))}
                </ol>
        )
    }
}

export default SearchResults

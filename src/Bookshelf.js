import React from 'react'
import Book from "./Book";
import PropTypes from "prop-types";

const Bookshelf = props => {
    const { shelf, books, onChangeShelf } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book, index) => (
                        <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                    ))}
                </ol>
            </div>
        </div>
    )
}

Bookshelf.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    shelf: PropTypes.object.isRequired
}

export default Bookshelf

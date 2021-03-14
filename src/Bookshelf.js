import React from 'react'
import Book from "./Book";
import PropTypes from "prop-types";

class Bookshelf extends React.Component {
    render() {
        const { shelf, books, onChangeShelf } = this.props;

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
}

Bookshelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default Bookshelf

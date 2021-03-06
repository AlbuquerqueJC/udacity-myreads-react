import React from 'react'
import serializeForm from 'form-serialize'
import PropTypes from "prop-types";

class Book extends React.Component {

    changeShelf = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true })
        console.log(values)

        this.props.onChangeShelf(values);
    }

    render() {
        const { book } = this.props

        const bgImage = (book.hasOwnProperty('imageLinks')) === true
            ? book.imageLinks.smallThumbnail
            : '#fff'

        const authors = (book.hasOwnProperty('authors')) === true
            ? book.authors
            : ['No Author']

        const shelfValue = (book.hasOwnProperty('shelf')) === true
            ? book.shelf
            : 'none'

        console.log('Book shelf?', shelfValue)

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                                 style={{
                                     width: 128,
                                     height: 193,
                                     backgroundImage: `url(${bgImage})`
                                 }} />
                        <div className="book-shelf-changer">
                            <form onSubmit={this.changeShelf}>
                                <input type="hidden" name="bookId" value={book.id} />
                                <select name="shelf"
                                        defaultChecked={shelfValue}
                                        defaultValue={shelfValue}
                                        onChange={() => this.submitButton.click()}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                                <button style={{display: "none"}} ref={node => { this.submitButton = node; }} />
                            </form>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {authors.map((author, index) => (
                        <div className="book-authors" key={index}>
                            {author}
                        </div>
                    ))}
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired
}
export default Book

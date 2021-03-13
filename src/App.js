import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from "./Search";
import Bookshelf from "./Bookshelf";

class BooksApp extends React.Component {

  state = {
    query: '',
    book: [],
    books: [],
    searchBooks: [],
    shelf: [{name: 'currentlyReading', title: 'Currently Reading'},
        {name: 'wantToRead', title: 'Want To Read'},
        {name: 'read', title: 'Read'}]
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
          console.log('BooksAPI getAll:', books)
          this.setState(() => ({
            books
          }))
        })
  }

  onSearch = (value) => {
        console.log('onSearch app.js:', value)
        this.setState(() => ({
          query: value
        }))
        console.log('onSearch state app.js:', this.state.query)
        this.searchAPI(this.state.query)
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

  onChangeShelf = (values) => {
      const { book, shelf } = values
      console.log("app.js onChangeShelf: ", book.id, shelf)

      // Clear searchBooks state after a book has changed shelf
      this.setState(() => ({
          searchBooks: []
      }))

      this.updateBook(book, shelf)
  }

  updateBook = (book, shelf) => {
      console.log('searchBooks state:', this.state.searchBooks);
      BooksAPI.update(book, shelf).then((response) => {
          console.log(response)
          book.shelf = shelf
          const otherBooks = this.state.books.filter((b) => (
              !b.id.includes(book.id)
          ))
          this.setState({
                 books: otherBooks.concat(book)
          })
      })
  }

  searchBooks = () => {
      return this.state.searchBooks
  }

  render() {
    const {books, shelf} = this.state
      // console.log('searchBooks.state: ', searchBooks)

    return (
      <div className="app">

        <Route exact path='/search' render={({history}) => (
          <Search searchBooks={this.searchBooks} onSearch={this.onSearch}
                  query={this.state.query}
                  onChangeShelf={(e) => {
                      this.onChangeShelf(e)
                      this.setState(() => ({
                          searchBooks: []
                      }))
                      history.push('/')
                  }} />
        )} />

        <Route exact path='/' render={({history}) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelf.map((shelf) => (
                  <Bookshelf key={shelf.name}
                             shelf={shelf}
                             books={books.filter((b) => (
                                 b.shelf.includes(shelf.name)
                             ))}
                             onChangeShelf={this.onChangeShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={(e) => {

                  history.push('/search')
              }}>Add a book</button>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp

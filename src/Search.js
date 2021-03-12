import React from 'react'
import {Link} from "react-router-dom";
import SearchResults from "./SearchResults";

class Search extends React.Component {
    state = {
        query: ''
    }

    handleInputChange = (e) => {
        const { value } = e.target;

        this.setState(() => ({
            query: value
        }));

        if (value.length > 1) {
            this.props.onSearch(value)
        }
    };

    render() {
        const { query } = this.state
        const { searchBooks, onChangeShelf } = this.props
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

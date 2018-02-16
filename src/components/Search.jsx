import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array,
    booksInAShelf: PropTypes.array,
    onSearchBooks: PropTypes.func.isRequired,
    onChangeABook: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired
  };

  clearState = () => {
    this.props.onClearSearch();
  };

  handleSearch = ev => {
    if (ev.currentTarget.value === '') {
      this.props.onClearSearch();
      return;
    }

    this.props.onSearchBooks(ev.currentTarget.value);
  };

  changeShelf = (book, shelf) => {
    this.props.onChangeABook(book, shelf);
  };

  componentWillUnmount() {
    this.props.onClearSearch();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf
            shelfTitle="Search results"
            books={this.props.books}
            onChangeShelf={this.changeShelf}
          />
        </div>
      </div>
    );
  }
}

export default Search;

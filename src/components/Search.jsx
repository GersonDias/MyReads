import React from 'react';
import { Link } from 'react-router-dom';
import { search, update, getAll } from '../services/BooksAPI';
import Bookshelf from './Bookshelf';

class Search extends React.Component {
  state = {
    books: []
  };

  currentlyBooks = { books: [] };

  componentDidMount() {
    // should getAll books to be able to sync shelf state.
    // this should be done because search API doesn't provide the shelf property
    getAll()
      .then(books => (this.currentlyBooks = books))
      .catch(err => {
        alert('Unable to get currently books on a shelf.');
        console.log(err);
      });
  }

  clearState = () => {
    this.setState({ books: [] });
  };

  handleSearch = ev => {
    if (ev.currentTarget.value === '') {
      this.clearState();
      return;
    }

    if (ev.currentTarget.value.length >= 3) {
      search(ev.currentTarget.value)
        .then(response => {
          if (response.error) {
            this.setState({ books: [] });
            return;
          }

          let enhancedBooks = response.map(book => {
            let bookInAShelf = this.currentlyBooks.find(
              bookInAShelf => book.id === bookInAShelf.id
            );
            if (bookInAShelf)
              return Object.assign({}, book, {
                shelf: bookInAShelf.shelf
              });

            return book;
          });

          this.setState({ books: enhancedBooks });
        })
        .catch(err => console.log('error ' + err));
    }
  };

  changeShelf = (book, shelf) => {
    update(book, shelf);
  };

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
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        </div>
      </div>
    );
  }
}

export default Search;

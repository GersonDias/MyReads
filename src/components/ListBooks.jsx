import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import { getAll, update } from '../services/BooksAPI';

class ListBooks extends React.Component {
  state = {
    books: []
  };

  oldState = { books: [] };

  getBooksForShelf = shelfTitle => {
    return this.state.books.filter(book => book.shelf === shelfTitle);
  };

  changeBookShelf = (book, shelfTitle) => {
    this.oldState = this.state;

    /* Updating the state locally, so the user doesn't need to wait the call for API update */
    this.setState({
      ...this.state,
      books: this.sortBooksByTitle(
        this.state.books.map(b => {
          return b.id !== book.id
            ? b
            : Object.assign({}, b, {
                shelf: shelfTitle
              });
        })
      )
    });

    /* If we can't update the API, so the changes will be reverted. */
    update(book, shelfTitle).catch(err => {
      this.onCommunicationError(
        'Unable to communicate with API. Your changes will be reverted',
        err
      );
    });
  };

  onCommunicationError(userErrMsg, err) {
    if (userErrMsg) alert(userErrMsg);
    console.log(err);
    if (this.oldState.books.length > 0) {
      this.setState(this.oldState);
    }
  }

  getBooksFromAPI() {
    getAll()
      .then(books => {
        this.setState({ books: this.sortBooksByTitle(books) });
      })
      .catch(err => {
        this.onCommunicationError('Unable to fetch books from API.', err);
      });
  }

  sortBooksByTitle(books) {
    return books.sort((a, b) => a.title > b.title);
  }

  componentDidMount() {
    this.getBooksFromAPI();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              shelfTitle="Currently Reading"
              books={this.getBooksForShelf('currentlyReading')}
              onChangeShelf={this.changeBookShelf}
            />
            <Bookshelf
              shelfTitle="Want to Read"
              books={this.getBooksForShelf('wantToRead')}
              onChangeShelf={this.changeBookShelf}
            />
            <Bookshelf
              shelfTitle="Read"
              books={this.getBooksForShelf('read')}
              onChangeShelf={this.changeBookShelf}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;

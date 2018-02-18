import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookChanged: PropTypes.func.isRequired,
  };

  getBooksForShelf = shelfId => {
    return this.props.books.filter(book => book.shelf === shelfId);
  };

  render() {
    const initialShelfs = [
      {
        id: 'currentlyReading',
        shelfTitle: 'Currently Reading',
        books: this.getBooksForShelf('currentlyReading'),
      },
      {
        id: 'wantToRead',
        shelfTitle: 'Want to Read',
        books: this.getBooksForShelf('wantToRead'),
      },
      {
        id: 'read',
        shelfTitle: 'Read',
        books: this.getBooksForShelf('read'),
      },
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {initialShelfs.map(shelf => {
              return (
                <Bookshelf
                  key={shelf.id}
                  shelfTitle={shelf.shelfTitle}
                  books={shelf.books}
                  onChangeShelf={this.props.onBookChanged}
                />
              );
            })}
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

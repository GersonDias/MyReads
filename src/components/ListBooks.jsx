import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookChanged: PropTypes.func.isRequired
  };

  getBooksForShelf = shelfTitle => {
    return this.props.books.filter(book => book.shelf === shelfTitle);
  };

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
              onChangeShelf={this.props.onBookChanged}
            />
            <Bookshelf
              shelfTitle="Want to Read"
              books={this.getBooksForShelf('wantToRead')}
              onChangeShelf={this.props.onBookChanged}
            />
            <Bookshelf
              shelfTitle="Read"
              books={this.getBooksForShelf('read')}
              onChangeShelf={this.props.onBookChanged}
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

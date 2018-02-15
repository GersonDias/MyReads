import React from 'react';
import PropTypes from 'prop-types';

class Bookshelf extends React.Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          {this.props.books && (
            <ol className="books-grid">
              {this.props.books.map(book => {
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${
                              book.imageLinks
                                ? book.imageLinks.smallThumbnail
                                : undefined
                            }"`
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={e => {
                              this.props.onChangeShelf(book, e.target.value);
                            }}
                            defaultValue={book.shelf || 'none'}
                          >
                            <option value="none" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          {!this.props.books.length && <h5>No books to show</h5>}
        </div>
      </div>
    );
  }
}

export default Bookshelf;

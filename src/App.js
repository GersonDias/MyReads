import React from 'react';
import * as BooksAPI from './services/BooksAPI';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ListBooks from './components/ListBooks';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    books: [],
    unchangedBooks: [],
    searchedBooks: [],
  };

  changeBookShelf = (book, shelfTitle) => {
    this.setState({ unchangedBooks: this.state.books });

    let books = this.state.books;

    /* Updating the state locally, so the user doesn't need to wait the call to Update method */
    this.setState({
      books: this.sortBooksByTitle(
        books.map(b => {
          return b.id !== book.id
            ? b
            : Object.assign({}, b, {
                shelf: shelfTitle,
              });
        })
      ),
    });

    /* If we can't update the API, so the changes will be reverted. */
    BooksAPI.update(book, shelfTitle)
      .then(() => {
        // make shure that we'll get new books or other server side changes.
        this.getBooksFromAPI();
      })
      .catch(err => {
        this.onCommunicationError(
          'Unable to communicate with API. Your changes will be reverted',
          err
        );
      });
  };

  onCommunicationError(userErrMsg, err) {
    if (userErrMsg) alert(userErrMsg);
    console.log(err);
    console.log(this.state);

    if (this.state.unchangedBooks.length > 0) {
      this.setState({
        books: this.state.unchangedBooks,
        unchangedBooks: [],
      });
    }
  }

  getBooksFromAPI() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books: this.sortBooksByTitle(books),
          unchangedBooks: this.sortBooksByTitle(books),
        });
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

  clearSearch = () => {
    this.setState({ searchedBooks: [] });
  };

  searchBooks = query => {
    if (query.length >= 3) {
      BooksAPI.search(query)
        .then(response => {
          if (response.error) {
            this.setState({ searchedBooks: [] });
            return;
          }

          let result = response.map(searchResult => {
            let bookInAShelf = this.state.books.find(
              bookInAShelf => searchResult.id === bookInAShelf.id
            );

            if (bookInAShelf) {
              return Object.assign({}, searchResult, {
                shelf: bookInAShelf.shelf,
              });
            }

            return searchResult;
          });

          this.setState({ searchedBooks: result });
        })
        .catch(err => console.log('error ' + err));
    }
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={() => (
                <ListBooks
                  books={this.state.books}
                  onBookChanged={this.changeBookShelf}
                />
              )}
              exact
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  books={this.state.searchedBooks}
                  booksInAShelf={this.state.books}
                  onChangeABook={this.changeBookShelf}
                  onSearchBooks={this.searchBooks}
                  onClearSearch={this.clearSearch}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;

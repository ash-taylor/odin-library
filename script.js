let myLibrary = [];

// function Book(title, author, pages) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = false;
// }

// Book.prototype.info = function() {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
// }

// Book.prototype.toggleRead = function () {
//   this.read ? this.read = false : this.read = true;
// }

// Book.prototype.addBookToLibrary = function () {
//   myLibrary.push(this);
// }

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  }

  toggleRead() {
    this.read ? (this.read = false) : (this.read = true);
  }

  addBookToLibrary() {
    myLibrary.push(this);
  }
}

let harryPotter = new Book("Harry Potter", "JK Rowling", 234);
let rings = new Book("Lord of the Rings", "JRR Tolkien", 1243);

harryPotter.addBookToLibrary();
rings.addBookToLibrary();

displayLibrary();

// Create 'add book button'
addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", createForm);

// Display library books in a table
function displayLibrary() {
  const table = document.querySelector("#book-table");

  myLibrary.forEach((item, i) => {
    let inTable = false;
    for (let row of table.rows) {
      if (item.title == row.cells[0].innerText) {
        inTable = true;
        console.log("boo");
        break;
      }
    }

    if (!inTable) {
      let row = table.insertRow();
      row.setAttribute(`id`, `book-${i}`);
      let titleCell = row.insertCell(0);
      let authorCell = row.insertCell(1);
      let pagesCell = row.insertCell(2);
      let readStatusCell = row.insertCell(3);
      let deleteBookCell = row.insertCell(4);

      titleCell.innerText = item.title;
      authorCell.innerText = item.author;
      pagesCell.innerText = item.pages;

      readStatusButton = document.createElement("button");
      readStatusButton.setAttribute("class", "read-status-button");
      readStatusButton.setAttribute("id", `a${i}`);
      readStatusButton.innerText = `${item.read ? "Read" : "Not read yet"}`;
      readStatusButton.addEventListener("click", function (event) {
        const book = myLibrary[Number(event.target.id.substring(1))];
        book.toggleRead();
        event.target.innerText = `${book.read ? "Read" : "Not read yet"}`;
      });
      readStatusCell.appendChild(readStatusButton);

      deleteBookButton = document.createElement("button");
      deleteBookButton.setAttribute("class", "delete-book-button");
      deleteBookButton.setAttribute("id", `${i}`);
      deleteBookButton.innerText = "Delete Book";
      deleteBookButton.addEventListener("click", function (event) {
        myLibrary.splice(Number(event.target.id), 1);
        rowToDelete = document.getElementById(
          `book-${Number(event.target.id)}`
        );
        rowToDelete.parentNode.removeChild(rowToDelete);
      });
      deleteBookCell.appendChild(deleteBookButton);
    }
  });
}

// Create Form Function
let formVisible;
function createForm() {
  if (!formVisible) {
    formVisible = true;

    form = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.innerText = "Title";
    const bookTitle = document.createElement("input");
    bookTitle.setAttribute("type", "text");
    bookTitle.setAttribute("name", "title");
    bookTitle.setAttribute("placeholder", "Title");

    const br = document.createElement("br");

    const authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "author");
    authorLabel.innerText = "Author";
    const bookAuthor = document.createElement("input");
    bookAuthor.setAttribute("type", "text");
    bookAuthor.setAttribute("name", "author");
    bookAuthor.setAttribute("placeholder", "Author");

    const pagesLabel = document.createElement("label");
    pagesLabel.setAttribute("for", "pages");
    pagesLabel.innerText = "Number of Pages";
    const bookPages = document.createElement("input");
    bookPages.setAttribute("type", "text");
    bookPages.setAttribute("name", "pages");
    bookPages.setAttribute("placeholder", "Pages");

    const readLabel = document.createElement("label");
    readLabel.innerText = "I have read this book";
    const bookReadStatus = document.createElement("input");
    bookReadStatus.setAttribute("type", "checkbox");
    bookReadStatus.setAttribute("name", "read");
    bookReadStatus.setAttribute("id", "read-status");
    const span = document.createElement("span");
    readLabel.appendChild(bookReadStatus);
    readLabel.appendChild(span);

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("name", "submit");
    submitButton.setAttribute("value", "Add Book to Library");

    form.appendChild(titleLabel);
    form.appendChild(bookTitle);
    form.appendChild(br.cloneNode());
    form.appendChild(authorLabel);
    form.appendChild(bookAuthor);
    form.appendChild(br.cloneNode());
    form.appendChild(pagesLabel);
    form.appendChild(bookPages);
    form.appendChild(br.cloneNode());
    form.appendChild(readLabel);
    form.appendChild(br.cloneNode());
    form.appendChild(submitButton);

    document.body.appendChild(form);

    submitButton.addEventListener("click", function (event) {
      formVisible = false;

      const title = bookTitle.value;
      const author = bookAuthor.value;
      const pages = bookPages.value;
      const readStatus = document.getElementById("read-status").checked;

      newBook = new Book(title, author, pages);
      if (readStatus) {
        newBook.toggleRead();
      }

      newBook.addBookToLibrary();
      displayLibrary();

      this.form.remove();
      event.preventDefault();
    });
  }
}

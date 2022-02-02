// Book Class: 
class Book {
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isREad = isRead;
    }
}

// UI Class: Handle all the UI tasks
class uiHandler {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'The Hobbit',
                author: 'J.R.R Tolkien',
                pages: '400',
                isRead = 'false'
            }, 
            {
                title: 'Harry Potter and the Philosopher\'s Stone',
                author: 'J.K Rowling',
                pages: '600',
                isRead = 'true'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => {uiHandler.addBookToList()})
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>${book.isRead}</td>`    }
}

// Storage Class: handle Local and eventually database storage

// Event: Display Books

// Event: Add a Book

// Event Remove a Book
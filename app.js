// Book Class: 
class Book {
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

// UI Class: Handle all the UI tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'The Hobbit',
                author: 'J.R.R Tolkien',
                pages: '400',
                isRead: 'false'
            }, 
            {
                title: 'Harry Potter and the Philosopher\'s Stone',
                author: 'J.K Rowling',
                pages: '600',
                isRead: 'true'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>${book.isRead}</td>
                        <td> <a href="#" class="btn btn-danger btn-sm delete-btn">X</a></td>
                        `;

        list.appendChild(row);
    }

    static resetForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#isRead').value = 'false';
        
    }

}

// Storage Class: handle Local and eventually database storage

// EVENT: DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// EVENT: ADD A NEW BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // prevent actual submit

    e.preventDefault(); 

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#isRead').checked;

    // INSTANTIATE THE NEW BOOK

    const book = new Book(title, author, pages, isRead)

    //console.log(book);

    // ADD BOOK TO UI  

    UI.addBookToList(book);

    UI.resetForm();

    // add to local storage
    
})

// Event Remove a Book




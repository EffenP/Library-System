// Book Class: 
class Book {
    constructor(title, author, pages, isRead){
        this.id = getBookId();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

// UI Class: Handle all the UI tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>${book.isRead}</td>
                        <td>${book.id}</td>
                        <td> <a href="#" class="btn btn-danger btn-sm delete-btn">X</a></td>
                        `;

        list.appendChild(row);
    }

    static deleteBook(element) {
        if(element.classList.contains('delete-btn')) {
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static resetForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#isRead').value = 'false';
        
    }

}

// Storage Class: handle Local and eventually database storage
class Store {
    static getBooks() {
        let books; 
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(id) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
           if(book.id === parseInt(id)) {
               books.splice(index, 1);
           }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}




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

    // VALIDATION

    if(title === '' || author === '' || pages === '') {
        UI.showAlert('Please Fill in all Fields', 'danger');
    } else {
        // INSTANTIATE THE NEW BOOK

        const book = new Book(title, author, pages, isRead)
        //console.log(book);
        // ADD BOOK TO UI  
        UI.addBookToList(book);


        //Store book locally
        Store.addBook(book);

        // SHOW SUCCESSFUL ALERT
        UI.showAlert('Book Successfully Added', 'success');

        // RESET THE FORM FIELDS
        UI.resetForm();       
    }
});

// Event Remove a Book
document.querySelector('#book-list').addEventListener('click' , (e) => {
    // Remove book from the UI
    UI.deleteBook(e.target);
    
    //Remove Book from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    // SHOW SUCCESSFUL ALERT
    UI.showAlert('Book Deleted', 'success');
})



function getBookId() {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(16).toString().replace(".", ""))

}
let myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K Rowling"
  }
];

$newButton = document.querySelector('.new');
$table = document.querySelector('.table');
$tbody = $table.querySelector('tbody');

$form = document.querySelector('.form');
$titleInput = $form.querySelector('#title');
$authorInput = $form.querySelector('#author');
$submitButton = $form.querySelector('#submit');

function Book(title, author) {
  // the constructor...
  this.title = title;
  this.author = author;
}

const addBookToLibrary = () => {
  // do stuff here
  let title = $titleInput.value;
  let author = $authorInput.value;
  let newBook = new Book(title, author);
  myLibrary.push(newBook);
  console.log('something');
}
 
const populateStorage = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

const getStorage = () => {
  myLibrary = JSON.parse(localStorage.getItem('library'));
}

document.addEventListener('DOMContentLoaded', () => {
  //$newButton.addEventListener('click', toggleHiddenElements);

  $submitButton.addEventListener('click', () => {
    // if validation
    addBookToLibrary();
    // some more stuff
  })
})


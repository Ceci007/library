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
$returnButon = $form.querySelector('#return');

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

const toggleHiddenElements = () => {
  $form.classList.toggle('hidden');
  $table.classList.toggle('hidden');
  $newButton.classList.toggle('hidden');
}

const validateForm = () => {
  if ($titleInput.value == "" && document.querySelector('#titleError') == null);
  if ($authorInput.value == "" && document.querySelector('#authorError') == null);

  if ($titleInput.value == "" || $authorInput.value == "") return false;
  else return true;
}

const clearForm = () => {
  $titleInput.value = null;
  $authorInput.value = null;
}

const updateTable = () => {
  $tbody.textContent = "";
  myLibrary.forEach( (book, index) => {
     let $row = document.createElement('tr');
     Object.keys(book).forEach( prop => {
      let $newTd = document.createElement('td');
      $newTd.textContent = book[prop];
      $row.appendChild($newTd);
     })
     $tbody.appendChild($row);
  })
  populateStorage();
}

const createEditTd = () => {

}

document.addEventListener('DOMContentLoaded', () => {
  $newButton.addEventListener('click', toggleHiddenElements);

  $submitButton.addEventListener('click', () => {
    // if validation
    addBookToLibrary();
    toggleHiddenElements();
    updateTable();
    // some more stuff
  })

  $returnButon.addEventListener('click', () => {
    toggleHiddenElements();
    //
  });

  if(!localStorage.getItem('library')) {
    populateStorage();
  } else {
    getStorage();
  }
})


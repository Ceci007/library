let myLibrary = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: 200,
    read: false,
  },
  {
    title: 'Game of thrones',
    author: 'George R.R. Martin',
    pages: 500,
    read: true,
  },
  {
    title: 'Emma',
    author: 'Jane Austen',
    pages: 150,
    read: false,
  },
];

const $newButton = document.querySelector('.new');
const $table = document.querySelector('.table');
const $tbody = $table.querySelector('tbody');

const $form = document.querySelector('.form');
const $titleInput = $form.querySelector('#title');
const $authorInput = $form.querySelector('#author');
const $pagesInput = $form.querySelector('#pages');
const $submitButton = $form.querySelector('#submit');
const $returnButon = $form.querySelector('#return');

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const getReadValue = () => {
  if ($form.querySelector('input[name="read"]:checked').value === 'yes') {
    return true;
  }
  return false;
};

const addBookToLibrary = () => {
  // do stuff here
  const title = $titleInput.value;
  const author = $authorInput.value;
  const pages = $pagesInput.value;
  const read = getReadValue();

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
};

const populateStorage = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary));
};

const getStorage = () => {
  myLibrary = JSON.parse(localStorage.getItem('library'));
};

const toggleHiddenElements = () => {
  $form.classList.toggle('hidden');
  $table.classList.toggle('hidden');
  $newButton.classList.toggle('hidden');
};

const removeError = el => {
  if (el.target.value !== '') {
    el.target.removeEventListener('input', removeError);
    el.target.classList.remove('errorInput');
    document.querySelector(`#${el.target.id}Error`).remove();
  }
};

const addError = el => {
  const $spanError = document.createElement('span');
  $spanError.textContent = `Please enter a ${el.id}`;
  $spanError.id = `${el.id}Error`;
  $spanError.classList.add('errorText');
  $form.insertBefore($spanError, el);

  el.classList.add('errorInput');
  el.addEventListener('input', removeError);
};

const validateForm = () => {
  if ($titleInput.value === '' && document.querySelector('#titleError') === null) addError($titleInput);
  if ($authorInput.value === '' && document.querySelector('#authorError') === null) addError($authorInput);
  if ($pagesInput.value === '' && document.querySelector('#pagesError') === null) addError($pagesInput);

  if ($titleInput.value === '' || $pagesInput.value === '' || $authorInput.value === '') return false;
  return true;
};

const clearForm = () => {
  $titleInput.value = '';
  $authorInput.value = '';
  $pagesInput.value = '';
};

const createReadStatusTd = book => {
  const $readStatusTd = document.createElement('td');
  const $readStatusButton = document.createElement('button');
  $readStatusButton.classList.add('btn-change');
  $readStatusButton.textContent = 'Change Status';
  $readStatusButton.addEventListener('click', () => {
    book.read = !book.read;
    updateTable(); // eslint-disable-line
  });
  $readStatusTd.appendChild($readStatusButton);
  return $readStatusTd;
};

const updateTable = () => {
  $tbody.textContent = '';

  myLibrary.forEach((book, index) => {
    const $row = document.createElement('tr');
    Object.keys(book).forEach(prop => {
      const $newTd = document.createElement('td');
      $newTd.textContent = book[prop];
      if (prop === 'read') $newTd.textContent = book[prop] ? 'read' : 'not read';
      $row.appendChild($newTd);
    });
    $row.appendChild(createReadStatusTd(book));
    $row.appendChild(createDeleteTd(index)); // eslint-disable-line
    $tbody.appendChild($row);
  });

  populateStorage();
};


const removeFromLibrary = index => { // eslint-disable-line
  myLibrary.splice(index, 1);
  $submitButton.removeEventListener('click', removeFromLibrary);
  updateTable();
};

const createDeleteTd = index => {
  const $deleteTd = document.createElement('td');
  const $deleteButton = document.createElement('button');
  $deleteButton.textContent = 'Delete';
  $deleteButton.classList.add('btn-danger');

  $deleteButton.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    updateTable();
  });
  $deleteTd.appendChild($deleteButton);
  return $deleteTd;
};

document.addEventListener('DOMContentLoaded', () => {
  $newButton.addEventListener('click', toggleHiddenElements);

  $submitButton.addEventListener('click', () => {
    if (validateForm() === false) return;
    addBookToLibrary();
    updateTable();
    toggleHiddenElements();
    clearForm();
  });

  $returnButon.addEventListener('click', () => {
    toggleHiddenElements();
    clearForm();
  });

  if (!localStorage.getItem('library')) {
    populateStorage();
  } else {
    getStorage();
  }
  updateTable();
});

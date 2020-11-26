let myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K Rowling",
    pages: 100,
    read: false
  }
];

$newButton = document.querySelector('.new');
$table = document.querySelector('.table');
$tbody = $table.querySelector('tbody');

$form = document.querySelector('.form');
$titleInput = $form.querySelector('#title');
$authorInput = $form.querySelector('#author');
$pagesInput = $form.querySelector('#pages');
$submitButton = $form.querySelector('#submit');
$returnButon = $form.querySelector('#return');

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addBookToLibrary = () => {
  // do stuff here
  let title = $titleInput.value;
  let author = $authorInput.value;
  let pages = $pagesInput.value;
  let read = getReadValue();

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log('something');
}
 
const populateStorage = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

const getStorage = () => {
  myLibrary = JSON.parse(localStorage.getItem('library'));
}

const getReadValue = () => {
  if ($form.querySelector('input[name="read"]:checked').value == "yes") {
    return true;
  } else {
    return false;
  }
}

const toggleHiddenElements = () => {
  $form.classList.toggle('hidden');
  $table.classList.toggle('hidden');
  $newButton.classList.toggle('hidden');
}

const validateForm = () => {
  if ($titleInput.value == "" && document.querySelector('#titleError') == null);
  if ($authorInput.value == "" && document.querySelector('#authorError') == null);
  if($pagesInput.value == "" && document.querySelector('#pagesError') == null);

  if ($titleInput.value == "" || $pagesInput.value == "" || $authorInput.value == "") return false;
  else return true;
}

const clearForm = () => {
  $titleInput.value = '';
  $authorInput.value = '';
  $pagesInput = '';
}

const createReadStatusTd = book => {
  let $readStatusTd = document.createElement('td');
  let $readStatusButton = document.createElement('button');
  $readStatusButton.textContent = 'Change Status';
  $readStatusButton.addEventListener('click', () => { book.read = !book.read;
    updateTable();
  })
  $readStatusTd.appendChild($readStatusButton);
  return $readStatusTd;
}

const removeFromLibrary = index => {
  myLibrary.splice(index, 1);
  $submitButton.removeEventListener('click', removeFromLibrary);
  updateTable();
}

const createDeleteTd = index => {
  let $deleteTd = document.createElement('td');
  let $deleteButton = document.createElement('button');
  $deleteButton.textContent = 'Delete';

  $deleteButton.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    updateTable();
  });
  $deleteTd.appendChild($deleteButton);
  return $deleteTd;
}

const updateTable = () => {
  $tbody.textContent = "";

  myLibrary.forEach( (book, index) => {
     let $row = document.createElement('tr');
     Object.keys(book).forEach( prop => {
      let $newTd = document.createElement('td');
      $newTd.textContent = book[prop];
      if (prop == 'read') $newTd.textContent = book[prop] ? 'read' : 'not read';
      $row.appendChild($newTd);
     });
     $row.appendChild(createReadStatusTd(book));
     $row.appendChild(createDeleteTd(index));
     $tbody.appendChild($row);
  });

  populateStorage();
}


document.addEventListener('DOMContentLoaded', () => {
  $newButton.addEventListener('click', toggleHiddenElements);

  $submitButton.addEventListener('click', () => {
    // if validation
    addBookToLibrary();
    updateTable();
    toggleHiddenElements();
    
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
  updateTable();
})


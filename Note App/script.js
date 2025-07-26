const paper = document.querySelector('.note');
const buttons = document.querySelectorAll('button');
const listNotes = document.querySelector('.list-notes');
const noteTitle = document.getElementById('title');
const textAreaContent = document.getElementById('content');
const createContent = document.querySelectorAll('.create-note');

let currentEditingNote = null;

function operation(button) {
  let value = button.innerText.toLowerCase();

  if (value === 'create') {
    createContent.forEach(x => x.style.display = 'block');
    noteTitle.value = '';
    textAreaContent.value = '';
    currentEditingNote = null;
  }

  if (value === 'save') {
    if (textAreaContent.value === '') {
      alert('Create a note');
      return;
    }

    if (currentEditingNote) {
      // Edit existing note
      currentEditingNote.titleEl.innerText = noteTitle.value;
      currentEditingNote.contentEl.innerText = textAreaContent.value;
      currentEditingNote = null;
    } else {
      // Create new note
      let saveNote = document.createElement('div');
      saveNote.classList.add('saved-note');

      let savedTitle = document.createElement('h3');
      savedTitle.classList.add('note-title');
      savedTitle.innerText = noteTitle.value;

      let savedContent = document.createElement('p');
      savedContent.innerText = textAreaContent.value;

      let openButton = document.createElement('button');
      openButton.classList.add('open');
      openButton.innerText = 'open';

      // Open logic to edit
      openButton.addEventListener('click', () => {
        noteTitle.value = savedTitle.innerText;
        textAreaContent.value = savedContent.innerText;
        createContent.forEach(x => x.style.display = 'block');
        currentEditingNote = {
          titleEl: savedTitle,
          contentEl: savedContent
        };
      });

      saveNote.appendChild(savedTitle);
      saveNote.appendChild(savedContent);
      saveNote.appendChild(openButton);
      listNotes.appendChild(saveNote);
    }

    // Reset
    noteTitle.value = '';
    textAreaContent.value = '';
    createContent.forEach(x => x.style.display = 'none');
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => operation(button));
});

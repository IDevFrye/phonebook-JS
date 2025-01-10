import {addContactPage} from './createMarkup.js';
import {removeStorage, saveSortState, setStorage} from './serviceStorage.js';

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };
  btnAdd.addEventListener('click', () => {
    openModal();
  });
  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    };
  });

  return {
    closeModal,
  };
};

export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    setStorage('contacts', newContact);
    form.reset();
    closeModal();
  });
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const contact = target.closest('.contact');
      contact.remove();
      removeStorage(contact.phoneLink.textContent);
    };
  });
};

export const sortTable = (tbody, col, isAsc) => {
  col = (col === 'name') ? 0 : 1;
  const rows = Array.from(tbody.children);

  rows.sort((a, b) => {
    const aValue = [...a.children].slice(1)[col].textContent;
    const bValue = [...b.children].slice(1)[col].textContent;

    return isAsc ? aValue.localeCompare(bValue) :
      bValue.localeCompare(aValue);
  });

  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));
};

export const sortControl = (thead, list) => {
  thead.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('sortable')) {
      const column = target.dataset.sort;
      let isAscending = target.classList.contains('asc');

      document.querySelectorAll('.sortable').forEach(th => {
        if (th !== target) {
          th.classList.remove('asc', 'desc');
        }
      });

      if (isAscending) {
        target.classList.remove('asc');
        target.classList.add('desc');
        saveSortState(column, 'desc');
      } else {
        target.classList.remove('desc');
        target.classList.add('asc');
        saveSortState(column, 'asc');
      };

      isAscending = target.classList.contains('asc');

      sortTable(list, column, isAscending);
    }
  });
};

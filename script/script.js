import render from './modules/render.js';
import {getStorage, getSortState} from './modules/serviceStorage.js';
import * as control from './modules/controllers.js';

const {renderPhonebook, renderContacts, hoverRow} = render;

export const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);

  const {
    list,
    thead,
    logo,
    btnAdd,
    btnDel,
    formOverlay,
    form,
  } = renderPhonebook(app, title);

  const data = getStorage('contacts');
  const allRow = renderContacts(list, data);

  const sortState = getSortState();
  console.log('sortState: ', sortState);
  if (sortState) {
    control.sortTable(list, sortState.field, sortState.order === 'asc');
    const columnHeader = document.querySelector(
      `[data-sort="${sortState.field}"]`);
    if (columnHeader) {
      columnHeader.classList.add(sortState.order);
    }
  };

  const {closeModal} = control.modalControl(btnAdd, formOverlay);
  hoverRow(allRow, logo);
  control.deleteControl(btnDel, list);
  control.formControl(form, list, closeModal);
  control.sortControl(thead, list);
};

// window.phoneBookInit = init;


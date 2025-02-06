import render from './script/render.js';
import {getStorage, getSortState} from './script/serviceStorage.js';
import * as control from './script/controllers.js';

// import 'https://kit.fontawesome.com/86d1196dac.js';
import './index.html';
import './scss/index.scss';
// import 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css';


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

document.addEventListener('DOMContentLoaded', () => {
  init('#app', 'Andrey');
});

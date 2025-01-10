import * as markup from './createMarkup.js';

const renderPhonebook = (app, title) => {
  const header = markup.createHeader();
  const logo = markup.createLogo(title);
  const main = markup.createMain();
  const buttonGroup = markup.createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = markup.createTable();
  const {overlay, form} = markup.createForm();
  const footer = markup.createFooter();
  const signature = markup.createSignature(title);

  header.headerContainer.append(logo);
  footer.footerContainer.append(signature);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    thead: table.thead,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

const renderContacts = (elem, data) => {
  const allRow = data.map(markup.createRow);
  elem.append(...allRow);

  return allRow;
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

export default {
  renderPhonebook,
  renderContacts,
  hoverRow,
};

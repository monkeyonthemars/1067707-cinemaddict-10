export const createMainMenuTemplate = (menu) => {

  const {siteMenu, sortMenu} = menu;

  let siteMenuList = ``;
  for (let item of siteMenu) {
    siteMenuList = siteMenuList +
    `<a href="#" class="main-navigation__item">${item} <span class="main-navigation__item-count"></span></a>`;
  }

  let sortMenuList = ``;
  for (let item of sortMenu) {
    sortMenuList = sortMenuList +
    `<li><a href="#" class="sort__button">${item}</a></li>`;
  }

  return `<nav class="main-navigation">
      ${siteMenuList}
    </nav>
    <ul class="sort">
      ${sortMenuList}
    </ul>`;
};

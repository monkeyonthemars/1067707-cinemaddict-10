const generateSiteMenuList = (siteMenu) => {
  return siteMenu
    .map((item) => {
      return (`<a href="#" class="main-navigation__item">${item} <span class="main-navigation__item-count"></span></a>`
      );
    }).join(`\n`);
};

const generateSortMenuList = (sortMenu) => {
  return sortMenu
    .map((item) => {
      return (`<li><a href="#" class="sort__button">${item}</a></li>`
      );
    }).join(`\n`);
};

export const createMainMenuTemplate = (menu) => {

  const {siteMenu, sortMenu} = menu;
  const siteMenuList = generateSiteMenuList(siteMenu);
  const sortMenuList = generateSortMenuList(sortMenu);

  return `<nav class="main-navigation">
      ${siteMenuList}
    </nav>
    <ul class="sort">
      ${sortMenuList}
    </ul>`;
};

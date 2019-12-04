const SITEMENU = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`
];

const SORTMENU = [
  `Sort by default`,
  `Sort by date`,
  `Sort by rating`
];

const generateSiteMenu = () => {
  return SITEMENU;
};

const generateSortMenu = () => {
  return SORTMENU;
};

export {generateSiteMenu, generateSortMenu};

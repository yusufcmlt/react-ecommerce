import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );

export const selectItemDetail = (collectionUrlParam, itemUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections[collectionUrlParam].items.find(
      (item) => item.id === Number(itemUrlParam)
    )
  );

export const selectSearchResultItems = (searchQuery) =>
  createSelector([selectCollectionsForPreview], (collections) => {
    const returnArray = collections.map((collection) => {
      return collection.items.filter((item) => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return item;
        } else if (
          collection.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return collection;
        }
      });
    });
    return [].concat(...returnArray);
  });

export const selectItemCategory = (itemName) =>
  createSelector(
    [selectCollectionsForPreview],
    (collections) =>
      collections.find((collection) =>
        collection.items.find((findName) => findName.name === itemName)
      ).routeName
  );

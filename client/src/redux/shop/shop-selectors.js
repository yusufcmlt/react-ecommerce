import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectItemDetail = (collectionUrlParam, itemUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections[collectionUrlParam].items.find((item) => {
      return item.id == itemUrlParam;
    })
  );

export const selectSearchResultItems = (searchQuery) =>
  createSelector([selectCollectionsForPreview], (collections) => {
    const returnArray = collections.map((collection) => {
      //eslint-disable-next-line
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

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
export const selectCollectionKeys = createSelector(
  [selectCollections],
  (collections) =>
    collections
      ? Object.keys(collections).map((collection) => ({
          collectionName: collection,
          collectionKey: collections[collection].id,
        }))
      : []
);
export const selectCollectionCategoryCount = createSelector(
  [selectCollections],
  (collections) => (collections ? Object.keys(collections).length : 0)
);

export const selectCollectionItemsCount = createSelector(
  [selectCollections],
  (collections) =>
    collections
      ? Object.keys(collections).reduce(
          (totalItem, collection) =>
            totalItem + collections[collection].items.length,
          0
        )
      : 0
);

export const selectAdminItems = createSelector(
  [selectCollections],
  (collections) => {
    return collections
      ? Object.keys(collections).reduce((allItems, collection) => {
          return [
            ...allItems,
            ...collections[collection].items.map((item) => ({
              ...item,
              price: Number(item.price),
              category: { name: collection, dbid: collections[collection].id },
            })),
          ];
        }, [])
      : [];
  }
);

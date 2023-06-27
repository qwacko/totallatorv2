migrate((db) => {
  const collection = new Collection({
    "id": "3zq53mtrdarzvsq",
    "created": "2023-06-24 04:45:02.513Z",
    "updated": "2023-06-24 04:45:02.513Z",
    "name": "postsView",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "select id from posts"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3zq53mtrdarzvsq");

  return dao.deleteCollection(collection);
})

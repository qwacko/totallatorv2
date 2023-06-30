migrate((db) => {
  const collection = new Collection({
    "id": "cvpcr40d7a9qoc8",
    "created": "2023-06-30 22:09:37.832Z",
    "updated": "2023-06-30 22:09:37.832Z",
    "name": "budgets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "g6gxrq5t",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cvpcr40d7a9qoc8");

  return dao.deleteCollection(collection);
})

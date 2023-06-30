migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("95v0eojj2zegeo9");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "95v0eojj2zegeo9",
    "created": "2023-06-24 04:38:30.887Z",
    "updated": "2023-06-30 09:27:32.356Z",
    "name": "accountGrouping",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xkfmqp9o",
        "name": "title",
        "type": "text",
        "required": false,
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
})

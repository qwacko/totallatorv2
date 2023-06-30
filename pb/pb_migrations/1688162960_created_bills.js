migrate((db) => {
  const collection = new Collection({
    "id": "i1comkpibz1mzs6",
    "created": "2023-06-30 22:09:20.850Z",
    "updated": "2023-06-30 22:09:20.850Z",
    "name": "bills",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qfmxlszs",
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
  const collection = dao.findCollectionByNameOrId("i1comkpibz1mzs6");

  return dao.deleteCollection(collection);
})

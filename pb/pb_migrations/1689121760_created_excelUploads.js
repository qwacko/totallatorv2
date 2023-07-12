migrate((db) => {
  const collection = new Collection({
    "id": "qng06wsbjhfodyn",
    "created": "2023-07-12 00:29:20.800Z",
    "updated": "2023-07-12 00:29:20.800Z",
    "name": "excelUploads",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jk9kkead",
        "name": "excelFile",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "ii7gyetg",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.role ?= \"admin\"",
    "updateRule": "@request.auth.role ?= \"admin\"",
    "deleteRule": "@request.auth.role ?= \"admin\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qng06wsbjhfodyn");

  return dao.deleteCollection(collection);
})

migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "0lmeujqj9kl5xgn",
    "created": "2023-06-24 08:58:08.154Z",
    "updated": "2023-06-30 09:37:04.700Z",
    "name": "journalEntry",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jixqdhlh",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "b1vxvzql",
        "name": "amount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "msbnwys2",
        "name": "complete",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ub7d4l8u",
        "name": "dataChecked",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "2bqeqhcd",
        "name": "reconciled",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "pshuazvc",
        "name": "date",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "jexcvxjl",
        "name": "account",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "1awv4exoc7vkbjk",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "title"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.role ?= \"admin\"",
    "viewRule": "@request.auth.role ?= \"admin\"",
    "createRule": "@request.auth.role ?= \"admin\"",
    "updateRule": "@request.auth.role ?= \"admin\"",
    "deleteRule": "@request.auth.role ?= \"admin\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

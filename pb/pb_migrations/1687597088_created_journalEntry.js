migrate((db) => {
  const collection = new Collection({
    "id": "0lmeujqj9kl5xgn",
    "created": "2023-06-24 08:58:08.154Z",
    "updated": "2023-06-24 08:58:08.154Z",
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
        "id": "bjylfg6q",
        "name": "accountGrouping",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "95v0eojj2zegeo9",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn");

  return dao.deleteCollection(collection);
})

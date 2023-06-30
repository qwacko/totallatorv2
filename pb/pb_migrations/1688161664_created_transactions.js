migrate((db) => {
  const collection = new Collection({
    "id": "cgelhyf80w9690p",
    "created": "2023-06-30 21:47:44.591Z",
    "updated": "2023-06-30 21:47:44.591Z",
    "name": "transactions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7ekzkju9",
        "name": "fromAccount",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "1awv4exoc7vkbjk",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "8ma9a6dq",
        "name": "toAccount",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "1awv4exoc7vkbjk",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "43xg2mwb",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ksp1zmud",
        "name": "amount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p");

  return dao.deleteCollection(collection);
})

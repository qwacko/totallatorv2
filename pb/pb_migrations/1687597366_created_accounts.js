migrate((db) => {
  const collection = new Collection({
    "id": "1awv4exoc7vkbjk",
    "created": "2023-06-24 09:02:46.487Z",
    "updated": "2023-06-24 09:02:46.487Z",
    "name": "accounts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b17qfwg6",
        "name": "title",
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
        "id": "h6du7ct3",
        "name": "accountGrouping",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "95v0eojj2zegeo9",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "title"
          ]
        }
      },
      {
        "system": false,
        "id": "nu2bpiwx",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "asset",
            "liability",
            "income",
            "expense"
          ]
        }
      },
      {
        "system": false,
        "id": "fcconsun",
        "name": "isCash",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "nxhasqm4",
        "name": "isNetWorth",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk");

  return dao.deleteCollection(collection);
})

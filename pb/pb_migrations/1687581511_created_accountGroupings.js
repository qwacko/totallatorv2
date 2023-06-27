migrate((db) => {
  const collection = new Collection({
    "id": "95v0eojj2zegeo9",
    "created": "2023-06-24 04:38:30.887Z",
    "updated": "2023-06-24 04:38:30.887Z",
    "name": "accountGroupings",
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
      },
      {
        "system": false,
        "id": "0vqnvhmn",
        "name": "admins",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": 1,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "t8zvuiam",
        "name": "viewers",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": 1,
          "maxSelect": null,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("95v0eojj2zegeo9");

  return dao.deleteCollection(collection);
})

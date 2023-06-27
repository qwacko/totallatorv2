migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3zq53mtrdarzvsq");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3zq53mtrdarzvsq",
    "created": "2023-06-24 04:45:02.513Z",
    "updated": "2023-06-24 04:45:43.287Z",
    "name": "postsView",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "itmmirru",
        "name": "slug",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": "[0-9a-z-]+"
        }
      },
      {
        "system": false,
        "id": "p4ahsysc",
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
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "select id, slug, title from posts"
    }
  });

  return Dao(db).saveCollection(collection);
})

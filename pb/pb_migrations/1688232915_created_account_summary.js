migrate((db) => {
  const collection = new Collection({
    "id": "x1zk7adz9dx9y0s",
    "created": "2023-07-01 17:35:15.521Z",
    "updated": "2023-07-01 17:35:15.521Z",
    "name": "account_summary",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lwelzujp",
        "name": "account_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "1awv4exoc7vkbjk",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "b17qfwg6",
        "name": "account_title",
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
        "id": "nu2bpiwx",
        "name": "account_type",
        "type": "select",
        "required": true,
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type  as account_type FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s");

  return dao.deleteCollection(collection);
})

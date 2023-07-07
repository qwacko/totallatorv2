migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "x1zk7adz9dx9y0s",
    "created": "2023-07-01 17:35:15.521Z",
    "updated": "2023-07-01 17:47:00.045Z",
    "name": "account_summary",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rgyyexyk",
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
      },
      {
        "system": false,
        "id": "3w0vhqrg",
        "name": "month",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "eb3rywdv",
        "name": "num_from_transactions",
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
        "id": "awsvfweo",
        "name": "num_to_transactions",
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
        "id": "cflvhr2w",
        "name": "sum_from_transactions",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "btsav8fo",
        "name": "sum_to_transactions",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "mgf5nuf2",
        "name": "running_total",
        "type": "json",
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
    "options": {
      "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions, count(case when t.toAccount = a.id then 1 end) as num_to_transactions, COALESCE(SUM(CASE WHEN t.fromAccount = a.id then -t.amount else 0 end),0) as sum_from_transactions, COALESCE(SUM(CASE WHEN t.toAccount = a.id then t.amount else 0 end),0) as sum_to_transactions,\n\n  (SELECT COALESCE(SUM(CASE WHEN t2.fromAccount = a.id then -t2.amount when t2.toAccount = a.id then t2.amount else 0 end), 0) from transactions t2 where STRFTIME('%Y-%m', t2.DATE) <= STRFTIME('%Y-%m', t.date)) as running_total\n  \n  FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
    }
  });

  return Dao(db).saveCollection(collection);
})

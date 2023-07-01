migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions, count(case when t.toAccount = a.id then 1 end) as num_to_transactions, COALESCE(SUM(CASE WHEN t.fromAccount = a.id then t.amount else 0 end),0) as sum_from_transactions FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

  // remove
  collection.schema.removeField("3poksnbb")

  // remove
  collection.schema.removeField("bzmt2ace")

  // remove
  collection.schema.removeField("qzfu7ate")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eukb3zti",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wsaivenl",
    "name": "month",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5qrwt5rl",
    "name": "num_from_transactions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dery2xyp",
    "name": "num_to_transactions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "92n3s201",
    "name": "sum_from_transactions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3poksnbb",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bzmt2ace",
    "name": "month",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qzfu7ate",
    "name": "num_from_transactions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("eukb3zti")

  // remove
  collection.schema.removeField("wsaivenl")

  // remove
  collection.schema.removeField("5qrwt5rl")

  // remove
  collection.schema.removeField("dery2xyp")

  // remove
  collection.schema.removeField("92n3s201")

  return dao.saveCollection(collection)
})

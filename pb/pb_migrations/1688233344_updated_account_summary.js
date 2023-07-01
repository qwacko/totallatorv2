migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions, count(case when t.toAccount = a.id then 1 end) as num_to_transactions, COALESCE(SUM(CASE WHEN t.fromAccount = a.id then t.amount else 0 end),0) as sum_to_transactions, COALESCE(SUM(CASE WHEN t.toAccount = a.id then -t.amount else 0 end),0) as sum_from_transactions FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z23flgrd",
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
    "id": "xsl7crne",
    "name": "month",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kqpxqvnr",
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
    "id": "sqs1ikah",
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
    "id": "ieiemsmt",
    "name": "sum_to_transactions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "62u5ujcj",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions, count(case when t.toAccount = a.id then 1 end) as num_to_transactions, COALESCE(SUM(CASE WHEN t.fromAccount = a.id then t.amount else 0 end),0) as sum_from_transactions FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

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

  // remove
  collection.schema.removeField("z23flgrd")

  // remove
  collection.schema.removeField("xsl7crne")

  // remove
  collection.schema.removeField("kqpxqvnr")

  // remove
  collection.schema.removeField("sqs1ikah")

  // remove
  collection.schema.removeField("ieiemsmt")

  // remove
  collection.schema.removeField("62u5ujcj")

  return dao.saveCollection(collection)
})

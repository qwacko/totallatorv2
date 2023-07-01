migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

  // remove
  collection.schema.removeField("xh4tori6")

  // remove
  collection.schema.removeField("aqpahbj9")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xh4tori6",
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
    "id": "aqpahbj9",
    "name": "month",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("3poksnbb")

  // remove
  collection.schema.removeField("bzmt2ace")

  // remove
  collection.schema.removeField("qzfu7ate")

  return dao.saveCollection(collection)
})

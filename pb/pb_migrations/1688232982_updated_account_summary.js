migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

  // remove
  collection.schema.removeField("lwelzujp")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type  as account_type FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type;"
  }

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("xh4tori6")

  // remove
  collection.schema.removeField("aqpahbj9")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nu2bpiwx",
    "name": "type",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})

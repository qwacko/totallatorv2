migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  // remove
  collection.schema.removeField("h6du7ct3")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn")

  // remove
  collection.schema.removeField("bjylfg6q")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bjylfg6q",
    "name": "accountGrouping",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "95v0eojj2zegeo9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

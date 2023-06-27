migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jexcvxjl",
    "name": "account",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "1awv4exoc7vkbjk",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn")

  // remove
  collection.schema.removeField("jexcvxjl")

  return dao.saveCollection(collection)
})

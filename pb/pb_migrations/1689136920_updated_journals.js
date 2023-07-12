migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ilvozdxr",
    "name": "dateText",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 10,
      "max": 10,
      "pattern": "^\\d{4}-\\d{2}-\\d{2}"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // remove
  collection.schema.removeField("ilvozdxr")

  return dao.saveCollection(collection)
})

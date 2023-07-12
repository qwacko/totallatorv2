migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
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
      "pattern": "^(?:19|20)\\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
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
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "viglru6l",
    "name": "direction",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "from",
        "to"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "viglru6l",
    "name": "direction",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "from",
        "to"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "btex67cf",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "btex67cf",
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
})

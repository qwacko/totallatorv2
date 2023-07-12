migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  // remove
  collection.schema.removeField("845ihqjh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "btex67cf",
    "name": "date",
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
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "845ihqjh",
    "name": "date",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("btex67cf")

  return dao.saveCollection(collection)
})

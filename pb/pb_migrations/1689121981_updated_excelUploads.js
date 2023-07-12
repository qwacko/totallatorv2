migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qng06wsbjhfodyn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jk9kkead",
    "name": "excelFile",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 20242880,
      "mimeTypes": [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qng06wsbjhfodyn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jk9kkead",
    "name": "excelFile",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})

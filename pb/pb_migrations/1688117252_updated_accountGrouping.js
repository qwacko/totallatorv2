migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95v0eojj2zegeo9")

  // remove
  collection.schema.removeField("0vqnvhmn")

  // remove
  collection.schema.removeField("t8zvuiam")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95v0eojj2zegeo9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0vqnvhmn",
    "name": "admins",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t8zvuiam",
    "name": "viewers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

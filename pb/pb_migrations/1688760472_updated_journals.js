migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "br1xr5mg",
    "name": "transaction",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "cgelhyf80w9690p",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "br1xr5mg",
    "name": "transaction",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "cgelhyf80w9690p",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

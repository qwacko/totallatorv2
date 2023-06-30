migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0t0712dluvpzq23")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "miya5woa",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzfwbix8",
    "name": "group",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0t0712dluvpzq23")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "miya5woa",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzfwbix8",
    "name": "group",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

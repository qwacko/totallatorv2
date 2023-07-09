migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1wanmxuh",
    "name": "account",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "1awv4exoc7vkbjk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wjkqwseg",
    "name": "date",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1wanmxuh",
    "name": "account",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1awv4exoc7vkbjk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wjkqwseg",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})

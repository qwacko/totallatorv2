migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vhasy1xd",
    "name": "otherAccount",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f1spun39",
    "name": "bill",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "i1comkpibz1mzs6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5vztlayd",
    "name": "budget",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "cvpcr40d7a9qoc8",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lrcrtzoj",
    "name": "category",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "mvgyjd58pr16gr7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i0ayfl6t",
    "name": "tag",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0t0712dluvpzq23",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rpbaya14",
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

  // remove
  collection.schema.removeField("vhasy1xd")

  // remove
  collection.schema.removeField("f1spun39")

  // remove
  collection.schema.removeField("5vztlayd")

  // remove
  collection.schema.removeField("lrcrtzoj")

  // remove
  collection.schema.removeField("i0ayfl6t")

  // remove
  collection.schema.removeField("rpbaya14")

  return dao.saveCollection(collection)
})

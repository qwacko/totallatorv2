migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // remove
  collection.schema.removeField("uph6kody")

  // remove
  collection.schema.removeField("xuq1c27o")

  // remove
  collection.schema.removeField("owj27xvf")

  // remove
  collection.schema.removeField("uxet8m8k")

  // remove
  collection.schema.removeField("uymqbtis")

  // remove
  collection.schema.removeField("wjkqwseg")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uph6kody",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xuq1c27o",
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
    "id": "owj27xvf",
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
    "id": "uxet8m8k",
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
    "id": "uymqbtis",
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

  // remove
  collection.schema.removeField("viglru6l")

  return dao.saveCollection(collection)
})

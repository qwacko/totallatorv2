migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8jetc6gq",
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
    "id": "eahueuwd",
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
    "id": "pe9izgro",
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
    "id": "oxqu2jye",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7ekzkju9",
    "name": "fromAccount",
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
    "id": "8ma9a6dq",
    "name": "toAccount",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  // remove
  collection.schema.removeField("8jetc6gq")

  // remove
  collection.schema.removeField("eahueuwd")

  // remove
  collection.schema.removeField("pe9izgro")

  // remove
  collection.schema.removeField("oxqu2jye")

  // remove
  collection.schema.removeField("845ihqjh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7ekzkju9",
    "name": "fromAccount",
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
    "id": "8ma9a6dq",
    "name": "toAccount",
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

  return dao.saveCollection(collection)
})

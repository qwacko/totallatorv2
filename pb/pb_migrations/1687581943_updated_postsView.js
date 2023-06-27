migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3zq53mtrdarzvsq")

  collection.listRule = ""
  collection.options = {
    "query": "select id, slug, title from posts"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "itmmirru",
    "name": "slug",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": "[0-9a-z-]+"
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p4ahsysc",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3zq53mtrdarzvsq")

  collection.listRule = null
  collection.options = {
    "query": "select id from posts"
  }

  // remove
  collection.schema.removeField("itmmirru")

  // remove
  collection.schema.removeField("p4ahsysc")

  return dao.saveCollection(collection)
})

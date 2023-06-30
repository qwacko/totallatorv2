migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0t0712dluvpzq23")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.role ?= \"admin\""
  collection.updateRule = "@request.auth.role ?= \"admin\""
  collection.deleteRule = "@request.auth.role ?= \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0t0712dluvpzq23")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

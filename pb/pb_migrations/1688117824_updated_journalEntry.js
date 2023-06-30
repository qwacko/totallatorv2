migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn")

  collection.listRule = "@request.auth.role ?= \"admin\""
  collection.viewRule = "@request.auth.role ?= \"admin\""
  collection.createRule = "@request.auth.role ?= \"admin\""
  collection.updateRule = "@request.auth.role ?= \"admin\""
  collection.deleteRule = "@request.auth.role ?= \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lmeujqj9kl5xgn")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

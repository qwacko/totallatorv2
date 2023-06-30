migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1comkpibz1mzs6")

  collection.createRule = "@request.auth.role ?= \"admin\""
  collection.updateRule = "@request.auth.role ?= \"admin\""
  collection.deleteRule = "@request.auth.role ?= \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1comkpibz1mzs6")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

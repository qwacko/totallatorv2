migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  collection.deleteRule = "@request.auth.role ?= \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgelhyf80w9690p")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})

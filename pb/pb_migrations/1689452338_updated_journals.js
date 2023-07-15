migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  collection.deleteRule = "@request.auth.role ?= \"admin\"\n"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})

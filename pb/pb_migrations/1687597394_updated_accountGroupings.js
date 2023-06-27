migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95v0eojj2zegeo9")

  collection.name = "accountGrouping"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95v0eojj2zegeo9")

  collection.name = "accountGroupings"

  return dao.saveCollection(collection)
})

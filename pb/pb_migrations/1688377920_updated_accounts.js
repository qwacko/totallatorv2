migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  collection.listRule = "@request.auth.id != ''"
  collection.viewRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})

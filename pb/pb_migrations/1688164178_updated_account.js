migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  collection.name = "accounts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1awv4exoc7vkbjk")

  collection.name = "account"

  return dao.saveCollection(collection)
})

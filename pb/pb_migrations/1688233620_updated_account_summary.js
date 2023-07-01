migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions, count(case when t.toAccount = a.id then 1 end) as num_to_transactions, COALESCE(SUM(CASE WHEN t.fromAccount = a.id then -t.amount else 0 end),0) as sum_from_transactions, COALESCE(SUM(CASE WHEN t.toAccount = a.id then t.amount else 0 end),0) as sum_to_transactions,\n\n  (SELECT COALESCE(SUM(CASE WHEN t2.fromAccount = a.id then -t2.amount when t2.toAccount = a.id then t2.amount else 0 end), 0) from transactions t2 where STRFTIME('%Y-%m', t2.DATE) <= STRFTIME('%Y-%m', t.date)) as running_total\n  \n  FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

  // remove
  collection.schema.removeField("urjnfhh2")

  // remove
  collection.schema.removeField("elfjoxki")

  // remove
  collection.schema.removeField("pnazcvqq")

  // remove
  collection.schema.removeField("q41h2ank")

  // remove
  collection.schema.removeField("bfdhx83k")

  // remove
  collection.schema.removeField("7a2w1abn")

  // remove
  collection.schema.removeField("3ntcxass")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rgyyexyk",
    "name": "account_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1awv4exoc7vkbjk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3w0vhqrg",
    "name": "month",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eb3rywdv",
    "name": "num_from_transactions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awsvfweo",
    "name": "num_to_transactions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cflvhr2w",
    "name": "sum_from_transactions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "btsav8fo",
    "name": "sum_to_transactions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgf5nuf2",
    "name": "running_total",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x1zk7adz9dx9y0s")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, a.id as account_id, a.title as account_title, a.type as account_type, STRFTIME('%Y-%m',t.date) as month, count(case when t.fromAccount = a.id then 1 end) as num_from_transactions, count(case when t.toAccount = a.id then 1 end) as num_to_transactions, COALESCE(SUM(CASE WHEN t.fromAccount = a.id then t.amount else 0 end),0) as sum_to_transactions, COALESCE(SUM(CASE WHEN t.toAccount = a.id then -t.amount else 0 end),0) as sum_from_transactions,\n\n  (SELECT COALESCE(SUM(CASE WHEN t2.fromAccount = a.id then -t2.amount when t2.toAccount = a.id then t2.amount else 0 end), 0) from transactions t2 where STRFTIME('%Y-%m', t2.DATE) <= STRFTIME('%Y-%m', t.date)) as running_total\n  \n  FROM accounts a LEFT JOIN transactions t ON t.fromAccount = a.id or t.toAccount = a.id GROUP BY a.id, a.title, a.type, month;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "urjnfhh2",
    "name": "account_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1awv4exoc7vkbjk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elfjoxki",
    "name": "month",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pnazcvqq",
    "name": "num_from_transactions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q41h2ank",
    "name": "num_to_transactions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfdhx83k",
    "name": "sum_to_transactions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7a2w1abn",
    "name": "sum_from_transactions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ntcxass",
    "name": "running_total",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("rgyyexyk")

  // remove
  collection.schema.removeField("3w0vhqrg")

  // remove
  collection.schema.removeField("eb3rywdv")

  // remove
  collection.schema.removeField("awsvfweo")

  // remove
  collection.schema.removeField("cflvhr2w")

  // remove
  collection.schema.removeField("btsav8fo")

  // remove
  collection.schema.removeField("mgf5nuf2")

  return dao.saveCollection(collection)
})

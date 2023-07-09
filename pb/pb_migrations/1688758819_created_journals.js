migrate((db) => {
  const collection = new Collection({
    "id": "uho09tci0ulk1r5",
    "created": "2023-07-07 19:40:19.503Z",
    "updated": "2023-07-07 19:40:19.503Z",
    "name": "journals",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1wanmxuh",
        "name": "account",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "1awv4exoc7vkbjk",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uph6kody",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "0l2csviu",
        "name": "amount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "xuq1c27o",
        "name": "tag",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "0t0712dluvpzq23",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "owj27xvf",
        "name": "bill",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "i1comkpibz1mzs6",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uxet8m8k",
        "name": "budget",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "cvpcr40d7a9qoc8",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uymqbtis",
        "name": "category",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "mvgyjd58pr16gr7",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "wjkqwseg",
        "name": "date",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != ''",
    "viewRule": "@request.auth.id != ''",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uho09tci0ulk1r5");

  return dao.deleteCollection(collection);
})

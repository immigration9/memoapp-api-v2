const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

/**
 * Creates Database directory if it doesn't exist.
 */
const dbDirectory = path.join(__dirname, '../db');
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory);
}

const adapter = new FileSync(path.join(__dirname, '../db/db.json'));
const db = low(adapter);

db.defaults({
  labels: [],
  memos: [],
  labelsToMemos: [],
}).write();

module.exports = db;

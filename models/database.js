const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Memory = require('lowdb/adapters/Memory');

const dbDirectory = path.join(__dirname, '../db');

/**
 * Creates Database directory if it doesn't exist.
 */
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory);
}

const isTest = process.env.ENVIRONMENT === 'test';
const fileDirectory = path.join(__dirname, `../db/db.json`);

const adapter = new FileSync(fileDirectory);
const db = low(isTest ? new Memory() : adapter);

db.defaults({
  labels: [],
  memos: [],
  labelsToMemos: [],
}).write();

module.exports = db;

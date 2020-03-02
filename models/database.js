const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = () => {
  const dbDirectory = path.join(__dirname, '../db');

  /**
   * Creates Database directory if it doesn't exist.
   */
  if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory);
  }

  const isTest = process.env.ENVIRONMENT === 'test';
  const fileDirectory = path.join(
    __dirname,
    `../db/${isTest ? 'test_db' : 'db'}.json`
  );

  /**
   * Test Environment Only
   * * remove preexisting test-db file
   */
  if (isTest && fs.existsSync(fileDirectory)) {
    fs.unlinkSync(fileDirectory);
  }

  const adapter = new FileSync(fileDirectory);
  const db = low(adapter);

  db.defaults({
    labels: [],
    memos: [],
    labelsToMemos: [],
  }).write();
};

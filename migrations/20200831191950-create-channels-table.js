'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable('channels', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    discord_channel_id: 'string',
    name: 'string',
  });

  db.addIndex('channels', 'unique_discord_channel_id', ['discord_channel_id'], true);
};

exports.down = function(db) {
  return db.dropTable('channels');
};

exports._meta = {
  "version": 1
};

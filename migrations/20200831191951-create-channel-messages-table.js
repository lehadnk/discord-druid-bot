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
  await db.createTable('channel_messages', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    discord_user_id: 'string',
    discord_channel_id: 'string',
    time: 'int',
  });

  db.addIndex('channel_messages', 'unique_discord_channel_id_and_user_id', ['discord_channel_id', 'discord_user_id'], false);
};

exports.down = function(db) {
  return db.dropTable('channel-messages');
};

exports._meta = {
  "version": 1
};

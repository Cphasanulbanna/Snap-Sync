const { , validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'snapsync',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;


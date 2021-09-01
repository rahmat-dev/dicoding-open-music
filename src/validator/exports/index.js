const { ExportPlaylistSongsSchema } = require('./schema');
const { InvariantError } = require('../../exceptions');

const ExportsValidator = {
  validateExportPlaylistSongs: (payload) => {
    const validationResult = ExportPlaylistSongsSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;

const { InvariantError } = require('../../exceptions');
const {
  PostCollaborationPayloadSchema,
  DeleteCollaborationPayloadSchema,
} = require('./schema');

const CollaborationsValidator = {
  validatePostCollaborationPayload: (payload) => {
    const validationResult = PostCollaborationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteCollaborationPayload: (payload) => {
    const validationResult = DeleteCollaborationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollaborationsValidator;

class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportPlaylistSongsHandler =
      this.postExportPlaylistSongsHandler.bind(this);
  }

  async postExportPlaylistSongsHandler(request, h) {
    await this._validator.validateExportPlaylistSongs(request.payload);

    const userId = request.auth.credentials.id;
    const { playlistId } = request.params;
    const { targetEmail } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);

    const message = {
      playlistId,
      targetEmail,
    };

    await this._producerService.sendMessage(
      `export:playlist-songs`,
      JSON.stringify(message)
    );

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;

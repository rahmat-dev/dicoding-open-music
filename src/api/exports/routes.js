const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.postExportPlaylistSongsHandler,
    options: {
      auth: 'jwt',
    },
  },
];

module.exports = routes;

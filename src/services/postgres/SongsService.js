const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { InvariantError, NotFoundError } = require('../../exceptions');
const { mapDBToModel } = require('../../utils');

class SongsService {
  constructor() {
    this.pool = new Pool();
  }

  async addSong({
    title, year, performer, genre, duration,
  }) {
    const id = `song-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        title,
        year,
        performer,
        genre,
        duration,
        insertedAt,
        updatedAt,
      ],
    };
    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan lagu');
    }

    return result.rows[0].id;
  }

  async getSongs() {
    const result = await this.pool.query(
      'SELECT id, title, performer FROM songs',
    );
    return result.rows.map(mapDBToModel);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id=$1',
      values: [id],
    };
    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editSongById(id, {
    title, year, performer, genre, duration,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5, updated_at=$6 WHERE id=$7 RETURNING id',
      values: [title, year, performer, genre, duration, updatedAt, id],
    };
    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui lagu. ID tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id=$1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus lagu. ID tidak ditemukan');
    }
  }
}

module.exports = SongsService;

import pgp from 'pg-promise';

const connection = pgp()('postgres://postgres:123456@localhost:5432/appp');

export function databaseConnection() {
  return {
    getConnection() {
      return connection;
    },

    async finishConnection() {
      await connection.$pool.end();
    },
  };
}
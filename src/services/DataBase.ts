import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = 'prueba.sqlite3';

export const getConnection = async (): Promise<SQLiteDatabase> => {
  const db = await openDatabase({name: DATABASE_NAME, location: 'Documents'});
  return db;
};

export const createTable = async (db: any) => {
  const query = `CREATE TABLE IF NOT EXISTS EXPERIENCE(id INTEGER PRIMARY KEY AUTOINCREMENT,title nvarchar(150),date_actual datetime, description text, PhotoUrl text, AudioUrl text)`;
  return await db.executeSql(query);
};

export const initDatabase = async () => {
  const conn = await getConnection();
  await createTable(conn);
  conn.close();
};

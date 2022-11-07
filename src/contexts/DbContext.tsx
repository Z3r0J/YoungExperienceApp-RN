import {createContext, useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {createTable, getConnection} from '../services/DataBase';

const DbContext = createContext(null);

export const useDbContext = () => {
  return useContext(DbContext);
};

export const DbContextProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [db, setDb] = useState(null);
  useEffect(() => {
    let _db: any = null;
    async function getConn() {
      _db = await getConnection();
      await createTable(_db);
      setDb(_db);
      setIsLoading(false);
    }
    getConn();

    return () => {
      if (_db != null) {
        _db.close();
      }
    };
  }, []);

  isLoading && <Text>Loading...</Text>;

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};

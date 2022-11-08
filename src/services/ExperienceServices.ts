import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const getAllExperience = async (db: any) => {
  const Experience: Experience[] = [];
  const query = 'SELECT * FROM EXPERIENCE';

  const response = await db.executeSql(query);

  response.forEach((res: any) => {
    for (let index = 0; index < res.rows.length; index++) {
      const exp: Experience = {
        id: res.rows.item(index)['id'],
        title: res.rows.item(index)['title'],
        date_actual: res.rows.item(index)['date_actual'],
        description: res.rows.item(index)['description'],
        PhotoUrl: res.rows.item(index)['PhotoUrl'],
        AudioUrl: res.rows.item(index)['AudioUrl'],
      };
      Experience.push(exp);
    }
  });
  return Experience;
};

export const insertExperience = async (experience: Experience, db: any) => {
  const query = `INSERT INTO EXPERIENCE(title,date_actual,description,PhotoUrl,AudioUrl) values('${experience.title}','${experience.date_actual}','${experience.description}','${experience.PhotoUrl}','${experience.AudioUrl}')`;
  return await db.executeSql(query);
};

export const updateData = async (
  photoUrl: string,
  audioUrl: string,
  db: any,
) => {
  console.log(audioUrl);
  const query = `UPDATE EXPERIENCE SET AudioUrl='${audioUrl}' where PhotoUrl='${photoUrl}'`;
  return await db.executeSql(query);
};

export const truncateExperience = async (db: any) => {
  const experiences = await getAllExperience(db);

  experiences.map(ex => {
    CameraRoll.deletePhotos(ex.PhotoUrl);
    CameraRoll.deletePhotos(ex.AudioUrl);
  });

  const query =
    "DELETE FROM EXPERIENCE; UPDATE SQLITE_SEQUENCE SET seq=0 where name='EXPERIENCE'; VACCUM;";
  return await db.executeSql(query);
};

export class Experience {
  id: any;
  title: any;
  date_actual: any;
  description: any;
  PhotoUrl: any;
  AudioUrl: any;
}

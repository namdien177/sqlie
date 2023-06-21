import { Connection } from "mysql2";

export default function runQuery(connection: Connection, statement: string) {
  return new Promise(async (resolve, reject) => {
    connection.query(statement, function (err, results, fields) {
      if (err) {
        console.log("Backup error: ", err);
        return reject(err);
      }
      return resolve(results);
    });
  });
}

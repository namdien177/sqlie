import { Connection } from "mysql2";

export default function runQuery(connection: Connection, statement: string) {
  return new Promise(async (resolve, reject) => {
    connection.query(statement, function (err, results, fields) {
      if (err) {
        return reject(err);
      }
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      return resolve(results);
    });
  });
}

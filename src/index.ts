import "dotenv/config";
import * as path from "path";
import runQuery from "./database/query";
import database from "./database";

const fs = require("fs");

async function processFile(filePath: string) {
  // For pool initialization, see above
  // Do something with the connection

  console.time("Read file duration");
  const bigQuery = fs.readFileSync(filePath).toString();
  console.timeEnd("Read file duration");

  console.time("Backup Duration");
  await runQuery(database, "SET FOREIGN_KEY_CHECKS = 0;");
  await runQuery(database, bigQuery);
  await runQuery(database, "SET FOREIGN_KEY_CHECKS = 1;");
  console.timeEnd("Backup Duration");
}

const cwd = process.cwd();
const fileFromCwd = path.join(cwd, "./temp/backup.sql");

processFile(fileFromCwd).then(() => console.log("read complete"));

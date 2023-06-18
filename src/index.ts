import "dotenv/config";
import * as path from "path";
import runQuery from "./database/query";
import database from "./database";

const fs = require("fs");
const readline = require("readline");

async function processFile(filePath: string) {
  let tempStatement = "";
  let statementExecuted = 0;
  console.time("Backup Duration");
  // For pool initialization, see above
  // Do something with the connection
  await runQuery(database, "SET FOREIGN_KEY_CHECKS = 0;");

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log(line);
    if (
      line.startsWith("--") ||
      (line.startsWith("/*") && line.endsWith("*/;")) ||
      line.trim() === ""
    ) {
      // skip lines that are full comment.
      continue;
    }

    if (line.endsWith(";")) {
      tempStatement += ` ${line}`;
      await runQuery(database, tempStatement.trim());
      statementExecuted++;
      tempStatement = "";
    } else {
      tempStatement += ` ${line}`;
    }
  }
  if (tempStatement) {
    await runQuery(database, tempStatement);
    statementExecuted++;
  }
  await runQuery(database, "SET FOREIGN_KEY_CHECKS = 1;");

  console.timeEnd("Backup Duration");
  console.log("SQL statement executed:", statementExecuted);
}

const cwd = process.cwd();
const fileFromCwd = path.join(cwd, "./temp/backup.sql");

processFile(fileFromCwd).then(() => console.log("read complete"));

import * as path from "path";

const fs = require("fs");
const readline = require("readline");

async function processFile(filePath: string) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const statements: string[] = [];
  let tempStatement = "";

  for await (const line of rl) {
    console.log(line);
    // Each line in the file will be successively available here as `line`.
    // You can do your processing on each line here.
    if (
      line.startsWith("--") ||
      (line.startsWith("/*") && line.endsWith("*/;")) ||
      line.trim() === ""
    ) {
      continue;
    }

    if (line.endsWith(";")) {
      if (tempStatement) {
        statements.push(tempStatement.trim());
      } else {
        statements.push(line);
      }
      tempStatement = "";
    } else {
      tempStatement += `${line}\n`;
    }
  }
  if (tempStatement) {
    statements.push(tempStatement);
  }
  console.log(statements[0]);
  console.log(statements[1]);
  console.log(statements[2]);
  console.log(statements[3]);
  console.log(statements[4]);
}

const cwd = process.cwd();
const fileFromCwd = path.join(cwd, "backup.sql");

processFile(fileFromCwd).then(() => console.log("read complete"));

#! /usr/bin/env node

import { summarize } from "../lib/main.js";

const readStdin = () => {
  return new Promise((resolve, reject) => {
    const bufs = [];

    process.stdin.on("data", (buf) => {
      bufs.push(buf);
    });

    process.stdin.on("end", () => {
      resolve(bufs.join(""));
    });

    process.stdin.on("error", (error) => {
      reject(error);
    });
  });
};

(async () => {
  const json = await readStdin();
  const obj = JSON.parse(json);
  const summary = summarize(obj);
  console.log(JSON.stringify(summary, null, 2));
})();

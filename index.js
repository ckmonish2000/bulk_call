import fs from "fs"
import path from "path"
import util from "util"
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFile = util.promisify(fs.readFile)

readFile(path.join(__dirname, "Pure_Milk.postman_collection.json"), "utf-8")
  .then(v => {
    let { item } = JSON.parse(v)
    // requests loop
    item.forEach(async (req) => {
      // meta data
      const url = req.request.url.raw
      const method = req.request.method
      const name = req.name

      // fetch
      let data = await fetch(url, { method: "GET" })
      data = await data.json()

      //print
      console.log("request name =", name)
      console.log("\n", data)
      console.log("\n ---------------------------------- \n")
    })
  })
  .catch(err => { console.log(err) })





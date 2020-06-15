const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs-extra');
const octopus = require('adapt-octopus');
const path = require('path');

class App {
  constructor() {
    this.port = process.env.PORT;
    this.outputdir = path.join(process.cwd(), 'temp');

    this.expressApp = express();
    this.expressApp.use(express.static('public'));
    this.expressApp.use(bodyParser.json());

    this.initRoutes();

    this.connect().then(() => console.log(`Server listening on ${this.port}`));
  }
  initRoutes() {
    this.expressApp.post('/convert', this.convertSchema.bind(this));
  }
  async convertSchema(req, res, next) {
    fs.ensureDir(this.outputdir);
    const filepath = path.join(this.outputdir, `${new Date().getTime()}.json`);
    await fs.writeJson(filepath, req.body);
    res.sendFile(await octopus.read(filepath, filepath));
  }
  connect() {
    return new Promise((resolve, reject) => this.expressApp.listen(this.port, () => resolve()));
  }
}

module.exports = App;

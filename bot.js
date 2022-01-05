const { Client } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const express = require('express');
var rar_process = require('./rar_process')
const remover = require('./lib/dir-remove')
var path = require("path");
var qrcode = require('qrcode-terminal');
const PQueue = require('p-queue');
const port = process.env.PORT || 6000;

const app = express();

const singleFileQ = new PQueue({
    concurrency: 1,
    intervalCap: 1,
    carryoverConcurrencyCount: true
  })

const SESSION_FILE_PATH = './session.json';

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    puppeteer: {
        executablePath: '/app/.apt/usr/bin/google-chrome',
    },
    session: sessionData
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true})
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body == '!up' || '.up') {
        url = msg.body.slice(4);
        await msg.reply(url);
        await client.sendMessage(msg.from,"media")
        await msg.reply("Downloading & Zipping .. 😇")
      lists = rar_process(url)
      list = lists[0]
      console.log(lists)

      await msg.reply("Please Wait " + list.length + " Files are Uploading 😴")
      await Promise.all(files.map(file => singleFileQ.add(()=>client.sendMessage(msg.from,MessageMedia.fromFilePath(file)))));

    //now you can wait until all the files have been sent
    await singleFileQ.onEmpty()
    await msg.reply("All files have been uploaded by ~Luna 🌸")
    remover(lists[1]) 
    }
});

client.initialize();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html')); 
  });
  
  app.listen(port, function() {
    console.log('App running on *: ' + port);
  
  });

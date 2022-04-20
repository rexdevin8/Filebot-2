const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const express = require('express');
var rar_process = require('./lib/rar_process')
const remover = require('./lib/dir-remove')
var path = require("path");
var qrcode = require('qrcode-terminal');
const port = process.env.PORT || 6000;

const app = express();


const client = new Client({
    // puppeteer: {
    //     //executablePath: '/app/.apt/usr/bin/google-chrome',
    //     executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    // },
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true})
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body == '!up' || '.up') {
        url = msg.body.slice(4);
        //await msg.reply(url);
        //await client.sendMessage(msg.from,"media")
        await msg.reply("Downloading & Zipping .. 😇")
      lists = rar_process(url)
      list = lists[0]
      console.log(lists)

      await msg.reply("Please Wait " + list.length + " Files are Uploading 😴")
      for(var i = 0; i < list.length ; i++){
        console.log(list[i])
        const media = MessageMedia.fromFilePath(list[i]);
        client.sendMessage(msg.from,media)
    }
    //msg.reply("All files have been uploaded by ~Luna 🌸")
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

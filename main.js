'use strict'
const http = require('http');
const fs = require('fs');
const url = require('url');
const multer = require('multer');

// file upload

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./files');
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage}).single("Image");


// Server Create

http.createServer(function (req, res){
    const path = url.parse(req.url).pathname;

    if(req.url==="/"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('This is home page')
        res.end();
    }
    else if(req.url==="/about"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('This is About Page')
        res.end();
    }
    else if(req.url==="/contact"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('This is the contact page')
        res.end();
    }
/////////// File Create
else if (path === '/file-write') {
    fs.writeFile('demo.txt', 'hello world', (err) => {
      if (err) {
        res.writeHead(201, { 'Content-Type': 'text/html' });
        res.write('File Writing Fail');
      } else {
        res.writeHead(201, { 'Content-Type': 'text/html' });
        res.write('File Writing Success');
      }
      res.end();
    });
  }
//////// File Upload
  // File upload
  else if (path === '/uploads') {
    upload(req, res, function (error) {
      if (error) {
        res.writeHead(202, { 'Content-Type': 'text/html' });
        res.end("File Upload Fail");
      } else {
        res.writeHead(202, { 'Content-Type': 'text/html' });
        res.end("File Upload Success");
      }
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('404 Not Found');
    res.end();
  }

}).listen(5500,function (){
    console.log("App Running 5500....")
});

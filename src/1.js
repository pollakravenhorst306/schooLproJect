const http = require('http');
const url = require('url');

// Create an HTTP server
http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Handle the request
  if (pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Welcome to my website!</h1>');
  } else if (pathname === '/about') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>About me</h1>');
  } else if (pathname === '/contact') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Contact me</h1>');
  }
}).listen(8080);

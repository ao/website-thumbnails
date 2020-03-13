var webshot = require('webshot');
var http = require('http');
var url = require('url');

http.createServer(onRequest).listen(8888);
console.log('http://<ip>:8888/<example.com>');

function onRequest(request, response){
  var domain = url.parse(request.url).pathname

  // var domain = "statvoo.com";
  var filename = domain.replace(".", "_");
  renderit(domain, filename, function() {
    response.writeHead(200);
    response.write('http://<ip>:8888/<example.com>');
    response.end();
  });
}

function renderit(domain, filename, cb) {
  
  // WEB

  var options = {
    screenSize: {
      width: 1920,
      height: 1080
    },
    shotSize: {
      width: 1920,
      height: 1080
    },
    quality: 100,
    defaultWhiteBackground: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
  };

  webshot(domain, "cache/"+filename+'_web.png', function(err) {});



  // MOB

  var options = {
    screenSize: {
      width: 375,
      height: 667
    },
    shotSize: {
      width: 375,
      height: 667
    },
    quality: 100,
    defaultWhiteBackground: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B350'
  };


  webshot(domain, "cache/"+filename+'_mob.png', options, function(err) {});

  if (cb) cb();
}
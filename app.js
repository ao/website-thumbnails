var webshot = require('webshot');
var http = require('http');
var url = require('url');
const fs = require('fs');
const resizeImg = require('resize-img');

http.createServer(onRequest).listen(8888);
console.log('Serving requests at: http://0.0.0.0:8888/google.com');

function onRequest(request, response){
  var domain = url.parse(request.url).pathname
  var filename = domain.replace(".", "_");
  renderit(domain, filename, function() {
    response.writeHead(200);
    response.write('Serving requests at: http://0.0.0.0:8888/google.com');
    response.end();
  });
}

function renderit(domain, filename, cb) {
  
  // WEB

  var filename_web = "cache/"+filename+'_web.png';
  webshot(domain, filename_web, {
    screenSize: {
      width: 1920,
      height: 1080
    },
    shotSize: {
      width: 1920,
      height: 1080
    },
    quality: 75,
    defaultWhiteBackground: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
  },
  function(err) {
    if (err==null) {

      (async () => {
        const image = await resizeImg(fs.readFileSync(filename_web), {
            width: 1920/2,
            height: 1080/2
        });
     
        fs.writeFileSync(filename_web, image);
      })();

    }
  });



  // MOB

  var filename_mob = "cache/"+filename+'_mob.png';
  webshot(domain, filename_mob, {
    screenSize: {
      width: 375,
      height: 667
    },
    shotSize: {
      width: 375,
      height: 667
    },
    quality: 75,
    defaultWhiteBackground: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B350'
  },
  function(err) {
    if (err==null) {
      
      (async () => {
        const image = await resizeImg(fs.readFileSync(filename_mob), {
            width: 375/2,
            height: 667/2
        });
     
        fs.writeFileSync(filename_mob, image);
      })();

    }
  });

  if (cb) cb();
}


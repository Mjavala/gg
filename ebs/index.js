const jsonwebtoken = require('jsonwebtoken');
const request = require('request')
var express = require("express");
const cors = require("cors");

var app = express();
var port = 3000;
// Express Step 2: Adding body parser to help parse the incoming request
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())


// JWT Step 2: Get JWT Secret
// TODO: Move to env
const sec =" ZYtTNHMgfnwVDmtJfV2QuVyEx/XgBiP+v3rUrVog5Ys=";
const secret = Buffer.from(sec, 'base64');

// string constant 
const bearerPrefix = 'Bearer '; 

// API variables
const version = '0.0.1'
// TODO: Move to env
const client_id = 'ijc79hccu6xftlc6uryuqlwwsbl6va'
let channel_id
var sig


// POST: chat message, notice of a tip 
app.get("/chat", cors(), (req, res) => {
  console.log('message recieved')
  sig = signAndVerify(req)
  payload = JSON.stringify({
      'text': 'Testing Live Server'
  });
  sendChatMessage(payload, sig)

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.options('/options', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});



// req holds broadcaster address, it is then set in the twitch local store for the frontend to access
// Only fires once on load
app.post("/config", (req, res) => {
  sig = signAndVerify(req)
  setExtensionSegmenet(sig, req.body)
  return res

});

function setExtensionSegmenet(sig, message) {
  let url = 'https://api.twitch.tv/extensions/'+ client_id + '/configurations/'
  let body = JSON.stringify({"segment":"broadcaster","channel_id":channel_id,"version":"0.0.1","content": JSON.stringify(message)})
  request.put({
    url: url,
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'Bearer ' + sig,
      'Client-ID': client_id,
      'Content-Type': 'application/json'
    },
    body: body,
    gzip: true
  }, function(e, r, b) {
    if (e) {
      console.log(e);
    } else if (r.statusCode == 204) {
        console.log('Extension set OK');
        return b
    } else {
        console.log('Got ' + r.statusCode);
        console.log(b);
    }
  })
}

function sendChatMessage(message, sig) {
  let url = 'https://api.twitch.tv/extensions/'
        + client_id + '/'
        + version
        + '/channels/'
        + channel_id
        + '/chat';
    request.post({
        url: url,
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + sig,
            'Client-ID': client_id,
            'Content-Type': 'application/json'
        },
        body: message,
        gzip: true
    }, function(e, r, b) {
        if (e) {
            console.log(e);
        } else if (r.statusCode == 204) {
            console.log('Relay chat OK');
        } else {
            console.log('Chat Endpoint: Got ' + r.statusCode);
            console.log(b);
        }
    });
}

function signAndVerify(req) {
  let result = verifyAndDecode(req.headers.authorization)
  channel_id = result.channel_id
  var payload = {
    'exp':          Math.floor(new Date().getTime() / 1000) + 60,
    'user_id':      ''+result.user_id,
    'role':         'broadcaster'
  }
  return jsonwebtoken.sign(payload, secret);
}



// Express STEP 3: Start Server 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});

// JWT Step 3: Verify
// Verify the header and the enclosed JWT.
function verifyAndDecode (header) {
  if (header.startsWith(bearerPrefix)) {
    try {
      const token = header.substring(bearerPrefix.length);
      return jsonwebtoken.verify(token, secret, { algorithms: ['HS256'] });
    }
    catch (ex) {
      return console.log("Invalid JWT")
    }
  }
}
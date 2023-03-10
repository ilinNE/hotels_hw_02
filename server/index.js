
const HOST = "localhost";
const PORT = "8000";

const http = require('http');
const router = require('./endpoints.js')


server = http.createServer( (req, res) => {
    let data = "";

    req.on("data", chunk => {
        data += chunk;
    });

    req.on("end", () => {
        if (data) {
            req.body = JSON.parse(data);
        }    
        const url = req.url;
        const method = req.method;
        const path = router.getPath(url)
        if (!path){
            res.writeHeader(404, {'Content-Type': "application/json"});
            res.end('{"error":"Not Found"}');
        }
        const handler = path[method];
        if (!handler) {
            res.writeHeader(405, {'Content-Type': "application/json"});
            res.end('{"405":"Method Not Allowed"}');
        } else {
            handler(req, res);
        }
    });
})



server.listen(PORT, HOST,  () => {
    console.log('server starts')}
);

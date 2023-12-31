const fs = require('fs');
    
const requestHandler = (req, res) => {
    if(req.url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action=\'/message\' method=\'POST\'><input type=\'text\' name=\'message\'/><button type=\'submit\'>Send</button></form></body>');
        res.write('</html>')
        return res.end();
    }

    if(req.url === '/message' && req.method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log("chunk ", chunk);
            body.push(chunk);
        });

        return req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode=302;
                res.setHeader('Location', '/');
                return res.end();
            });
            
        });
        
        
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>From my Node JS server</h1></body>');
    res.write('</html>')
    res.end();
};


// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// }


// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';

module.exports = requestHandler;

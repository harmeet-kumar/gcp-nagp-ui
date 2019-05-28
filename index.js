const express = require('express')
const PORT = process.env.PORT || 4200;
const CLUSTER_ID = process.env.CLUSTER_ID || "http://localhost:3000";

const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.urlencoded({
    extended: true
    })); 

app.use(express.static('kratos'))

app.get("/users", (req, res) => {
    request(CLUSTER_ID + "/users", { json: true }, (err, resp, body) => {
     if (err || !body) {
        res.send("Error while getting users from "+ CLUSTER_ID  + "/users" ) 
     } else{
         res.send(body);
     }
     
    });
}) 


        // Parse JSON bodies (as sent by API clients)
        app.use(express.json());
        
    app.post('/addUser', (req, res) => {
        request.post({
        url:CLUSTER_ID + '/addUser',
        body: req.body,
        json: true
        }, function(err, resp, body){
                if (err || !body) {
                res.send("Error while getting users from "+CLUSTER_ID + '/addUser') 
             } else{
                 res.send(body);
             }
        })
    }) 
         

app.get('/*', function(req, res) { 
res.sendFile(__dirname + '/kratos/index.html')
});

app.listen(PORT, () => console.log('UI service listening on port '+PORT+'!')) 
 

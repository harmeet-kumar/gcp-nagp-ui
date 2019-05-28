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

app.get("/users", getAllUsers);
app.post("/addUser", createNewUser);

async function getAllUsers(req, res) {
  let response = await getUsersFromSQL(req, res);
  res.send(response);
}

let getUsersFromSQL = () => {
  return new Promise((resolve, reject) => {
    request(CLUSTER_ID + "/users", function(error, response, body) {
      resolve(body);
    });
  });
};

async function createNewUser(req, res) {
  let response = await createNewClusterUser(req.body);
  res.send(response);
}

let createNewClusterUser = body => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: CLUSTER_ID + "/addUser",
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        json: body
      },
      function(err, httpResponse, body) {
          console.log(err);
          console.log(httpResponse);
        resolve(body);
      }
    );
  });
};

app.get('/*', function(req, res) { 
res.sendFile(__dirname + '/kratos/index.html')
});

app.listen(PORT, () => console.log('UI service listening on port '+PORT+'!')) 
 

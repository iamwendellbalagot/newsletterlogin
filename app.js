//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastname = req.body.lName;
    var email = req.body.email;

    var data = {
      members: [
        {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastname
        }
      }
    ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
      url:"https://us3.api.mailchimp.com/3.0/lists/3e1099906a",
      method: "POST",
      headers: {
        "Authorization": "wendell1 16b6d299eacf5be763238456498c10a5-us3"
      },
      body: jsonData
    };

  request(options, function(error, response, body){
    var status = response.statusCode;

    if (error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }
    else if (status === 200){
      console.log("Successfully connected to the external server.");
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is running at port 3000.");
});

//16b6d299eacf5be763238456498c10a5-us3
//3e1099906a

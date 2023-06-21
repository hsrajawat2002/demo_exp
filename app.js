const express= require("express");
const bodyParser=require("body-parser");
const request= require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const fname= req.body.firstName;
    const lname= req.body.lastName;
    const mID= req.body.mailID;
    
    const data={
        members:[
        {email_address:mID,
            status: "subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname}
            }
        ]
    };
    const jsondata=JSON.stringify(data);
    // console.log(jsondata);
    
    const url="https://us21.api.mailchimp.com/3.0/lists/839a3f81f9";
    const options={
        method:"POST",
        auth:"hix:006f6741c1a10a812d6e813484ce4a80-us21"
    }

    const request=https.request(url,options,function(response){
        if (response.statusCode===200) {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        // response.on("data",function(data){
        //     const jsdata=JSON.parse(data);
        // });
    });

    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.post("/success",function(req,res){
    res.redirect("/");
});

//here process.env.PORT is for heroku dynamic server allocation

app.listen(3000,function(){
    console.log("port running at 3000");
})

//whether this is saved or not
// api Key
// 006f6741c1a10a812d6e813484ce4a80-us21

// audience Id
// 839a3f81f9

// https://us21.api.mailchimp.com/3.0/lists/839a3f81f9/members?apikey=006f6741c1a10a812d6e813484ce4a80-us21#
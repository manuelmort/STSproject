const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");


const db = require("./app/models");

const Role = db.role;

const app = express();

var corsOptions = {
    origin : "http://localhost:3000"
}

app.use(cors(corsOptions));


//parse request of content-type
app.use(bodyParser.json());

//parse request of content --application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


db.mongoose.connect(`mongodb+srv://bluerare:manuel09!@vespacluster.4zhfz.mongodb.net/STS?retryWrites=true&w=majority`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Successfully connect to MongoDB");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
})


//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get("/", (req, res)=>{
    res.json({message: "welcome to the Back End of STSapp!"})
})



function initial() {

    Role.estimatedDocumentCount((err,count) => {
        if(!err && count === 0) {

            new Role({
                name: "user"
            }).save(err => {

                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to the roles collection");
            })

            new Role({
                name: "moderator"
            }).save(err => {

                if(err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to the roles collection");
            })

            new Role({
                name: "admin"
            }).save(err => {

                if(err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to the roles collection");
            })
        }
    })
};

//set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Server is running`);
})
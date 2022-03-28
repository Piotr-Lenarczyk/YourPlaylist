const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dbconfig = require("./app/config/dbconfig");
const db = require("./app/models/index");
const Role = db.role;
const Avatar = db.avatar;
let corsOptions = {
    origin: "https://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "app/pictures/")));

require("./app/routes/authroutes")(app);
require("./app/routes/userroutes")(app);

//funkcje
function initial(){
    Role.estimatedDocumentCount((err,count) => {
        if(!err && count == 0){
            new Role({name: "user"})
            .save(err => {
                if(err) console.log("Error: ",err);
                console.log(`Added "user" to Roles collection`);
            });
            new Role({name: "moderator"})
            .save(err => {
                if(err) console.log("Error: ",err);
                console.log(`Added "moderator" to Roles collection`);
            });
            new Role({name:"admin"})
            .save(err => {
                if(err) console.log("Error: ",err);
                console.log(`Added "admin" to Roles collection`);
            });
        }
    });
    Avatar.estimatedDocumentCount((err,count) => {
        if(!err && count == 0){
            new Avatar({name: "default", src: path.join(__dirname, `app/pictures/default.png`)})
            .save(err => {
                if(err) console.log("Error: ",err);
                console.log("Added default avatar to Avatar database");
            });
        }
    });
}

//setup bazy
db.mongoose
.connect(`mongodb://${dbconfig.HOST}:${dbconfig.PORT}/${dbconfig.DB}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Succesfully connected to mongodb");
    initial();
})
.catch(err => {
    console.log("Error: ",err);
});

// Role.find({}).then(roles => {
//     console.log(roles);
// });
// Avatar.find({}).then(avatars => {
//     console.log(avatars);
// });

//requesty
app.get("/",(req,res) => {
    res.send(JSON.stringify({message:"Welcome to Your Playlist"}));
});

//start
app.listen(3000,() => {
    console.log(`Server is running on port 3000`);
});
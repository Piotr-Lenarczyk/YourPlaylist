const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./usermodel");
db.role = require("./rolemodel");
db.avatar = require("./avatarmodel");
db.ROLES = ["user","admin","moderator"];
module.exports = db;
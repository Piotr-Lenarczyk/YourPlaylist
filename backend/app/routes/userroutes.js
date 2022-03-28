const authJwt = require("../middleware/authjwt");
const controller = require("../controllers/usercontroller");

module.exports = app => {
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all",controller.allAccess);
    app.get("/api/test/user",[authJwt.verifyToken],controller.userBoard);
    app.get("/api/test/profile",[authJwt.verifyToken],controller.profileBoard);
    app.post("/api/test/changeavatar",[authJwt.verifyToken,controller.uploadImage],controller.changeAvatar);
    app.post("/api/test/changenick",[authJwt.verifyToken],controller.changeNick);
    app.get(
        "/api/test/mod",
        [authJwt.verifyToken,authJwt.isModerator],
        controller.moderatorBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken,authJwt.isAdmin],
        controller.adminBoard
    );
}
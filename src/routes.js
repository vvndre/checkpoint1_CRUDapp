let express = require("express");

let router = express.Router();

let controller = require("./controller");

//route to get all movie items
router.get("/movies", controller.listEntries);

//route to get item by id
router.get("/movies/:id", controller.getEntry);

//route to delete item by id
router.delete("/movies/:id", controller.deleteEntry);

//route to add a item
router.post("/movies", controller.addEntry);

//route to update item
router.put("/movies/:id", controller.updateEntry);

//auth routes for logging in/registering
let authController = require("./auth/authController")

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser)

module.exports = router;
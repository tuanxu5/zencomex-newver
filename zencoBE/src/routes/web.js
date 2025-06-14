const express = require("express");
const homeController = require("../controller/homeController");

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHello);
  router.get("/user", homeController.handleUserPage);
  router.get("/update-user/:userId", homeController.handleGetUser);

  router.post("/create-user", homeController.handleCreateUser);
  router.post("/update-user/:userId", homeController.handleUpdateUser);
  router.post("/delete-user/:userId", homeController.handleDeleteUser);
  app.use("/", router);
};

module.exports = initWebRoutes;

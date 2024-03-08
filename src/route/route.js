import express from "express";
import APIController from "../controller/Courses";
import UserController from "../controller/Account";

let router = express.Router();

const initAPIRoute = (app) => {
  //Courses
  router.get("/users", APIController.getAllUsers); // method GET -> READ data
  router.post("/create-user", APIController.createNewUser); // method POST -> CREATE data
  router.put("/update-user/:id", APIController.updateUser); //method PUT -> UPDATE data
  router.delete("/delete-user/:id", APIController.deleteUser); //method DELETE -> DELETE data

  //User
  router.post("/create", UserController.register); // method POST -> CREATE data
  router.get("/getUser", UserController.getAllAccounts); // method POST -> CREATE data
  router.post("/login", UserController.login); // method POST -> CREATE data
  router.post("/checklog", UserController.checkLogin); // method POST -> CREATE data

  return app.use("/api/v1/", router);
};

export default initAPIRoute;

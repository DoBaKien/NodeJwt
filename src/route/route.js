import express from "express";
import APIController from "../controller/Courses";
import AccController from "../controller/Account";
import UserController from "../controller/User";

let router = express.Router();

const initAPIRoute = (app) => {
  //Courses
  // router.get("/users", APIController.getAllUsers); // method GET -> READ data
  // router.post("/create-user", APIController.createNewUser); // method POST -> CREATE data
  // router.put("/update-user/:id", APIController.updateUser); //method PUT -> UPDATE data
  // router.delete("/delete-user/:id", APIController.deleteUser); //method DELETE -> DELETE data

  //User
  router.get("/users", UserController.getAllUser);
  router.get("/getUser/:id", UserController.getUser);
  router.post("/edit", UserController.editUser);

  //Account
  router.post("/create", AccController.register); // method POST -> CREATE data
  router.get("/getUser", AccController.getAllAccounts); // method POST -> CREATE data
  router.post("/login", AccController.login); // method POST -> CREATE data
  router.post("/checklog", AccController.checkLogin); // method POST -> CREATE data
  router.delete("/delete/:id", AccController.deleteAcc);
  router.post("/change", AccController.changePass);
  router.post("/logout", AccController.logout);
  router.get("/log", AccController.getLog);
  return app.use("/api/v1/", router);
};

export default initAPIRoute;

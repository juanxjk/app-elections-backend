import { Router } from "express";
import UserController from "./controllers/UserController";
import CandidateController from "./controllers/CandidateController";
import ElectionPollController from "./controllers/ElectionPollController";
import ElectionController from "./controllers/ElectionController";
import SurveyController from "./controllers/SurveyController";
import SessionController from "./controllers/SessionController";

const routes = Router();

// PUBLIC
routes.get("/login", SessionController.login);
routes.post("/logout", SessionController.logout);

// AUTHENTICATED

routes.get("/users", UserController.index);
routes.post("/users", UserController.create);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

routes.get("/candidates", CandidateController.index);
routes.post("/candidates", CandidateController.create);
routes.put("/candidates/:id", CandidateController.update);
routes.delete("/candidates/:id", CandidateController.delete);

routes.get("/election-polls", ElectionPollController.index);
routes.post("/election-polls", ElectionPollController.create);
routes.put("/election-polls/:id", ElectionPollController.update);
routes.delete("/election-polls/:id", ElectionPollController.delete);

routes.get("/elections", ElectionController.index);
routes.post("/elections", ElectionController.create);
routes.put("/elections/:id", ElectionController.update);
routes.delete("/elections/:id", ElectionController.delete);

routes.get("/surveys", SurveyController.index);
routes.post("/surveys", SurveyController.create);
routes.put("/surveys/:id", SurveyController.update);
routes.delete("/surveys/:id", SurveyController.delete);

export default routes;

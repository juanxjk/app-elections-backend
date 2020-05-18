import GenericRepository from "./GenericRepository";
import Survey from "../models/Survey";

export default class SurveyRepository extends GenericRepository<Survey> {
  constructor() {
    super(Survey);
  }
}

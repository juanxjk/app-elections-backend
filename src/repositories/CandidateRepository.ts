import GenericRepository from "./GenericRepository";
import Candidate from "../models/Candidate";

export default class CandidateRepository extends GenericRepository<Candidate> {
  constructor() {
    super(Candidate);
  }
}

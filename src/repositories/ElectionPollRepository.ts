import GenericRepository from "./GenericRepository";
import ElectionPoll from "../models/ElectionPoll";

export default class ElectionPollRepository extends GenericRepository<
  ElectionPoll
> {
  constructor() {
    super(ElectionPoll);
  }
}

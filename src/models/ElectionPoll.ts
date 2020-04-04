import User from "./User";
import Election from "./Election";

export enum ElectionPollStatus {
  Running = "running",
  Done = "done"
}

export default class ElectionPoll {
  public id?: number;
  public status!: ElectionPollStatus;
  public startDate!: Date;
  public endDate?: Date;
  public election!: Election;
  public createdBy!: User;
}

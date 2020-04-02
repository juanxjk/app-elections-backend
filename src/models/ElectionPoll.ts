enum ElectionPollStatus {
  Running = "running",
  Done = "done"
}

class ElectionPoll {
  public id?: number;
  public status!: ElectionPollStatus;
  public startDate!: Date;
  public endDate?: Date;
  public election!: Election;
  public createdBy!: User;
}

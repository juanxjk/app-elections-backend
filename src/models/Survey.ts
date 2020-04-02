enum ApprovalType {
  Good = "good",
  Normal = "normal",
  Bad = "bad"
}

class Survey {
  public id?: number;
  public approvalType!: ApprovalType;
  public favoritedCandidate!: Candidate;
  public notFavoritedCandidate!: Candidate;
  public surveyDate!: Date;
  public latitude?: number;
  public longitude?: number;
  public electionPoll!: ElectionPoll;
  public createdBy!: User;
}

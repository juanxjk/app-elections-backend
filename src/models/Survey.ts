import User from "./User";
import Candidate from "./Candidate";
import ElectionPoll from "./ElectionPoll";

export enum ApprovalType {
  Good = "good",
  Normal = "normal",
  Bad = "bad"
}

export default class Survey {
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

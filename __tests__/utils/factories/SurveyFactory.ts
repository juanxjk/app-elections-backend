import faker from "faker";
import Survey, { ApprovalType } from "../../../src/models/Survey";
import Candidate from "../../../src/models/Candidate";
import ElectionPoll from "../../../src/models/ElectionPoll";
import User from "../../../src/models/User";

export const makeSurvey = (
  favCandidate: Candidate,
  notFavCandidate: Candidate,
  electionPoll: ElectionPoll,
  user: User,
  attrs?: Partial<Survey>
): Survey => {
  const survey = new Survey();

  survey.id = attrs?.id ?? faker.random.uuid();
  survey.approvalType =
    attrs?.approvalType ??
    faker.random.arrayElement(Object.values(ApprovalType));
  survey.favoritedCandidate = attrs?.favoritedCandidate ?? favCandidate;
  survey.notFavoritedCandidate =
    attrs?.notFavoritedCandidate ?? notFavCandidate;
  survey.surveyDate = attrs?.surveyDate ?? faker.date.recent();
  survey.latitude = attrs?.latitude ?? faker.random.number();
  survey.longitude = attrs?.longitude ?? faker.random.number();
  survey.electionPoll = attrs?.electionPoll ?? electionPoll;
  survey.createdBy = attrs?.createdBy ?? user;

  return survey;
};

import { ElectionPollStatus } from "./../../../src/models/ElectionPoll";
import faker from "faker";
import ElectionPoll from "../../../src/models/ElectionPoll";
import Election from "../../../src/models/Election";
import User from "../../../src/models/User";

export const makeElectionPoll = (
  election: Election,
  user: User,
  attrs?: Partial<ElectionPoll>
): ElectionPoll => {
  const electionPoll = new ElectionPoll();

  electionPoll.id = attrs?.id ?? faker.random.uuid();
  electionPoll.status =
    attrs?.status ??
    faker.random.arrayElement(Object.values(ElectionPollStatus));
  electionPoll.startDate = attrs?.startDate ?? faker.date.recent();
  electionPoll.endDate =
    attrs?.endDate ?? faker.date.future(0, electionPoll.startDate);
  electionPoll.election = attrs?.election ?? election;
  electionPoll.createdBy = attrs?.createdBy ?? user;

  return electionPoll;
};

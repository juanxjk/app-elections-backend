import faker from "faker";
import Candidate from "../../../src/models/Candidate";
import Election from "../../../src/models/Election";

export const makeCandidate = (
  election: Election,
  attrs?: Partial<Candidate>
): Candidate => {
  const candidate = new Candidate();

  candidate.id = attrs?.id ?? faker.random.uuid();
  candidate.name = attrs?.name ?? faker.name.findName();
  candidate.election = attrs?.election ?? election;
  candidate.party = attrs?.party ?? faker.hacker.abbreviation();
  candidate.voteNumber =
    attrs?.voteNumber ?? faker.random.number({ min: 10, max: 99 });
  candidate.avatarURL = attrs?.avatarURL ?? faker.internet.avatar();

  return candidate;
};

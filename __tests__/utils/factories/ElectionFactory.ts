import faker from "faker";
import Election from "../../../src/models/Election";

export const makeElection = (attrs?: Partial<Election>): Election => {
  const election = new Election();

  election.id = attrs?.id ?? faker.random.uuid();
  election.year = attrs?.year ?? faker.random.arrayElement([2012, 2016, 2020]);
  election.round = attrs?.round ?? faker.random.number({ min: 1, max: 2 });

  return election;
};

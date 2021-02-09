import Election from "../models/Election";
import GenericRepository from "./GenericRepository";

export default class ElectionRepository extends GenericRepository<Election> {
  constructor() {
    super(Election);
  }
}

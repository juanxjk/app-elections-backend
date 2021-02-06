import { Request, Response } from "express";
import ElectionPollRepository from "../repositories/ElectionPollRepository";
import { getPagination } from "./utils/queryFilters";
import ElectionPoll from "../models/ElectionPoll";

const repository = new ElectionPollRepository();

export default {
  async index(req: Request, res: Response) {
    try {
      const { page, size, deleted } = req.query;
      const { relations } = req.query;

      const { skip, take } = getPagination(+page, +size);

      const electionPolls = await repository.findAll({
        skip,
        take,
        withDeleted: deleted === "true" ? true : false,
        relations:
          relations === "true"
            ? ["createdBy", "election", "surveys"]
            : undefined,
        loadRelationIds: relations !== "true" ? true : false,
      });

      return res.json({ success: true, data: electionPolls });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const foundElectionPoll = await repository.findByID(id, {
        relations: ["createdBy", "election", "surveys"],
      });

      return res.json({ success: true, data: foundElectionPoll });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const rawElectionPoll = req.body;

      const electionPoll = Object.assign(new ElectionPoll(), rawElectionPoll);

      const createdElectionPoll = await repository.create(electionPoll);

      return res.status(201).json({ success: true, data: createdElectionPoll });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) res.json({ success: false, error: "It doesn't have ID" });

      const rawElectionPoll = req.body;
      if (!rawElectionPoll) res.json({ success: false, error: "Invalid body" });

      const electionPoll = Object.assign(new ElectionPoll(), rawElectionPoll);

      const updatedElectionPoll = await repository.update(id, electionPoll);

      res.json({ success: true, data: updatedElectionPoll });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      repository.delete(id);
      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
};

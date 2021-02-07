import { Request, Response } from "express";
import CandidateRepository from "../repositories/CandidateRepository";
import Candidate from "../models/Candidate";

const repository = new CandidateRepository();

export default {
  async index(req: Request, res: Response) {
    try {
      const { page, size, deleted } = req.query;
      const { relations } = req.query;

      const candidates = await repository.findAll({
        page: +page,
        size: +size,
        withDeleted: deleted === "true" ? true : false,
        relations: relations === "true" ? ["election"] : undefined,
        loadRelationIds: relations !== "true" ? true : false,
      });

      return res.json({ success: true, data: candidates });
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

      const foundCandidate = await repository.findByID(id, {
        relations: ["election"],
      });

      return res.json({ success: true, data: foundCandidate });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const rawCandidate = req.body;

      const candidate = Object.assign(new Candidate(), rawCandidate);

      const createdCandidate = await repository.create(candidate);

      return res.status(201).json({ success: true, data: createdCandidate });
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

      const rawCandidate = req.body;
      if (!rawCandidate) res.json({ success: false, error: "Invalid body" });

      const candidate = Object.assign(new Candidate(), rawCandidate);

      const updatedCandidate = await repository.update(id, candidate);

      res.json({ success: true, data: updatedCandidate });
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

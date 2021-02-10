import { Request, Response } from "express";
import ElectionRepository from "../repositories/ElectionRepository";
import Election from "../models/Election";

const repository = new ElectionRepository();

export default {
  async index(req: Request, res: Response) {
    try {
      const { page, size, deleted } = req.query as {
        [key: string]: string;
      };

      const elections = await repository.findAll({
        page: +page,
        size: +size,
        withDeleted: deleted === "true" ? true : false,
      });

      return res.json({ success: true, data: elections });
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

      const foundElection = await repository.findByID(id);

      return res.json({ success: true, data: foundElection });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const rawElection = req.body;

      const election = Object.assign(new Election(), rawElection);

      const createdElection = await repository.create(election);

      return res.status(201).json({ success: true, data: createdElection });
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

      const rawElection = req.body;
      if (!rawElection) res.json({ success: false, error: "Invalid body" });

      const election = Object.assign(new Election(), rawElection);

      const updatedElection = await repository.update(id, election);

      res.json({ success: true, data: updatedElection });
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

import { Request, Response } from "express";
import User from "../models/User";
import UserRepository from "../repositories/UserRepository";
import { getPagination } from "./utils/queryFilters";

const repository = new UserRepository();

export default {
  async index(req: Request, res: Response) {
    try {
      const { page, size, deleted } = req.query;

      const { skip, take } = getPagination(+page, +size);

      const users = await repository.findAll({
        skip,
        take,
        withDeleted: deleted === "true" ? true : false,
      });

      return res.json({ success: true, data: users });
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

      const foundUser = await repository.findByID(id);

      return res.json({ success: true, data: foundUser });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const rawUser = req.body;

      const user = Object.assign(new User(), rawUser);

      const createdUser = await repository.create(user);

      return res.json({ success: true, data: createdUser });
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

      const rawUser = req.body;
      if (!rawUser) res.json({ success: false, error: "Invalid body" });

      const user = Object.assign(new User(), rawUser);

      const updatedUser = await repository.update(id, user);

      res.json({ success: true, data: updatedUser });
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

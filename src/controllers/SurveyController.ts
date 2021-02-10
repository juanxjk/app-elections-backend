import { Request, Response } from "express";
import SurveyRepository from "../repositories/SurveyRepository";
import Survey from "../models/Survey";

const repository = new SurveyRepository();

export default {
  async index(req: Request, res: Response) {
    try {
      const { page, size, deleted } = req.query as {
        [key: string]: string;
      };
      const { relations } = req.query;

      const surveys = await repository.findAll({
        page: +page,
        size: +size,
        withDeleted: deleted === "true" ? true : false,
        relations:
          relations === "true"
            ? [
                "createdBy",
                "electionPoll",
                "favoritedCandidate",
                "notFavoritedCandidate",
              ]
            : undefined,
        withRelations: relations !== "true" ? true : false,
      });

      return res.json({ success: true, data: surveys });
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

      const foundSurvey = await repository.findByID(id, {
        relations: [
          "createdBy",
          "electionPoll",
          "favoritedCandidate",
          "notFavoritedCandidate",
        ],
      });

      return res.json({ success: true, data: foundSurvey });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Error 500" });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const rawSurvey = req.body;

      const survey = Object.assign(new Survey(), rawSurvey);

      const createdSurvey = await repository.create(survey);

      return res.status(201).json({ success: true, data: createdSurvey });
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

      const rawSurvey = req.body;
      if (!rawSurvey) res.json({ success: false, error: "Invalid body" });

      const survey = Object.assign(new Survey(), rawSurvey);

      const updatedSurvey = await repository.update(id, survey);

      res.json({ success: true, data: updatedSurvey });
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

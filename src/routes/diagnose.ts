import { Router } from "express";

import diagnoseService from "../services/diagnoseService";

const diagnosesRouter = Router()

diagnosesRouter.get('/', (_req, res) => {
  res.json(diagnoseService.getDiagnoses())
})

export default diagnosesRouter

import { Router } from "express";

import diagnoseService from "../services/diagnoseService";

const router = Router()

router.get('/', (_req, res) => {
  res.json(diagnoseService.getDiagnoses())
})

export default router

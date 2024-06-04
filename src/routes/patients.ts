import { Router } from "express";
import { getPatients } from "../services/patientsService";

const patientsRouter = Router()

patientsRouter.get('/', (_req, res) => {
  res.json(getPatients())
})

export default patientsRouter

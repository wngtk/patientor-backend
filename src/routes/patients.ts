import { Router } from "express";
import { addPatient, getPatients } from "../services/patientsService";
import toNewPatient from "../utils";

const patientsRouter = Router()

patientsRouter.get('/', (_req, res) => {
  res.json(getPatients())
})

patientsRouter.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body)
  res.json(addPatient(newPatient))
})

export default patientsRouter

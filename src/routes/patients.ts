import { Router } from "express";
import toNewPatient from "../utils";
import patientsService from "../services/patientsService";

const patientsRouter = Router()

patientsRouter.get('/', (_req, res) => {
  res.json(patientsService.getPatients())
})

patientsRouter.get('/:id', (req, res) => {
  res.json(patientsService.findById(req.params.id))
})

patientsRouter.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body)
  res.json(patientsService.addPatient(newPatient))
})

export default patientsRouter

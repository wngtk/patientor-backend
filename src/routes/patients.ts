import { Router } from "express";
import toNewPatient from "../utils";
import patientsService from "../services/patientsService";
import { toNewEntry } from "./utils";

const patientsRouter = Router()

patientsRouter.get('/', (_req, res) => {
  res.json(patientsService.getPatients())
})

patientsRouter.get('/:id', (req, res) => {
  res.json(patientsService.findById(req.params.id))
})

patientsRouter.post('/:id/entries', (req, res) => {
  const patient = patientsService.findById(req.params.id)
  res.json(patientsService.addEntry(patient, toNewEntry(req.body)))
})

patientsRouter.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body)
  res.json(patientsService.addPatient(newPatient))
})

export default patientsRouter

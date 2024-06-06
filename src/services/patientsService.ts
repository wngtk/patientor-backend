import { NewPatient, Patient, PatientWithoutSSN } from "../types";
import { v1 as uuid } from 'uuid'
import { default as data } from "../../data/patients-full";

const patients = data.map(e => e)

const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(p => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {ssn: _, ...rest} = p
    return rest
  })
}

const findById = (id: string): Patient => {
  const res = patients.find(p => p.id === id)
  if (!res) {
    throw new Error(`${id} not exists`)
  }
  return res
}

const addPatient= (newPatient: NewPatient): PatientWithoutSSN => {
  const result = {...newPatient, id: uuid()}
  patients.push(result)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {ssn: _, ...rest} = result
  return rest
}

export default {
  getPatients,
  findById,
  addPatient
}
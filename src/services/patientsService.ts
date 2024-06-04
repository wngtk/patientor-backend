import data from "../../data/patients";
import { NewPatient, Patient, PatientWithoutSSN } from "../types";
import { v1 as uuid } from 'uuid'
import toNewPatient from "../utils";

const patients = data.map(e => {
  const object = toNewPatient(e) as Patient
  object.id = e.id
  return object
})

export const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(p => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {ssn: _, ...rest} = p
    return rest
  })
}

export const addPatient= (newPatient: NewPatient): PatientWithoutSSN => {
  const result = {...newPatient, id: uuid()}
  patients.push(result)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {ssn: _, ...rest} = result
  return rest
}

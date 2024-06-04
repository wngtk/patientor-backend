import data from "../../data/patients";
import { NewPatient, PatientWithoutSSN } from "../types";
import { v1 as uuid } from 'uuid'

const patients = data

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

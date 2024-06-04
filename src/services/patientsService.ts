import data from "../../data/patients";
import { PatientWithoutSSN } from "../types";

const patients = data

export const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(p => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {ssn: _, ...rest} = p
    return rest
  })
}

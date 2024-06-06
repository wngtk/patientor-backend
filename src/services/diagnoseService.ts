import data from "../../data/diagnoses"
import { Diagnosis } from "../types"

const diagnoses = data

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses
}

export default {
  getDiagnoses
}

import data from "../../data/diagnoses"
import { Diagnose } from "../types"

const diagnoses = data

const getDiagnoses = (): Diagnose[] => {
  return diagnoses
}

export default {
  getDiagnoses
}

import { NewPatient } from "./types"

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name')
  }
  return name
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth')
  }
  return dateOfBirth
}

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }
  return ssn
}

const parseGender = (gender: unknown): string => {
  if (!isString(gender)) {
    throw new Error('Incorrect or missing gender')
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }
  return occupation
}


const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('gender' in object && 'occupation' in object && 'ssn' in object && 'name' in object && 'dateOfBirth' in object) {
    return {
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    }
  }
  throw new Error('Incorrect data: a field missing')
}

export default toNewPatient
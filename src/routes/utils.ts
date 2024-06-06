import { Diagnosis, EntryWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "src/types";

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isEntryType = (type: string): type is EntryWithoutId['type'] => {
  return true
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date')
  }
  return date
}

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description')
  }
  return description
}

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName')
  }
  return employerName
}

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist')
  }
  return specialist
}

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } => {
  if (typeof sickLeave === 'object' && 'startDate' in sickLeave && 'endDate' in sickLeave) {
    return {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate)
    }
  }
  throw new Error('Incorrect or missing sickLeave')
}

const parseOccupation = (object: object): Omit<OccupationalHealthcareEntry, 'id'> => {
  if ('date' in object && 'description' in object
   && 'employerName' in object 
   &&'specialist' in object
  ) {
    return {
      type: "OccupationalHealthcare",
      date: parseDate(object.date),
      description: parseDescription(object.description),
      employerName: parseEmployerName(object.employerName),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : [],
      sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined
    }
  }
  throw new Error('Incorrect data: a field missing')
}

const parseDischarge = (object: unknown): { date: string, criteria: string } => {
  if (typeof object === 'object' && 'date' in object && 'criteria' in object && isString(object.criteria) && isString(object.date)) {
    return {
      date: object.date,
      criteria: object.criteria
    }
  }
  throw new Error('Incorrect or missing discharge')
}

const parseHospital = (object: object): Omit<HospitalEntry, 'id'> => {
  if ('date' in object && 'description' in object && 'discharge' in object && 'specialist' in object) {
    return {
      type: "Hospital",
      date: parseDate(object.date),
      description: parseDescription(object.description),
      discharge: parseDischarge(object.discharge),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : [],
    }
  }
  throw new Error('Incorrect data: a field missing')
}

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (typeof healthCheckRating === 'number') {
    return healthCheckRating
  }
  throw new Error('Incorrect or missing healthCheckRating')
}

const parseHealthCheck = (object: object): Omit<HealthCheckEntry, 'id'> => {
  if ('date' in object && 'description' in object && 'healthCheckRating' in object && 'specialist' in object) {
    return {
      type: "HealthCheck",
      date: parseDate(object.date),
      description: parseDescription(object.description),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : [],
    }
  }
  throw new Error('Incorrect data: a field missing')
}

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect data: a field missing')
  }

  if (!isString(object.type) || !isEntryType(object.type)) {
    throw new Error('Incorrect data: a field missing')
  }

  switch (object.type) {
    case "OccupationalHealthcare":
      return parseOccupation(object)
    case "Hospital":
      return parseHospital(object)
    case "HealthCheck":
      return parseHealthCheck(object)
  }
}

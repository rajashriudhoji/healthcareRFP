const pool = require('../db');
const queries = require('./queries');

const getPatient = (req, res) => {
  pool.query(queries.getPatient, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  })
};

const addPatientFollowUpAppointments = (patient_id, folowUpAppointments) => {
  const {pFollowupAppointment, childFollowupAppointment} = folowUpAppointments;

  pool.query(queries.addPatientFollowUpAppointments, [patient_id, pFollowupAppointment, childFollowupAppointment], (error, result) => {
    if (error) throw error;
    return result;
  });
};

const addPatientVisit = (patient_id, patientVisit) => {
  const {dateOfService, vitalSigns, smokeStatus} = patientVisit;

  pool.query(queries.addPatientVisit, [patient_id, dateOfService, vitalSigns, smokeStatus], (error, result) => {
    if (error) throw error;
    return result;
  });
};

const addPatientBreastFeeding = (patient_id, patientBreastFeeding) => {

  const {isBreastfeeding, feedLength, feedFrequency, supplimentFormula,
    feedingComfort, isNippleCracked} = patientBreastFeeding;

  pool.query(queries.addPatientBreastFeeding, [patient_id, isBreastfeeding, feedLength,
    feedFrequency, supplimentFormula, feedingComfort, isNippleCracked], (error, result) => {
      if (error) throw error;
      return result;
  });
};

const addPatientSafeSpacing = (patient_id, patientSafeSpacing) => {
  const {birthControl, birthControlAssess} = patientSafeSpacing;

  pool.query(queries.addPatientSafeSpacing, [patient_id, birthControl, birthControlAssess], (error, result) => {
    if (error) throw error;
    return result;
  });
};

const addPatientPsychoSocialAssess = (patient_id, patientPsychoSocialAssess) => {
  const {relationWithBaby, houseMemberStatus, fatherStatus,
    safety, unsafeRelationStatus, resourceStatus} = patientPsychoSocialAssess;

  pool.query(queries.addPatientPsychoSocialAssess, [patient_id, relationWithBaby, houseMemberStatus, fatherStatus,
    safety, unsafeRelationStatus, resourceStatus], (error, result) => {
      if (error) throw error;
      return result;
  });
};

const addPatientEducationalMaterial = (patient_id, patientEducationalMaterial) => {
  const {depressionScreening, contraceptionMethod, peripheralBloodGlucose,
    doctorAppointment, carSeatSafety, immunizationSchedule, breastFeeding,
    infantSafety, familyPlanning, checkups, details} = patientEducationalMaterial;

  pool.query(queries.addPatientEducationalMaterial, [patient_id, depressionScreening, contraceptionMethod, peripheralBloodGlucose,
    doctorAppointment, carSeatSafety, immunizationSchedule, breastFeeding,
    infantSafety, familyPlanning, checkups, details], (error, result) => {
      if (error) throw error;
      return result;
  });
};

const addPatient = async(req, res) => {
  try{
    const {patientBasicInfo:{motherName, babyName, babyDOB, address, email, phone, babyGender},
      folowUpAppointments, patientVisit, patientBreastFeeding, patientSafeSpacing,
      patientPsychoSocialAssess, patientEducationalMaterial} = req.body;

    //TODO: write middleware to validate input.
    const patient = await pool.query(queries.addPatient, [motherName, babyName, babyDOB, address, email, phone, babyGender]);
    const patient_id = patient.rows.length ? patient.rows[0].patient_id : 0;
    if(patient_id){
      addPatientFollowUpAppointments(patient_id, folowUpAppointments);
      addPatientVisit(patient_id, patientVisit);
      addPatientBreastFeeding(patient_id, patientBreastFeeding);
      addPatientSafeSpacing(patient_id, patientSafeSpacing);
      addPatientPsychoSocialAssess(patient_id, patientPsychoSocialAssess);
      addPatientEducationalMaterial(patient_id, patientEducationalMaterial);
    }

    res.json({
      patient: patient.rows[0],
    });
  } catch(err){
    console.log('error',err);
    res.status(500);
  }
};

module.exports = {
  getPatient,
  addPatient,
};
import { fetcher, fetcherFile } from './fetcher';

const getRequest = url => fetcher(url, 'GET', null);
const putRequest = url => body => fetcher(url, 'PUT', body);
const postRequest = url => body => fetcher(url, 'POST', body);

/* SurveyUnit's data */
const getSuData = apiUrl => id => getRequest(`${apiUrl}/api/survey-unit/${id}`);
const putSuData = apiUrl => id => body =>
  putRequest(`${apiUrl}/api/survey-unit/${id}`)(body);

const putData = apiUrl => id => body =>
  putRequest(`${apiUrl}/api/survey-unit/${id}/data`)(body);

const putStateData = apiUrl => id => body =>
  putRequest(`${apiUrl}/api/survey-unit/${id}/state-data`)(body);

/* Questionnaire's resource */
const getQuestionnaire = apiUrl => id =>
  getRequest(`${apiUrl}/api/questionnaire/${id}`);

const getRequiredNomenclatures = apiUrl => id =>
  getRequest(`${apiUrl}/api/questionnaire/${id}/required-nomenclatures`);

const getNomenclature = apiUrl => id =>
  getRequest(`${apiUrl}/api/nomenclature/${id}`);

const getMetadata = apiUrl => id =>
  getRequest(`${apiUrl}/api/questionnaire/${id}/metadata`);

const getDepositProof = apiUrl => id =>
  fetcherFile(`${apiUrl}/api/survey-unit/${id}/deposit-proof`);

/* Paradata */
const postParadata = apiUrl => body =>
  postRequest(`${apiUrl}/api/paradata`)(body);

export const API = {
  getRequest,
  getSuData,
  putSuData,
  getQuestionnaire,
  getRequiredNomenclatures,
  getNomenclature,
  getMetadata,
  getDepositProof,
  postParadata,
  putData,
  putStateData,
};

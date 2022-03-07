import { AppContext } from 'App';
import { errorDictionary } from 'i18n';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API } from 'utils/api';
import { DEFAULT_DATA_URL, DEFAULT_METADATA_URL } from 'utils/constants';
import { getFetcherForLunatic } from 'utils/api/fetcher';

const getErrorMessage = (response, type = 'q') => {
  const { status } = response;
  if (status === 401) return errorDictionary.getError401;
  if (status === 403) return errorDictionary.getError403(type);
  if (status === 404) return errorDictionary.getError404(type);
  if (status >= 500 && status < 600) return errorDictionary.getErrorServeur;
  return errorDictionary.getUnknownError;
};

export const useLunaticFetcher = () => {
  const lunaticFetcher = (url, options) => {
    return getFetcherForLunatic(url, options);
  };

  return { lunaticFetcher };
};

export const useAPI = (surveyUnitID, questionnaireID) => {
  const { apiUrl } = useContext(AppContext);

  const getRequiredNomenclatures = useCallback(() => {
    return API.getRequiredNomenclatures(apiUrl)(questionnaireID);
  }, [questionnaireID, apiUrl]);

  const getNomenclature = useCallback(() => {
    return API.getNomenclature(apiUrl)(questionnaireID);
  }, [questionnaireID, apiUrl]);

  const getQuestionnaire = useCallback(() => {
    return API.getQuestionnaire(apiUrl)(questionnaireID);
  }, [questionnaireID, apiUrl]);

  const getMetadata = useCallback(() => {
    return API.getMetadata(apiUrl)(questionnaireID);
  }, [questionnaireID, apiUrl]);

  const getSuData = useCallback(() => {
    return API.getSuData(apiUrl)(surveyUnitID);
  }, [surveyUnitID, apiUrl]);

  const getPDF = useCallback(() => {
    return API.getDepositProof(apiUrl)(surveyUnitID);
  }, [surveyUnitID, apiUrl]);

  const putSuData = useCallback(
    body => {
      return API.putSuData(apiUrl)(surveyUnitID)(body);
    },
    [surveyUnitID, apiUrl]
  );

  const putData = useCallback(
    body => {
      return API.putData(apiUrl)(surveyUnitID)(body);
    },
    [surveyUnitID, apiUrl]
  );

  const putStateData = useCallback(
    body => {
      return API.putStateData(apiUrl)(surveyUnitID)(body);
    },
    [surveyUnitID, apiUrl]
  );

  const postParadata = useCallback(
    body => {
      return API.postParadata(apiUrl)(body);
    },
    [apiUrl]
  );

  return {
    getRequiredNomenclatures,
    getNomenclature,
    getQuestionnaire,
    getMetadata,
    getSuData,
    getPDF,
    putSuData,
    postParadata,
    putData,
    putStateData,
  };
};

export const useAPIRemoteData = (surveyUnitID, questionnaireID) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [suData, setSuData] = useState(null);
  const [nomenclatures, setNomenclatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    getSuData,
    getRequiredNomenclatures,
    getQuestionnaire,
    getMetadata,
  } = useAPI(surveyUnitID, questionnaireID);

  useEffect(() => {
    if (questionnaireID && surveyUnitID) {
      setErrorMessage(null);
      setNomenclatures(null);
      const load = async () => {
        const qR = await getQuestionnaire();
        const nR = await getRequiredNomenclatures();
        if (!qR.error) {
          setQuestionnaire(qR.data.value);
          setNomenclatures(nR.data);
          const mR = await getMetadata();
          console.log(mR);
          if (!mR.error) {
            setMetadata(mR.data);
            const dR = await getSuData();
            console.log(dR);
            if (!dR.error) {
              setSuData(dR.data);
              setLoading(false);
            } else setErrorMessage(getErrorMessage(dR, 'd'));
            debugger;
            setLoading(false);
          } else setErrorMessage(getErrorMessage(mR, 'm'));
          setLoading(false);
        } else setErrorMessage(getErrorMessage(qR, 'q'));
        setLoading(false);
      };
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyUnitID, questionnaireID]);

  return {
    loading,
    errorMessage,
    suData,
    questionnaire,
    metadata,
    nomenclatures,
  };
};

export const useRemoteData = (questionnaireUrl, metadataUrl, dataUrl) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [suData, setSuData] = useState(null);
  const [nomenclatures, setNomenclatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (questionnaireUrl) {
      setErrorMessage(null);
      setQuestionnaire(null);
      setNomenclatures(null);
      setSuData(null);
      const load = async () => {
        const qR = await API.getRequest(questionnaireUrl);
        if (!qR.error) {
          setQuestionnaire(qR.data);
          setNomenclatures([]); // fake nomenclatures for vizu
          const mR = await API.getRequest(metadataUrl || DEFAULT_METADATA_URL);
          if (!mR.error) {
            setMetadata(mR.data);
            const dR = await API.getRequest(dataUrl || DEFAULT_DATA_URL);
            if (!dR.error) {
              setSuData(dR.data);
              setLoading(false);
            } else setErrorMessage(getErrorMessage(dR, 'd'));
            setLoading(false);
          } else setErrorMessage(getErrorMessage(mR, 'm'));
          setLoading(false);
        } else setErrorMessage(getErrorMessage(qR, 'q'));
        setLoading(false);
      };
      load();
    }
  }, [questionnaireUrl, metadataUrl, dataUrl]);

  return {
    loading,
    errorMessage,
    suData,
    questionnaire,
    metadata,
    nomenclatures,
  };
};

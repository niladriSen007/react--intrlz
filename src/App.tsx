import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const fetchTranslations = async (lang: string) => {
  try {
    const response = await axios.get(`https://bucket-for-i18.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${lang}.json`);
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching translations:', error);
    return {};
  }
};

const App: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { changeLanguage } = i18n;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      const lang = i18n.language || 'en';
      const translations = await fetchTranslations(lang);
      console.log(translations,"translations")
     /*  i18n.addResourceBundle(lang, 'translation', translations); */
      setLoading(false);
    };

    loadTranslations();
  }, [i18n]);

  const changelanguage = (lang: string) => {
    console.log(lang,"selected language")
    changeLanguage(lang);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <select onChange={(e) => changelanguage(e.target.value)} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  );
};

export default App;
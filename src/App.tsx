import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from './Language Provider';



const App: React.FC = () => {
  const { i18n } = useTranslation();


  const { language, setLanguage, loading, pageData, fetchTranslations } = useLanguageContext();




  useEffect(() => {
    fetchTranslations(language);
  }, []);

  const changelanguage = async (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value, "selected language")
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
    fetchTranslations(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pageData['welcome']}</h1>
      <select onChange={changelanguage} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="fr">French</option>
        <option value="ir">Irish</option>
      </select>
    </div>
  );
};

export default App;
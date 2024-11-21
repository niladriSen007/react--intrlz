import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import axios from "axios";
export const LanguageContext = createContext({})


type LanguageContextType = {
  language: string,
  setLanguage: (language: string) => void,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  pageData: any,
  setPageData: (pageData: any) => void,
  fetchTranslations: (lang: string) => void
};


export const LanguageContextProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(i18n.language === 'en-US' ? 'en' : i18n.language);
  const [loading, setLoading] = useState(true);

  const [pageData, setPageData] = useState<any>({});


  const fetchTranslations = async (lang: string) => {
    try {
      const response = await axios.get(`https://bucket-for-i18.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${lang}.json`);
      console.log(response?.data);
      setPageData(response?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching translations:', error);
      return {};
    }
  };


  return <LanguageContext.Provider value={{ language, setLanguage, loading, setLoading, pageData, setPageData, fetchTranslations }}>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      {children}
    </I18nextProvider>
  </LanguageContext.Provider>
}


export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  return context as LanguageContextType;
};

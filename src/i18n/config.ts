import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LanguageCodes } from "../constants/languages/language-codes";

const isDevelopmentMode = process.env.NODE_ENV === "development";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LanguageCodes.English,
    supportedLngs: Object.values(LanguageCodes),
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
    debug: isDevelopmentMode,
  });

export default i18n;

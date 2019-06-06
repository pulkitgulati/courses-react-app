import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en";
import fr from "../locales/fr";
import it from "../locales/it";
import de from "../locales/de";
import es from "../locales/es";
i18n.use(initReactI18next).init({
  resources: {
    en,
    fr,
    it,
    de,
    es
  },
  fallbackLng: "en",
  debug: true,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});

export default i18n;

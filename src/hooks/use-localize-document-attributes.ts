import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useLocalizeDocumentAttributes() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.resolvedLanguage) {
      // Set the <html lang> attribute.
      document.documentElement.lang = i18n.resolvedLanguage;

      // Set the <html dir> attribute.
      document.documentElement.dir = i18n.dir(i18n.resolvedLanguage);
    }

    // 👇 Localize document title.
    document.title = t("app_title");
  }, [i18n, i18n.resolvedLanguage, t]);
}

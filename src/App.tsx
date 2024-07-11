import React, { useEffect } from "react";
import styles from "./App.module.scss";
import useLocalizeDocumentAttributes from "./hooks/use-localize-document-attributes";
import { Outlet, useNavigate } from "react-router-dom";
import { localStorageService } from "./services/common/local-storage.service";
import { LocalStorageKeys } from "./constants/misc/locale-storage-keys";
import { Steps } from "./constants/misc/steps";

function App() {
  const navigate = useNavigate();

  useLocalizeDocumentAttributes();

  useEffect(() => {
    const currentStep =
      localStorageService.getItem(LocalStorageKeys.CurrentStep) || Steps.Quiz;

    const currentQuizQuestion =
      localStorageService.getItem(LocalStorageKeys.CurrentQuizQuestion) || 1;

    navigate(
      `/${currentStep}/${currentStep === Steps.Quiz ? currentQuizQuestion : ""}`,
    );
  }, [navigate]);

  return (
    <div className={styles.App}>
      <Outlet />
    </div>
  );
}

export default App;

import styles from "./ResultsPage.module.scss";
import { useTranslation } from "react-i18next";
import checkmarkImg from "../../assets/images/checkmark.png";
import donwloadImg from "../../assets/images/download.png";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/common/local-storage.service";
import { LocalStorageKeys } from "../../constants/misc/locale-storage-keys";
import { Steps } from "../../constants/misc/steps";
import { AppRoutes } from "../../constants/routing/app-routes";
import { getCSVAnswers } from "../../utils/get-CSV-answers";
import { dbInstance } from "../../services/common/db.service";

export default function ResultsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const downloadAnswers = () => {
    const rows = getCSVAnswers();

    let csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  const retakeQuiz = () => {
    localStorageService.setItem(LocalStorageKeys.CurrentStep, Steps.Quiz);
    localStorageService.setItem(LocalStorageKeys.CurrentQuizQuestion, "1");
    dbInstance.dropAnswers();
    navigate(`/${AppRoutes.quiz}/1`);
  };

  return (
    <div className={styles.ResultsPage}>
      <header className={styles.header}>
        <h3 className={styles.title}>{t("results.title")}</h3>
        <p className={styles.subtitle}>{t("results.subtitle")}</p>
      </header>

      <main className={styles.main}>
        <img src={checkmarkImg} alt="" className={styles.image} />
      </main>

      <footer className={styles.footer}>
        <Button onClick={downloadAnswers} variant="text">
          <img src={donwloadImg} alt="" /> {t("results.download_btn")}
        </Button>
        <Button onClick={retakeQuiz} variant="filled">
          {t("results.retake_btn")}
        </Button>
      </footer>
    </div>
  );
}

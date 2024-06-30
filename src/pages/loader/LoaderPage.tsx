import styles from "./LoaderPage.module.scss";
import CircularProgress from "../../components/circular-progress/CircularProgress";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routing/app-routes";
import { localStorageService } from "../../services/common/local-storage.service";
import { LocalStorageKeys } from "../../constants/misc/locale-storage-keys";
import { Steps } from "../../constants/misc/steps";

export default function LoaderPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLoaded = () => {
    setTimeout(() => {
      localStorageService.setItem(LocalStorageKeys.CurrentStep, Steps.Email);
      navigate(`/${AppRoutes.email}`);
    }, 150);
  };

  return (
    <main className={styles.main}>
      <CircularProgress size={250} onLoaded={onLoaded} />
      <p className={styles.text}>{t("loader.text")}</p>
    </main>
  );
}

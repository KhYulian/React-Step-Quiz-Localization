import styles from "./EmailPage.module.scss";
import React from "react";
import Button from "../../components/button/Button";
import { Trans, useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "../../constants/regex/email.regex";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routing/app-routes";
import { localStorageService } from "../../services/common/local-storage.service";
import { LocalStorageKeys } from "../../constants/misc/locale-storage-keys";
import { Steps } from "../../constants/misc/steps";
import { dbInstance } from "../../services/common/db.service";
import { AnswerTypes } from "../../constants/misc/answer-types";

enum EmailFormFields {
  Email = "email",
}

interface EmailForm {
  [EmailFormFields.Email]: string;
}

export default function EmailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<EmailForm> = (data) => {
    localStorageService.setItem(LocalStorageKeys.CurrentStep, Steps.Results);
    dbInstance.saveAnswer({
      order: 6,
      answer: data[EmailFormFields.Email],
      title: t("email.title"),
      type: AnswerTypes.Email,
    });
    navigate(`/${AppRoutes.results}`);
  };

  return (
    <div className={styles.EmailPage}>
      <header className={styles.header}>
        <h3 className={styles.title}>{t("email.title")}</h3>
        <p className={styles.subtitle}>{t("email.subtitle")}</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <main className={styles.main}>
          <div className={styles.control}>
            <Input
              placeholder={t("email.input_placeholder")}
              inputProps={{
                ...register(EmailFormFields.Email, {
                  required: {
                    value: true,
                    message: t("validation.email.required"),
                  },
                  pattern: {
                    value: emailPattern,
                    message: t("validation.email.pattern"),
                  },
                }),
              }}
              error={!!errors[EmailFormFields.Email]}
              errorText={errors[EmailFormFields.Email]?.message}
            />
          </div>
          <div className={styles.policy}>
            <Trans i18nKey="email.policy">
              By continuing I agree with
              <a
                href="https://www.wikiwand.com/en/Privacy_policy"
                target="_blank"
                rel="noreferrer"
              >
                Privacy policy
              </a>
              and
              <a
                href="https://www.wikiwand.com/en/Terms_of_service"
                target="_blank"
                rel="noreferrer"
              >
                Terms of use.
              </a>
            </Trans>
          </div>
        </main>

        <footer className={styles.footer}>
          <Button type="submit" variant="filled" disabled={!isValid}>
            {t("next_btn")}
          </Button>
        </footer>
      </form>
    </div>
  );
}

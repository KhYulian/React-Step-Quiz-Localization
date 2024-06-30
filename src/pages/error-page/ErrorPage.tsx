import styles from "./ErrorPage.module.scss";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import React from "react";

export default function ErrorPage() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Oops!</h1>
      <p>Sorry, an error has occurred.</p>
      <p>
        <i>{error?.statusText || "Please try again later"}</i>
      </p>
      <Link to="/">Return to the home page</Link>
    </div>
  );
}

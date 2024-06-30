import React from "react";
import App from "./App";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "./pages/error-page/ErrorPage";
import { AppRoutes } from "./constants/routing/app-routes";
import QuizPage from "./pages/quiz/QuizPage";
import LoaderPage from "./pages/loader/LoaderPage";
import EmailPage from "./pages/email/EmailPage";
import ResultsPage from "./pages/results/ResultsPage";
import Quiz1 from "./pages/quiz/quiz_1/Quiz1";
import Quiz2 from "./pages/quiz/quiz_2/Quiz2";
import Quiz3 from "./pages/quiz/quiz_3/Quiz3";
import Quiz4 from "./pages/quiz/quiz_4/Quiz4";
import Quiz5 from "./pages/quiz/quiz_5/Quiz5";
import { QuizContextProvider } from "./pages/quiz/quiz-context/QuizContext";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: AppRoutes.quiz,
        element: (
          <QuizContextProvider>
            <QuizPage />
          </QuizContextProvider>
        ),
        children: [
          { path: "1", element: <Quiz1 /> },
          { path: "2", element: <Quiz2 /> },
          { path: "3", element: <Quiz3 /> },
          { path: "4", element: <Quiz4 /> },
          { path: "5", element: <Quiz5 /> },
        ],
      },
      { path: AppRoutes.loader, element: <LoaderPage /> },
      { path: AppRoutes.email, element: <EmailPage /> },
      { path: AppRoutes.results, element: <ResultsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

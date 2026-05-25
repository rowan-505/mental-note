import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { JournalWrite } from "./pages/JournalWrite";
import { ReflectionAnalysis } from "./pages/ReflectionAnalysis";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/journal/write",
    Component: JournalWrite,
  },
  {
    path: "/journal/analysis",
    Component: ReflectionAnalysis,
  },
]);

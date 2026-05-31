import { createBrowserRouter } from "react-router";
import { AppLayout } from "./AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Insights } from "./pages/Insights";
import { JournalWrite } from "./pages/JournalWrite";
import { Mission } from "./pages/Mission";
import { Profile } from "./pages/Profile";
import { ReflectionAnalysis } from "./pages/ReflectionAnalysis";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "journal/write",
        Component: JournalWrite,
      },
      {
        path: "journal/analysis",
        Component: ReflectionAnalysis,
      },
      {
        path: "insights",
        Component: Insights,
      },
      {
        path: "mission",
        Component: Mission,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);

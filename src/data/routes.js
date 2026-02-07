import AboutPage from "@/pages/About/AboutPage";
import HomePage from "@/pages/Home/HomePage";
import ProjectsPage from "@/pages/Projects/ProjectsPage";
import BodyHealthPage from "@/pages/BodyHealth/BodyHealthPage";
import ConwayLifePage from "@/pages/ConwayLife/ConwayLifePage";

const routes = {
    home: {
        path: "/",
        element: HomePage,
    },
    about: {
        path: "/about",
        element: AboutPage,
    },
    projects: {
        path: "/projects",
        element: ProjectsPage,
    },
    bodyHealth: {
        path: "/projects/body-health",
        element: BodyHealthPage,
    },
    conwayLife: {
        path: "/conway-life",
        element: ConwayLifePage,
    },
};

export default routes;
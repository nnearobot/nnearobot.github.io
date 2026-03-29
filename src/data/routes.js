import AboutPage from "@/pages/About/AboutPage";
import HomePage from "@/pages/Home/HomePage";
import ProjectsPage from "@/pages/Projects/ProjectsPage";
import BodyHealthPage from "@/pages/BodyHealth/BodyHealthPage";
import ConwayLifePage from "@/pages/ConwayLife/ConwayLifePage";
import BinaryBirthdayPage from "@/pages/BinaryBirthday/BinaryBirthdayPage";
import VectorSpacePage from "@/pages/VectorSpace/VectorSpacePage";

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
        path: "/body-health",
        element: BodyHealthPage,
    },
    conwayLife: {
        path: "/conway-life",
        element: ConwayLifePage,
    },
    binaryBirthday: {
        path: "/binary-birthday",
        element: BinaryBirthdayPage,
    },
    vectorSpace: {
        path: "/vector-space",
        element: VectorSpacePage,
    },
};

export default routes;

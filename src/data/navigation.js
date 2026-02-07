import routes from "./routes";

const navLinks = [
    {
        id: "about",
        title: "About Me",
        url: routes.about.path
    },
    {
        id: "projects",
        title: "MyProjects",
        url: routes.projects.path
    },
];

export default navLinks;

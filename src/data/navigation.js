import routes from "./routes";

const navLinks = [
    {
        id: "about",
        title: "About",
        url: routes.about.path
    },
    {
        id: "projects",
        title: "MyProjects",
        url: routes.projects.path
    },
    {
        id: "health",
        title: "Body Health",
        url: routes.bodyHealth.path
    },
];

export default navLinks;

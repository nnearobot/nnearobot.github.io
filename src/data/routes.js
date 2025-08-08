import {
    Home, About, Projects, Dots, BodyHealth,
    //    Blog
} from '../pages';

const routes = {
    home: {
        path: "/",
        element: Home,
    },
    about: {
        path: "/about",
        element: About,
    },
    projects: {
        path: "/projects",
        element: Projects,
    },
    bodyHealth: {
        path: "/projects/body-health",
        element: BodyHealth,
    },
    dots: {
        path: "/projects/dots",
        element: Dots,
    },
    // blog: {
    //     path: "/blog",
    //     element: Blog,
    // },
};

export default routes;
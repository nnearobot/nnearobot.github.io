import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'


export const navLinks = [
    {
      id: "about",
      title: "About",
      url: "/about",
    },
    {
      id: "health",
      title: "Body Health",
      url: "/body-health"
    },
    {
      id: "dots",
      title: "Dot Fractal",
      url: "/dots"
    },
];

export const snsLinks = [
  {
    id: "linkedin",
    title: "My LinkedIn",
    label: "rimma-maksiutova",
    url: "https://www.linkedin.com/in/rimma-maksiutova/",
    icon: faLinkedin
  },
  {
    id: "github",
    title: "My GitHub",
    label: "nnearobot",
    url: "https://github.com/nnearobot",
    icon: faGithub
  },
];

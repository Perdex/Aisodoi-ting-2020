import { deployContainer } from "./apps";
import { provider } from "./clustersetup";


// deployContainer("mailhog", {
//     domain: "mailhog.aisodoi.com",
//     image: "mailhog/mailhog",
//     port: 8025,
//     release: "test",
//     replicas: 1,
// }, provider);


deployContainer("mailhog", {
    domain: "kiertotalo.us",
    image: "fransle/kiertotalous",
    port: 80,
    release: "1",
    replicas: 1,
}, provider);


deployContainer("badgerbackend", {
    domain: "backend.kiertotalo.us",
    image: "joariski/ting2020:0.1.0",
    port: 8000,
    release: "0.1.0",
    replicas: 1,
}, provider);

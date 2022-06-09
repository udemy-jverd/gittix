import axios from 'axios';

export default ({ req }) => {
    // Here we are using axios and not our custom hook 'use-request'
    // because we are in a plain function - hooks can only be used in Components
    if (typeof window === 'undefined') {
        // we are on the server
        // Here we are calling the ingress-ngninx service inside our ingress-ngninx namespace
        // because the request is done on the server side inside and not from the browser
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers // cookie is retrieved and put in the new request here
        });
    } else {
        // we must be on the client
        return axios.create({
            baseURL: '/'
        });
    }
}

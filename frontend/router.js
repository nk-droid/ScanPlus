import { Homepage } from "./components/homepage.js";
import { PredictResult } from "./components/predict_result.js";
import { Predict } from "./components/predict.js";
import { Ask } from "./components/ask.js";
import { Login } from "./components/login.js";
import { SignUp } from "./components/signup.js";
import { Dashboard } from "./components/dashboard.js";

const routes = [
    { path: '/', component: Homepage, name: 'homepage'},
    { path: '/predict_result', component: PredictResult, name: 'PredictResult', props: route => ({ data: route.query.data, image: route.query.image }) },
    { path: '/predict', component: Predict, name: 'predict'},
    { path: '/ask', component: Ask, name: 'ask'},
    { path: '/login', component: Login, name: 'login'},
    { path: '/signup', component: SignUp, name: 'signup'},
    { path: '/dashboard', component: Dashboard, name: 'dashboard'}
]

export const router = new VueRouter({
    routes
})

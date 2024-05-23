import { Homepage } from "./components/homepage.js";
import { PredictResult } from "./components/predict_result.js";
import { Predict } from "./components/predict.js";
import { UploadPrescription } from "./components/upload_prescription.js";


const routes = [
    { path: '/', component: Homepage, name: 'homepage'},
    { path: '/predict_result', component: PredictResult, name: 'predict_result'},
    { path: '/predict', component: Predict, name: 'predict'},
    { path: '/upload', component: UploadPrescription, name: 'upload'},
]

export const router = new VueRouter({
    routes
})
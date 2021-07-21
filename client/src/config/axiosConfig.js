import axios from "axios";
require("dotenv").config({ path: '../../../config.env' });

let url = null;
if (process.env.NODE_ENV === 'production') {
    url = "https://www.themathx.com/api";
} else {
    url = "http://localhost:8080/api";
}

export default axios.create({
    baseURL: url
});
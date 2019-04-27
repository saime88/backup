import axios from "axios"

const instance = axios.create({
    baseURL:"process.env.PAI_ROOT"
})
export default instance
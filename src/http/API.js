import Http from "./Http"
import Store from '../store/index'
import {isApp} from '../utils/index'
// import {keys} from '../constant/index'
// console.log(Store,"ljh-store")
const  API = {
    /*登录
    * mobile：手机号
    * password：密码
    * */
    login: function (mobile, password) {
        return Http.post("authentication/login", {
            mobile,
            password
        });
    },
}

export default API


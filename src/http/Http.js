import axios from 'axios'
import { Alert } from 'antd';
import Store from '../store/index'
import { isApp, AppVersion} from '../utils'

// var timeout = null;
const baseURL = process.env.URI_API_CMD === 'start' ? '/' :  process.env.URI_API_BASEURL;
function hideLoading(){
    let loading = Store.showLoading*1 - 1
    if(loading< 1){
        setTimeout(() => {
            Store.toggleLoading( 0 )
        }, 500);
        return false;
    }
    Store.toggleLoading( loading )
}
function showLoading() {
    let loading = Store.showLoading + 1
    Store.toggleLoading( loading )
}
// 没有loading的接口
const noLoadingArr = ['zsph-bs-bankcard/bankCard/account/balanceQuery/me']
const noErrToastArr = [`zsph-bs-customer/faceid/getOssToken/me`]
// http request 拦截器
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.interceptors.request.use((config) => {
    !noLoadingArr.includes(config.url) && showLoading()
    
    if (Store.isLogin) {
        config.headers["access-token"] = `${Store.users.token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})


// http response 拦截器
axios.interceptors.response.use(response => {
    let res = response.config
    !noLoadingArr.includes(res.url.slice(baseURL.length+1)) && hideLoading()
    return response
}, error => {
    hideLoading();
    
    if(!noErrToastArr.includes(error.request.responseURL.slice(baseURL.length+1))){
        if (error.response && error.response.data){
            const status = error.response.data.status*1;
            switch (status) {
                case 401: {
                    Store.updateUser(null);
                    let router = window._ROUTER_;
                    if (router.location.pathname !== "/signin") {
                        router.push("/signin" + (router.location.pathname !== "/" ? ("?" +encodeURI(router.location.pathname)) : ""));
                    }
                }
                break;
                case 500: {
                    // Toast.info('系统维护中，维护时间 23:00 - 24:00')
                    // Toast.info('系统开小差了,请稍后再试');

                }
                break;
                default: {
                    let message = error.response.data.message;
    
                    if (message && message.length > 0) {
                        if ((status !== 404 && !error.response.data.path.startsWith("/authentication/logout")) ||
                            error.response.data.path.startsWith("/authentication/resetPassword")) {
                            // Toast.info(message);
                        }
                    }else{
                        // Toast.info('网络异常！')
                    }
                }
            }
        }
    }
    return Promise.reject(error)
})

const defaultOptions = {
    baseURL: baseURL,
    method: 'get',
    // timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "terminal-version" : isApp() ? AppVersion() : 1,
        "terminal-id" : isApp() ? 'ANDROID' : 'H5'
    },
    withCredentials:true,
}

const  Http = {
    base: (options) => {
        return new Promise((resolve, reject) => {
            axios({...defaultOptions, ...options}).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    get: function (url, params) {
        let options = {
            url:url,
            method: 'get',
            params:params
        };
        return this.base(options);
    },
    post: function (url, params) {
        let options = {
            url:url,
            method: 'post',
            data:params
        };
        return this.base(options);
    },
    put: function (url, params) {
        let options = {
            url:url,
            method: 'put',
            data:params
        };
        return this.base(options);
    },
    delete: function (url, params) {
        let options = {
            url:url,
            method: 'delete',
            data:params
        };
        return this.base(options);
    },

}

export default Http;

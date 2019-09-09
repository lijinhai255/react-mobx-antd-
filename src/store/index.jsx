import { action , observable, computed,autorun } from 'mobx'

class Store {
    @observable outLink = '' 
    @observable hidephone = ""
    @observable historyLength = null
    @observable users = localStorage.getItem("loginUser") && JSON.parse(localStorage.getItem("loginUser"))
    // @observable users = "lijinhai"
    @observable withdrawCashInfo = null
    @observable usersPlayData =null
    @observable showLoading = 0

    /*是否登录*/
    @computed get isLogin(){
        // console.log(this.users,121212)
        return this.users ? true : false;
    }

    /*登录用户ID*/
    @computed get customerId() {
        return this.users ? this.users.customerId : "";
    }
    // 用户token
    @computed get token(){
        return this.users ? this.users.token : "";
    }


}

let Stores = new Store()

export default Stores
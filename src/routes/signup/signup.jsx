import React, { Component } from 'react'

import { Validate } from '../../utils/index'
import API from '../../http/API'
import { computed } from "mobx";
//引入验证码组件
/***
 *   props 参数
 *  
 *   closePage  关闭登陆页调用的方法
 * 
 */
let closeIcon = '';
let timer = undefined;
const timerDuration = 60
class SignUp extends Component {
  
    render() {
        let {isShowverificationCode,codeImg} = this.state;
        return (
            <div>
                  这个是注册页面
            </div>
        )
    }
}

export default SignUp

import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import SuperSignIn  from './routes/index/index.jsx';  //首页
import SignIn from './routes/signin/signin';//登陆页面
import SignUp from './routes/signup/signup';// 注册页面
// import Loading from "./components/loading/loading";

// @withRouter @inject("Store") @observer
class App extends Component {

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }
    

    componentDidMount() {
    }
    //当 App组件被卸载 之后 将本地的会话 isFirstLogin 数据进行清空
    componentWillUnmount(){ 
    }
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <PrivateRoute exact path="/" component={SuperSignIn}/>
                    {/* 登陆注册页面 */}
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/SignUp' component={SignUp} />
                    {/* 辅助认证列表 */}
                    <Redirect from="*" to="/"/>
                </Switch>
                {
                //   <Loading message="加载中..."/> 
                }
            </React.Fragment>
        );
    }
}

export default App;


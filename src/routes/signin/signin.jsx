import React, { Component } from 'react'
import { Validate } from '../../utils/index'
import API from '../../http/API'
import { inject ,observer } from 'mobx-react'
import { Form, Icon, Input, Button, Checkbox, Card  } from 'antd';
/***
 *   props 参数
 *  
 *   closePage  关闭登陆页调用的方法
 * 
 */
@inject("Store") @observer
class SignIn extends Component {
    state = {
        pwdIcon: 'close',
        phone: '',
        pwd: '',
        focus: true
    }
    handleSubmit=e=>{
        console.log(21212)
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
               <Card>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item label="用户名">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item la>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>

                    </Form>
               
               </Card>
            </div>
        )
    }
}

const SuperSignIn = Form.create({ name: 'normal_login' })(SignIn);

export default SuperSignIn
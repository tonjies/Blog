import {useState} from "react";
import React from 'react';
import {Card, Input, Button, Spin, Icon, message} from "antd";
import servicePath from '../config/apiUrl'
import 'antd/dist/antd.css'
import '../static/css/Login.css';
import {Http} from '../util/http'

function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = async () => {

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        if (!userName) {
            message.error('用户名不存在')
            return false
        } else if (!password) {
            message.error('密码不能为空')
            return false
        }
        let dataProps = {'username': userName, 'password': password}
        const res = await Http.request({url: servicePath.checkLogin, data: dataProps});
        if (res.status) {
            //保存token
            localStorage.setItem('token',res.body.token)
            props.history.push('/index')
        }
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="JSPang blog system" bordered={true} style={{width: 400}}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter you userName"
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter you password"
                        prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login

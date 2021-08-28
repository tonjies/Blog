import axios from "axios";
import {codes} from "../config/exception-config"
import {message} from "antd";

class Http {

    /**
     * 可以进行post请求，也可以传入其他的option选项进行其他选择
     */
    static request({url, data, option = "post", props}) {
        return this.getPromise(option, url, data, props)
    }

    /**
     * 进行get请求
     */
    static getRequest({url, props}) {
        return this.getPromise('get', url, {}, props)
    }

    /**
     * 实际请求的地址
     */
    static getPromise(option, url, data, props) {
        const token = localStorage.getItem('token');
        console.log(token)

        return new Promise(((resolve, reject) => {
            axios({
                method: option,
                url: url,
                data: data,
                headers: {'token': token}
            }).then(res => {
                if (res.data.status) {
                    resolve(res.data);
                } else {
                    //判断失败原因
                    switch (res.data.code){
                        case 9999:
                            message.error(codes[9999])
                            break
                        case 10001:
                            message.error(codes[10001])
                            break
                        case 10002:
                            message.error(codes[10002])
                            break
                        case 10003:
                            message.error(codes[10003])
                            break
                    }
                    resolve(res.data);
                }
            })
        }));
    }
}
export {Http}

import {Icon,Tabs,Alert,Button} from "antd";
const { TabPane } = Tabs;
import '../static/style/components/rightmi.css'
/**
 * 小密圈
 */
const Rightmi=(props)=>{
    const goArticle=()=>{
        window.location.href="https://jspang.com/detailed?id=54"
    }
    return(
        <div className="comm-box rightmi-div">
            <Tabs defaultActiveKey="1">
                <TabPane tab="密圈" key={"1"}>
                    <div className="miquan-img">
                        <img src={'../../static/xinqiu.png'} />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Rightmi

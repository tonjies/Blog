import  servicePath  from '../config/apiUrl'
import '../static/style/components/author.css'
/**
 * 作者组件
 */
import {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, Divider, Tag, Tooltip} from "antd";

const Author = ()=>{
    //免费视频集数
    const [all_part_count,setAll_part_count]=useState(0);
    //被观看次数
    const [all_view_count,setAll_view_count]=useState(0);
    useEffect(()=>{
    },[])

    return(
        <div className="author-div comm-box">
            <div><Avatar size={100} src="https://upload.jianshu.io/users/upload_avatars/4002920/c3ae8934-1c4e-4061-85ac-552fdfe8f443.png?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240"/></div>
            <div className="author-introduction">
                <div className="author-name">夏影</div>
                <div>想做就做，你没有错</div>
                <div className="author-tag">
                    <Tag color="magenta">Android</Tag>
                    <Tag color="green">前端</Tag>
                    <Tag color="geekblue">Node.js</Tag>
                    <Tag color="blue">广东省</Tag>
                    <Tag color="cyan">个人开发</Tag>
                </div>
                <Divider>社交账号</Divider>

                {/*B站*/}
                <Tooltip title="https://space.bilibili.com/50504092">
                    <a href="https://space.bilibili.com/50504092" target="_blank">
                        <Avatar size={28} src="http://newimg.jspang.com/bilibiliIcon1.png" className="account"/>
                    </a>
                </Tooltip>

                {/*Github*/}
                <Tooltip title="Github:https://github.com/13531982270">
                    <a href="https://github.com/tonjies?tab=repositories" target="_blank">
                        <Avatar size={28} icon="github" className="account"/>
                    </a>
                </Tooltip>

                {/*qq*/}
                <Tooltip title={"qq:1750447987"}>
                    <a href="https://github.com/shenghy" target="_blank">
                        <Avatar size={28} icon="qq" className="account"/>
                    </a>
                </Tooltip>

                {/*微信*/}
                <Tooltip title={"wechat:Tulin_Tonjie"}>
                    <Avatar size={28} icon="wechat" className="account"/>
                </Tooltip>
            </div>
        </div>
    )
}
export default Author

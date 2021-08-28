import React, {useEffect, useState} from "react"
import Head from 'next/head'
import {Row, Col, List, Icon, Spin,Affix} from 'antd'
import Header from "../components/Header";
import '../static/style/pages/index.css'
import axios from "axios";
import servicePath from "../config/apiUrl";
import Link from "next/link";
//作者组件
import Author from '../components/Author'
//小密圈
import Rightmi from '../components/Rightmi'


const Home = (res) => {
    //设置当前列表
    const [ mylist , setMylist ] = useState(res.body)
    //当前是否正在加载列表
    const [loading,setloading]=useState(false)

    useEffect(() => {
        console.log(mylist)
    }, [])

    const goLoading=()=>{
        setloading(true)
    }
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                {/*左边的文章布局*/}
                <Col xs={24} sm={24} md={18}>
                    {/* 文章列表 */}
                    <div className={'comm-left'}>
                        {/*最新日志*/}
                        <List
                            header={<div>最新日志</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <Spin spinning={loading}>
                                        <div className="list-title" onClick={goLoading}>
                                            <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                                                <a>{item.title}</a>
                                            </Link>
                                        </div>
                                        <div
                                            dangerouslySetInnerHTML={{__html: item.introduce_html}}
                                            className="list-context">
                                            {item.context}
                                        </div>
                                        <div className="list-go">
                                            <Icon type="file"/>&nbsp;
                                            <span onClick={goLoading} >
                                            <Link href={{pathname: '/detailed', query: {id: item.id}}}>
                                              <a>查看全文 </a>
                                            </Link>
                                          </span>
                                        </div>
                                    </Spin>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col xs={0} sm={0} md={6} >
                    <Author/>
                    <Affix offsetTop={60}>
                        <Rightmi/>
                        {/*<StudyLine/>*/}
                        {/*<Advert/>*/}
                    </Affix>
                </Col>
            </Row>
        </div>
    )
}
Home.getInitialProps=async (context)=>{
    let date=new Date()
    let month=date.getMonth();
    let day=date.getDate();
    let hour=date.getHours();
    let minute=date.getMinutes();
    let second=date.getSeconds();
    let time=month+'/'+day+'/'+hour+':'+minute+':'+second
    // console.log('----->' + time + ':Visit the Index page')
    const promise=new Promise((resolve)=>{
        axios(servicePath.getArticleList).then(
            (res)=>{
                // console.log(res.data.body)
                resolve(res.data)
            }
        )
    })
    return await promise
}
export default Home

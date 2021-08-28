import React, {useState, useEffect} from 'react'
import axios from "axios";
import servicePath from '../config/apiUrl'
import Header from "../components/Header";
import '../static/style/pages/detailed.css'
import {Breadcrumb, Col, Icon, Row, BackTop} from "antd";
import Author from "../components/Author";
import Rightmi from "../components/Rightmi";
import Tocify from '../components/tocify.tsx'
import marked from 'marked'
import Footer from "../components/Footer";
import hljs from "highlight.js";

const Detailed = (props) => {
    //获取到的md热疗内容
    let articleContent = props.article_content

    //html形式的内容
    const [html, setHtml] = useState(props.article_content_html)

    if (articleContent === 'id错误') {
        console.log('渲染完成，但什么都没有')
        return false
    }
    useEffect(() => {
        setTimeout(() => {
            myFuction()
        }, 100)
    }, [])


    const [tocify, setTocify] = useState(new Tocify())
    const [loading, setLoading] = useState(true)

    const myFuction = async () => {
        let newhtml = await marked(props.article_content)
        setHtml(newhtml)
        setLoading(false)
    }
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix">
                     <h${level}>${text}</h${level}>
                </a>\n`;
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });


    return (
        <>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={18}>
                    {/* 顶部的面包屑区域 */}
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="?">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                            <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div>
                        {/* 视频标题 */}
                        <div className="detailed-title">
                            {props.title}
                        </div>
                        {/*文章重要信息*/}
                        <div className="list-icon center">
                            <span><Icon type="calendar"/> {props.addTime}</span>
                            <span><Icon type="folder"/> {props.typeName}</span>
                            <span><Icon type="fire"/> {props.view_count}</span>
                        </div>
                        {/*视频简介*/}
                        <div className="detailed-content"
                             dangerouslySetInnerHTML={{__html: props.introduce_html}}>
                        </div>

                        <div className="detailed-content"
                             dangerouslySetInnerHTML={{__html: html}}>
                        </div>

                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={6}>
                    <Author/>
                    <Rightmi/>
                </Col>
            </Row>
            <Footer/>
            <BackTop/>
        </>
    )
}
Detailed.getInitialProps = async (context) => {
    let id = parseInt(context.query.id)
    const promise = new Promise((resolve) => {
        if (id) {
            axios(servicePath.getArticleById + id).then(
                (res) => {
                    // console.log(title)
                    if (res.data.data === 'id错误') {
                        console.log('ERROR.......')
                        resolve({article_content: 'id ERROR'})
                    } else {
                        resolve(res.data.body[0])
                    }
                }
            )
        } else {
            console.log('error......')
            resolve({article_content: 'Id Error'})
        }
    })
    return await promise
}
export default Detailed

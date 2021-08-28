/**
 * 添加文章
 */
import React, {useState, useEffect, useRef} from 'react';
import {Row, Col, Input, Select, Button, DatePicker, message, Spin} from 'antd'
import TextArea from "antd/es/input/TextArea";
import marked from 'marked'
import servicePath from "../config/apiUrl";
import '../static/css/AddArticle.css'
import {Http} from '../util/http'
import Tocify from "../components/tocify";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const {Option} = Select

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)//文章的ID，如果是0说明新增加，如果不是0，说明是修改的
    const [articleTitle, setArticleTitle] = useState('')//文章的标题
    const [articleContent, setArticleContent] = useState('')//markdown的编辑内容
    const [markdownContext, setMarkdownContent] = useState('预览内容')//html内容
    const [introducemd, setIntroducemd] = useState('')//简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑')//简洁的html内容
    const [showDate, setShowDate] = useState()//发布日期
    const [isLoading, setIsLoading] = useState(false) //是否显示加载

    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
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

    useEffect(() => {
        //获得文章ID
        let tmpId = props.match.params.id
        if (tmpId) {
            setPageLoading(true);
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    }, [])

    function setPageLoading(isLoading) {
        setIsLoading(isLoading)
    }

    /**
     * 获取文章详情
     */
    const getArticleById = async (id) => {
        const res = await Http.request({url: servicePath.getArticleById + id, props: props})
        if (res.status) {
            console.log('获取文章详情')
            console.log(res.body)
            setPageLoading(false)
            setArticleTitle(res.body[0].title)//标题
            setArticleContent(res.body[0].article_content)//内容
            let html = marked(res.body[0].article_content)
            setMarkdownContent(html)//预览内容
            setIntroducemd(res.body[0].introduce)//简介
            let tmpInt = marked(res.body[0].introduce)
            setIntroducehtml(tmpInt)//预览简介
            setShowDate(res.body[0].addTime)
        }
    }

    const changeContext = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const markedContent = () => {
        setPageLoading(true)
        setTimeout(() => {
            let html = marked(articleContent)
            setMarkdownContent(html)
            setPageLoading(false)
            message.success('转换完成')
        }, 300)
    }

    //保存文章的方法
    const saveArticle = async () => {
        if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        setPageLoading(true)
        let dataProps = {}
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let datetext = showDate.replace('-', '/')
        dataProps.addTime = (new Date(datetext).getTime()) / 1000
        dataProps.article_content_html = markdownContext
        dataProps.introduce_html = introducehtml
        console.log(dataProps)
        if (articleId === 0) {
            const res = await Http.request(
                {url: servicePath.addArticle, data: dataProps})
            setIsLoading(false)
            if (res.status) {
                message.success('文章发布成功')
            } else {
                message.success('文章发布失败')
            }
        } else {
            dataProps.id = articleId
            const res = await Http.request({
                url: servicePath.updateArticle, data: dataProps
            })
            setIsLoading(false)
            if (res.status) {
                message.success('文章保存成功')
            } else {
                message.success('保存失败')
            }
        }
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    return <div>
        <div>
            <Spin spinning={isLoading}>
                <Row gutter={5}>
                    {/* 编辑区域 */}
                    <Col span={18}>
                        <Row>
                            <Col span={24} className={'blog-title'}>
                                <Input
                                    value={articleTitle}
                                    placeholder="博客标题"
                                    onChange={e => {
                                        setArticleTitle(e.target.value)
                                    }}
                                    size="large"
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row gutter={10}>
                            <Col span={12}>
                                <TextArea
                                    className="markdown-content"
                                    rows={35}
                                    placeholder="文章内容"
                                    value={articleContent}
                                    onChange={changeContext}
                                />
                            </Col>
                            <Col span={12}>
                                <div
                                    className="show-html"
                                    dangerouslySetInnerHTML={{__html: markdownContext}}
                                >

                                </div>
                            </Col>
                        </Row>
                    </Col>
                    {/* 发表文章区域 */}
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Button type="primary" size="large" onClick={saveArticle}>
                                    发表文章
                                </Button>
                                <br/>
                            </Col>
                            <Col span={24}>
                                <br/>
                                <TextArea
                                    rows={4}
                                    placeholder="文章简介"
                                    onChange={changeIntroduce}
                                    value={introducemd}
                                />
                                <br/><br/>
                                <div
                                    dangerouslySetInnerHTML={{__html: introducehtml}}
                                    className="introduce-html"
                                >
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="date-select">
                                    <DatePicker
                                        onChange={(date, dateString) => setShowDate(dateString)}
                                        placeholder="发布日期"
                                        size="large"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        </div>
    </div>
}

export default AddArticle

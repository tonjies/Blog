import React, {useState, useEffect} from 'react';
import axios from "axios";
import servicePath from "../config/apiUrl";
import {List, Row, Col, Modal, message, Button, Switch} from "antd";
import '../static/css/ArticleList.css'
import {Http} from '../util/http'

const {confirm} = Modal

function ArticleList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getList()
    }, [])
    //得到文章列表
    const getList = async () => {
        const res = await Http.request({url: servicePath.getArticleList})
        if (res.status) {
            setList(res.body)
        }
    }

    async function deleteArticle(id) {
        const res = await Http.request(
            {url: servicePath.delArticle + id});
        if (res.status) {
            message.success('文章删除成功')
            await getList()
        }
    }

    //删除文章
    const delArticle = async (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击ok按钮，文章将会永远删除，无法恢复',
            onOk() {
                deleteArticle(id);
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });
    }
    //修改文章
    const updateArticle = (id, checked) => {
        props.history.push('/index/add/' + id)
    }

    //设置置顶
    const setTop = async (id, checked) => {
        console.log("Hello")
        let dataProps = {}
        dataProps.id = id
        dataProps.isTop = checked ? 1 : 0
        const res = await Http.request(
            {url: servicePath.updateIsTop, data: dataProps, props: props}
        )
        if (res.status) {
            message.success('置顶设置成功')
            await getList()
        }
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>置顶</b>
                        </Col>
                        <Col span={3}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                <Switch checked={item.isTop ? true : false} onChange={(checked => {
                                    setTop(item.id, checked)
                                })}/>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={() => {
                                    updateArticle(item.id)
                                }}>修改</Button>&nbsp;
                                <Button onClick={() => delArticle(item.id)}>删除</Button>
                            </Col>

                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList

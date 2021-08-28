import React, {useState} from 'react';
import {Breadcrumb, Icon, Layout, Menu} from "antd";
import {Route} from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
const {Header, Content, Footer, Sider} = Layout
const {SubMenu} = Menu
/**
 * 后台管理页面
 */
function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    //退出登录
    const handleExit = e => {
        localStorage.removeItem('token')
        props.history.push('/login')
        console.log('退出登录')
    }
    //大胖逼逼叨
    const handleBBD = e => {
        console.log('大胖逼逼叨')
    }
    //添加文章/文章列表
    const handleClickArticle = e => {
        if (e.key === 'addArticle') {
            console.log('添加文章')
            props.history.push('/index/add')
        } else {
            console.log('文章列表')
            props.history.push('/index/list')
        }
    }
    return (
        <div>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu
                            key="sub1"
                            onClick={handleClickArticle}
                            title={
                                <span>
                                    <Icon type="user"/>
                                    <span>文章管理</span>
                                </span>
                            }>
                            <Menu.Item key="addArticle">添加文章</Menu.Item>
                            <Menu.Item key="articleList">文章列表</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="10" onClick={handleExit}>
                            <Icon type="poweroff"/>
                            <span>退出登录</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{background:'#fff',padding:0}}/>
                    <Content style={{margin:'0 16px'}}>

                        <div style={{padding:24,background:'#fff',minHeight:360}}>
                            <div>
                                <Route path="/index/" exact component={AddArticle}/>
                                <Route path="/index/add" exact component={AddArticle}/>
                                <Route path="/index/add/:id" exact component={AddArticle}/>
                                <Route path="/index/list/" component={ArticleList}/>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminIndex

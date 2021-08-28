import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import '../static/style/components/header.css'
import {Row, Col, Icon} from 'antd'

const Header = () => {
    return (
        <div className="header">
            <div className="header-center">
                <Row type="flex" justify="center" align={'middle'}>
                    <Col xs={24} sm={24} md={13}>
                            <span className="header-logo">
                                <Link href={{pathname: '/'}}>
                                    <a>夏影</a>
                                </Link>
                            </span>
                        <span className="header-txt"></span>
                    </Col>
                    {/*
                        在xs和sm标准下都无法显示
                    */}
                    <Col className="memu-div" xs={0} sm={0} md={11}>
                    {/*    <Row >*/}
                    {/*        <Col xs={0} sm={0} md={6}>*/}
                    {/*            <Link href={{pathname: '/'}}>*/}
                    {/*                <a><Icon type='home'/> 博客首页</a>*/}
                    {/*            </Link>*/}
                    {/*        </Col>*/}
                    {/*        <Col xs={0} sm={0} md={6}>*/}
                    {/*            <Link href={{pathname: '/list', query: {id: 1}}}>*/}
                    {/*                <a><Icon type='youtube'/> 视频教程</a>*/}
                    {/*            </Link>*/}
                    {/*        </Col>*/}
                    {/*        <Col xs={0} sm={0} md={6}>*/}
                    {/*            <Link href={{pathname: '/bibidao'}}>*/}
                    {/*                <a><Icon type='message'/> 逼逼叨</a>*/}
                    {/*            </Link>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Header

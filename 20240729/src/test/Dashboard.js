import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';
import './Dashboard.css';
import VideoComponent from '../Topics/Video'; 
import Water from './LiquidFillGaugeChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import GaugeChart from './GaugeChart';
import LineChart from './LineChart';
import Who from '../Topics/Who';
import Pie from '../Topics/Meter';
import Line from '../Topics/Line';
import Co2 from '../Topics/Bar';

const Dashboard = (num) => {
    console.log(typeof(num));
    let num2 = num.num;
    return (
        <div className='con'>
            <PageContainer>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Card className="custom-card">
                        <div className="placeholder">魚塭資訊</div>
                        <Who num = {num2}></Who>
                    </Card>
                </Col>
                <Col span={9}>
                    <Card className="custom-card">
                        <div className="placeholder">監視器</div>
                        <VideoComponent/>
                    </Card>
                </Col>
                <Col span={9}>
                    <Card className="custom-card">
                        <div className="placeholder">魚種數量</div>
                        <Pie/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card className="custom-card">
                        <div className="placeholder">水量</div>
                        <Water/>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card className="custom-card">
                        <div className="placeholder">歷史資料</div>
                        <Line num ={num2}></Line>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card className="custom-card">
                        <div className="placeholder">溫度</div>
                        <GaugeChart/>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card className="custom-card">
                        <div className="placeholder">排放資料</div>
                        <Co2 num = {num2}></Co2>
                    </Card>
                </Col>
            </Row>
        </PageContainer>
        </div>
        
    );
};


export default Dashboard;

// HorizontalBarChart.js
import React, { useEffect } from 'react';
import { Bar } from '@antv/g2plot';

const HorizontalBarChart = () => {
    useEffect(() => {
        const data = [
            { region: '北部', value: 120 },
            { region: '中部', value: 150 },
            { region: '南部', value: 100 },
            { region: '東部', value: 170 },
        ];
        const bar = new Bar('horizontal-bar-container', {
            data,
            xField: 'value',
            yField: 'region',
            seriesField: 'region',
            isStack: true,
            width: '100%',
            height: '100%',
        });
        bar.render();
    }, []);

    return <div id="horizontal-bar-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default HorizontalBarChart;

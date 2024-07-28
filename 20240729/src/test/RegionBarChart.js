// RegionBarChart.js
import React, { useEffect } from 'react';
import { Column } from '@antv/g2plot';

const RegionBarChart = () => {
    useEffect(() => {
        const data = [
            { region: '北部', value: 120 },
            { region: '中部', value: 150 },
            { region: '南部', value: 100 },
            { region: '東部', value: 170 },
        ];
        const column = new Column('region-bar-container', {
            data,
            xField: 'region',
            yField: 'value',
            seriesField: 'region',
            width: '100%',
            height: 300,
        });
        column.render();
    }, []);

    return <div id="region-bar-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default RegionBarChart;

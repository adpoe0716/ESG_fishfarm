// BarChart.js
import React, { useEffect } from 'react';
import { Column } from '@antv/g2plot';

const BarChart = () => {
    useEffect(() => {
        const data = [
            { region: '區域1', value: 40 },
            { region: '區域2', value: 60 },
            { region: '區域3', value: 30 },
            { region: '區域4', value: 70 },
        ];
        const column = new Column('bar-container', {
            data,
            xField: 'region',
            yField: 'value',
            seriesField: 'region',
        });
        column.render();
    }, []);

    return <div id="bar-container"></div>;
};

export default BarChart;

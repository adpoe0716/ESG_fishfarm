// WaterQualityPieChart.js
import React, { useEffect } from 'react';
import { Pie } from '@antv/g2plot';

const WaterQualityPieChart = () => {
    useEffect(() => {
        const data = [
            { type: '良好', value: 75 },
            { type: '普通', value: 15 },
            { type: '差', value: 10 },
        ];
        const pie = new Pie('water-quality-pie-container', {
            data,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            label: {
                type: 'spider',
                labelHeight: 28,
                content: '{name}\n{percentage}',
            },
            width: '100%',
            height: '100%',
        });
        pie.render();
    }, []);

    return <div id="water-quality-pie-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default WaterQualityPieChart;

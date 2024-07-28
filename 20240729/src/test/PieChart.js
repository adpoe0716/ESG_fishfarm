import React, { useEffect } from 'react';
import { Pie } from '@antv/g2plot';

const PieChart = () => {
    useEffect(() => {
        const data = [
            { type: 'Desktop', value: 70 },
            { type: 'Mobile', value: 30 },
        ];
        const pie = new Pie('pie-container', {
            data,
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
        });
        pie.render();
    }, []);

    return <div id="pie-container" style={{ width: '100%', height: '250px' }}></div>;
};

export default PieChart;

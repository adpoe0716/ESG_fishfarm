// LineChart.js
import React, { useEffect } from 'react';
import { Line } from '@antv/g2plot';

const LineChart = () => {
    useEffect(() => {
        const data = [
            { month: 'Jan', sales: 38 },
            { month: 'Feb', sales: 52 },
            { month: 'Mar', sales: 61 },
            { month: 'Apr', sales: 145 },
            { month: 'May', sales: 48 },
            { month: 'Jun', sales: 38 },
            { month: 'Jul', sales: 38 },
            { month: 'Aug', sales: 38 },
            { month: 'Sep', sales: 38 },
            { month: 'Oct', sales: 38 },
            { month: 'Nov', sales: 38 },
            { month: 'Dec', sales: 38 },
        ];
        const line = new Line('line-container', {
            data,
            xField: 'month',
            yField: 'sales',
            seriesField: 'month',
            height: 300, // 確保圖表高度
            width: '100%', // 確保圖表寬度
        });
        line.render();
    }, []);

    return <div id="line-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default LineChart;

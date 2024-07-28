// GrowthLineChart.js
import React, { useEffect } from 'react';
import { Line } from '@antv/g2plot';

const GrowthLineChart = () => {
    useEffect(() => {
        const data = [
            { month: 'Jan', growth: 2.3 },
            { month: 'Feb', growth: 2.8 },
            { month: 'Mar', growth: 3.2 },
            { month: 'Apr', growth: 3.9 },
            { month: 'May', growth: 4.5 },
            { month: 'Jun', growth: 4.9 },
            { month: 'Jul', growth: 5.3 },
            { month: 'Aug', growth: 5.8 },
            { month: 'Sep', growth: 6.2 },
            { month: 'Oct', growth: 6.5 },
            { month: 'Nov', growth: 6.9 },
            { month: 'Dec', growth: 7.1 },
        ];
        const line = new Line('growth-line-container', {
            data,
            xField: 'month',
            yField: 'growth',
            seriesField: 'month',
            smooth: true, // 確保折線圖平滑顯示
            width: '100%',
            height: '100%',
        });
        line.render();
    }, []);

    return <div id="growth-line-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default GrowthLineChart;

// GaugeChart.js
import React, { useEffect } from 'react';
import { Gauge } from '@antv/g2plot';

const GaugeChart = () => {
    useEffect(() => {
        const gauge = new Gauge('gauge-container', {
            percent: 0.75,
            range: {
                color: 'l(0) 0:#f5222d 1:#30bf78',
            },
            indicator: {
                pointer: {
                    style: {
                        stroke: '#D0D0D0',
                    },
                },
                pin: {
                    style: {
                        stroke: '#D0D0D0',
                    },
                },
            },
            statistic: {
                content: {
                    style: {
                        fontSize: '36px',
                        lineHeight: '36px',
                    },
                },
            },
        });

        gauge.render();
    }, []);

    return <div id="gauge-container" style={{ width: '250px', height: '250px' }}></div>;
};

export default GaugeChart;

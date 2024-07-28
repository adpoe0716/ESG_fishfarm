// AdditionalGaugeChart.js
import React, { useEffect } from 'react';
import { Gauge } from '@antv/g2plot';

const AdditionalGaugeChart = () => {
    useEffect(() => {
        const gauge = new Gauge('additional-gauge-container', {
            percent: 0.85,
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

    return <div id="additional-gauge-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default AdditionalGaugeChart;

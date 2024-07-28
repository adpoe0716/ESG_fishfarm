import React, { useEffect } from 'react';
import { Liquid } from '@antv/g2plot';

const LiquidFillGaugeChart = () => {
    useEffect(() => {
        const liquid = new Liquid('liquid-container', {
            percent: 0.6,
            outline: {
                border: 1,
                distance: 8,
            },
            wave: {
                length: 128,
            },
        });

        liquid.render();
    }, []);

    return <div id="liquid-container" style={{ width: 250 , height: 250 }}></div>;
};

export default LiquidFillGaugeChart;

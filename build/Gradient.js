"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_color_1 = require("d3-color");
function stop(gradient, stops) {
    gradient
        .selectAll('stop')
        .data(stops)
        .enter()
        .append('stop')
        .attr('offset', datum => datum.offset)
        .attr('stop-color', datum => datum.color);
    return gradient;
}
exports.stop = stop;
function stereoscopicStop(gradient, baseColor) {
    baseColor = d3_color_1.color(baseColor);
    return stop(gradient, [
        { offset: '0', color: '#fff' },
        { offset: '0.3', color: baseColor.brighter() },
        { offset: '0.7', color: baseColor.darker() },
        { offset: '1', color: '#000' },
    ]).attr('cx', '.3').attr('cy', '.3').attr('r', '.7');
}
exports.stereoscopicStop = stereoscopicStop;
//# sourceMappingURL=Gradient.js.map
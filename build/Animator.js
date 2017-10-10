import { transition } from 'd3-transition'; // eslint-disable-line no-unused-vars
transition(null);
export const planetSizeAnimator = {
  execute(planet, node, time, endCallback) {
    node
      .transition('size')
      .duration(time)
      .attrTween('r', () => {
        const size = planet.getSize();
        const targetSize = planet.getTargetSize();
        return t => {
          const resultSize = (targetSize - size) * t + size;
          planet.setSize(resultSize);
          return resultSize + '';
        };
      })
      .on('end', () => {
        endCallback && endCallback();
      });
  },
};
export const planetAngleAnimator = {
  execute(planet, node, time) {
    node
      .transition('angle')
      .duration(time)
      .attrTween('data-angle', () => {
        const angle = planet.getAngle();
        return t => {
          const targetAngle = planet.getTargetAngle();
          const resultAngle = (targetAngle - angle) * t + angle;
          planet.setAngle(resultAngle);
          return resultAngle + '';
        };
      })
      .on('end', () => {
        planet.cancelAngleAnimation();
      });
  },
};
export const orbitAnimator = {
  execute(orbitInstance, node, duration, endCallback) {
    node
      .transition('orbit-transition')
      .duration(duration)
      .attrTween('r', () => {
        const radius = orbitInstance.getRadius();
        const targetRadius = orbitInstance.getTargetRadius();
        return (t) => {
          const resultRadius = (targetRadius - radius) * t + radius;
          orbitInstance.setRadius(resultRadius);
          return resultRadius + '';
        };
      })
      .on('end', endCallback);
  },
};

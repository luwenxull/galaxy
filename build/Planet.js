"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tool_1 = require("./tool");
class Planet {
    constructor() {
        if (new.target.name === 'Planet') {
            throw new Error('Do not call new Planet() directly!');
        }
        this.$group = null;
    }
    create(parent, filter, requestGradient) { }
    updatePosition(angle, x, y) {
        this.setAngle(angle);
    }
    remove() {
        if (!tool_1.isNullOrUndefined(this.$group)) {
            this.$group.remove();
        }
    }
    getAngle() {
        return this.angle;
    }
    setAngle(angle) {
        this.angle = angle;
    }
}
exports.Planet = Planet;
//# sourceMappingURL=Planet.js.map
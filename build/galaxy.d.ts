import { IOrbit } from './orbit';
export interface IGalaxy {
    $container: HTMLElement;
    instanceOrbits: IOrbit[];
    render(container: HTMLElement, orbits: IOrbit[]): void;
    update(orbits: IOrbit[], callback?: (orbits: IOrbit[]) => void): void;
}
export declare class Galaxy implements IGalaxy {
    $container: HTMLElement;
    instanceOrbits: IOrbit[];
    private $stars;
    private $orbits;
    private _cacheOrbits;
    constructor();
    render(container: HTMLElement, orbits: IOrbit[]): void;
    update(orbits: IOrbit[], callback?: (orbits: IOrbit[]) => void): void;
    private initStarsDom(container, width, height);
    private initOrbitsDom(container, width, height);
    private drawStars(width, height, count?);
    private resetOrbitsGroup(width, height);
    private drawOrbits(orbits);
}

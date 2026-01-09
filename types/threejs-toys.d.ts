// Type declarations for threejs-toys
// This library doesn't have official types, so we declare them here

declare module 'threejs-toys' {
    interface NeonCursorOptions {
        el: HTMLElement;
        shaderPoints?: number;
        curvePoints?: number;
        curveLerp?: number;
        radius1?: number;
        radius2?: number;
        velocityTreshold?: number;
        sleepRadiusX?: number;
        sleepRadiusY?: number;
        sleepTimeCoefX?: number;
        sleepTimeCoefY?: number;
    }

    export function neonCursor(options: NeonCursorOptions): void;
}

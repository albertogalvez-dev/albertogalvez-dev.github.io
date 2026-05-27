import { MeshGradient } from "@paper-design/shaders-react";

interface Props {
  accent: string;
  accent2: string;
}

/**
 * WebGL mesh-gradient shader that fills the viewport.
 * Built on @paper-design/shaders-react (same family used by OpenAI / Linear).
 * Colors are derived from the active project (accent + accent2).
 */
export default function AuroraShader({ accent, accent2 }: Props) {
  // Compose a 4-color palette: deep base + accent + accent2 + highlight tint
  const colors = ["#05050a", accent, accent2, "#1a1a22"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -9,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <MeshGradient
        colors={colors}
        speed={0.35}
        distortion={1.1}
        swirl={0.55}
        offsetX={0}
        offsetY={0}
        scale={1.2}
        rotation={0}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

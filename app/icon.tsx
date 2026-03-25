import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Play button triangle */}
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderLeft: "13px solid white",
            marginLeft: "3px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

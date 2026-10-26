import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — rounded MakeMethod mark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2772d6",
          borderRadius: 36,
          color: "white",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -3,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        MM
      </div>
    ),
    { ...size }
  );
}

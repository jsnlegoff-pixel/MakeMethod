import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tab favicon — MM monogram on MakeMethod blue. */
export default function Icon() {
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
          borderRadius: 8,
          color: "white",
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        MM
      </div>
    ),
    { ...size }
  );
}

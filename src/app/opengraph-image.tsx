import { ImageResponse } from "next/og";

export const alt = "MakeMethod — Materials & Manufacturing Explorer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card matching the site header brand treatment. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #122640 0%, #1c4776 48%, #2772d6 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "white",
              color: "#2772d6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            MM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 42,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1.1,
              }}
            >
              <span style={{ color: "white" }}>MAKE</span>
              <span style={{ color: "#9ec5ff" }}>METHOD</span>
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 2,
                color: "#d3e1f2",
                marginTop: 6,
              }}
            >
              MATERIALS & MANUFACTURING
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            Find materials and manufacturing methods that fit your product.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#d3e1f2",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Explore plastics, metals, elastomers, fabrics, and processes —
            with an advisor wizard and illustrative cost planning.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 600,
            color: "#9ec5ff",
          }}
        >
          themakemethod.com
        </div>
      </div>
    ),
    { ...size }
  );
}

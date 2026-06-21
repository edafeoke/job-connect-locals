import { ImageResponse } from "next/og";
import { BriefcaseMark } from "@/lib/brand-icon";

export const alt = "JobConnect Locals — Find Local Jobs in Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 24,
              border: "2px solid rgba(255,255,255,0.25)",
            }}
          >
            <BriefcaseMark size={64} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              JobConnect Locals
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Find Local Jobs in Nigeria
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Connect with local employers. Post jobs, apply with your CV, and schedule interviews.
        </div>
      </div>
    ),
    { ...size },
  );
}

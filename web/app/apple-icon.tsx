import { ImageResponse } from "next/og";
import { BRAND_PRIMARY, BriefcaseMark } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: BRAND_PRIMARY,
          borderRadius: 36,
        }}
      >
        <BriefcaseMark size={96} />
      </div>
    ),
    { ...size },
  );
}

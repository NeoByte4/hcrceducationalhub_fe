import { IAsset } from "@/src/graphql/generic";

const BASE_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055";

const FALLBACK = { src: "/images/placeholder.jpg", alt: "Image unavailable" };

export function getAssetUrl(data: IAsset | null | undefined) {
  if (!data || !data.id) return FALLBACK;

  return {
    src: `${BASE_URL}/assets/${data.id}`,
    alt: data.description ?? "Travel photography",
  };
}

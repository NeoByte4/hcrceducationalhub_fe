// utils/getAssetUrl.ts
import { IAsset } from "../graphql/generic";

const BASE_URL = process.env.NEXT_PUBLIC_API_DATA_URL;

export function getAssetUrl(data: IAsset) {
  return {
    src: data.id ? `${BASE_URL}/assets/${data.id}` : "/placeholder.jpg",
    alt: data.description ?? `Travel photography`,
  };
}

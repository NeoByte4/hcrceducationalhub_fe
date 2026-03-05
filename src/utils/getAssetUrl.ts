import { IAsset } from "../graphql/generic";

const baseurl = process.env.NEXT_PUBLIC_API_DATA_URL;

export function getAssetUrl(data: IAsset) {
  const img = {
    src: data.id ? `${baseurl}/assets/${data.id}` : "/placeholder.jpg",
    alt:
      data.description ?? `Travel photography by Prestige Travel Corporation`,
  };
  return img;
}

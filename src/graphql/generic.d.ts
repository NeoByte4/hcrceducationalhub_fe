export interface IAsset {
  id: string;
  filename_download?: string;
  description?: string;
}

export interface IDestination_FULL extends IDestination_MINIMAL {
  faqs?: IFaq[];
  images: { directus_files_id: IAsset }[];
}

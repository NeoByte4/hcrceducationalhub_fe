import { IAsset } from "./generic";

interface ICountryImage {
  directus_files_id: IAsset;
}
export interface IDestination_MINIMAL {
  slug: string;
  name: string;
  subtitle: string;
  overview: string;
  images: ICountryImage[];
}

export interface ICountry {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  language?: string;
  overview?: string;
  working_hours?: string;
  post_study_work_visa?: string;
  images?: IAsset;
  video?: IAsset;
  flag?: IAsset;
  institutions?: IInstitution[];
}

export interface IInstitution {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  overview?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  global_ranking?: number;
  national_ranking?: number;
  established_date?: string;
  images?: IAsset;
  video?: IAsset;
  logo?: IAsset;
  courses?: ICountry[];
}

export interface IProgram {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  overview?: string;
  images?: IAsset;
  video?: IAsset;
  credits_hours?: string;
  duration?: string;
  program_level?: string;
  key_highlights?: string;
  institution?: IInstitution;
}

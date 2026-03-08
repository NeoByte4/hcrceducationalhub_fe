import { IAsset } from "./generic";

interface ICountryImage {
  directus_files_id: IAsset;
}
interface DirectusFile {
  id: string;
  filename_download?: string;
  description?: string;
}
interface InstitutionImage {
  directus_files_id: DirectusFile;
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
  images?: InstitutionImage[];
  video?: IAsset;
  logo?: IAsset;
  country?: ICountry[];
  programs?: IProgram[];
}

export interface IProgram {
  id: string;
  name: string;
  discount?: number;
  rating?: number;
  slug: string;
  subtitle?: string;
  overview?: string;
  images?: Array<{
    directus_files_id: {
      id: string;
      filename_download?: string;
      description?: string;
    };
  }>;
  video?: IAsset;
  credits_hours?: string;
  duration?: string;
  program_level?: string;
  key_highlights?: string;
  institution?: IInstitution;
}

export interface IBlog_MINIMAL {
  title: string;
  subtitle?: string;
  slug: string;
  images: Array<{
    directus_files_id: {
      id: string;
      filename_download?: string;
      description?: string;
    };
  }>;
  video?: IAsset;
  date?: string;
  readTime?: string;
  author?: string;
  date_created?: string;
  blog_content: string;
  overview: string;
}

export interface IFaq {
  question: string;
  answer: string;
}

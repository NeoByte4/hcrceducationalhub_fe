import { IAsset } from "./generic";

/* =====================================================
   1. MEDIA TYPES (IMAGE / FILE / VIDEO)
===================================================== */

interface DirectusFile {
  id: string;
  filename_download?: string;
  description?: string;
}

interface ICountryImage {
  directus_files_id: DirectusFile;
}

interface InstitutionImage {
  directus_files_id: DirectusFile;
}

/* =====================================================
   2. DOCUMENT TYPES
===================================================== */

export interface IRequirement_document {
  name?: string;
  document?: {
    directus_files_id?: DirectusFile; // <- nested here
    filename_download?: string;
  };
  notes?: string;
  requirement_data?: IRequirements_data;
}

export interface IInformation_document {
  name?: string;
  file?: IAsset;
  description?: string;
  institution?: IInstitution;
  program?: IProgram;
  country?: ICountry;
}

/* =====================================================
   3. CORE ENTITIES
===================================================== */

export interface ICountry {
  id: string;
  name: string;
  title?: string;
  slug: string;
  subtitle?: string;
  language?: string;
  overview?: string;
  requirements_data?: IRequirements_data[];
  working_hours?: string;
  working_right?: string;
  post_study_work_visa?: string;
  information_document?: IInformation_document[];
  images: ICountryImage[];
  video?: IAsset;
  flag?: IAsset;
  information_video?: { directus_files_id: IAsset }[];
  institutions?: IInstitution[];
  faq?: IFaq[];
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
  slug: string;
  discount?: number;
  rating?: number;
  subtitle?: string;
  overview?: string;
  images?: InstitutionImage[];
  video?: IAsset;
  credits_hours?: string;
  duration?: string;
  program_level?: string;
  key_highlights?: string;

  institution?: IInstitution;
  category?: string[];
}

/* =====================================================
   4. SUPPORTING DATA
===================================================== */

export interface IRequirements_data {
  id: string;
  name?: string;
  country?: ICountry;
  processing_time?: string;
  visa_fee?: string;
  biometrics?: boolean;
  interview?: boolean;
  health_insurance?: boolean;
  dependents_allowed?: boolean;

  notes?: string;

  requirement_document?: IRequirement_document[];
}

/* =====================================================
   5. MINIMAL / LIST TYPES
===================================================== */

export interface IDestination_MINIMAL {
  slug: string;
  name: string;
  subtitle: string;
  overview: string;
  images: ICountryImage[];
}

/* =====================================================
   6. BLOG & FAQ
===================================================== */

export interface IBlog_MINIMAL {
  title: string;
  slug: string;
  subtitle?: string;
  overview: string;
  blog_content: string;
  images: InstitutionImage[];
  video?: IAsset;
  date?: string;
  readTime?: string;
  author?: string;
  date_created?: string;
}

export interface IFaq {
  id: string;
  question: string;
  answer: string;
}

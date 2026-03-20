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

  images?: Array<{
    directus_files_id: {
      id: string;
      filename_download?: string;
      description?: string;
    };
  }>;

  video?: {
    id: string;
    filename_download?: string;
    description?: string;
  };

  logo?: {
    id: string;
    filename_download?: string;
    description?: string;
  };

  information_video?: Array<{
    directus_files_id: {
      id: string;
      filename_download?: string;
      description?: string;
    };
  }>;

  program?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;

  country?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;

  intakes?: Array<{
    name: string;
    start_date?: string;
    seats_available?: string;
    end_date?: string;
  }>;

  fees_structure?: Array<{
    fee_name?: string;
    amount?: string;
    program?: {
      name: string;
      slug: string;
    };
    note?: string;
  }>;

  information_document?: Array<{
    name?: string;
    file?: {
      id: string;
      filename_download?: string;
      description?: string;
    };
    description?: string;
  }>;

  admission_requirement_data?: Array<{
    academic_level?: string;
    gpa?: string;
    major_subject?: string;
    ielts?: string;
    toefl?: string;
    pte?: string;
    note?: string;
  }>;

  faq?: Array<{
    question: string;
    answer: string;
  }>;

  requirements_data?: IRequirements_data[];
}
export interface IIntake {
  name: string;
  start_date?: string;
  seats_available?: string;
  end_date?: string;
  program?: IProgram;
  institution?: IInstitution;
}

export interface IPackage {
  id: string;
  intake_name: string;
  start_date: string;
  end_date?: string;
  application_deadline?: string;
  seats_available?: number;

  program?: IProgram;
  university?: IInstitution;

  total_fee?: number;
  status?: "open" | "closed";
  category?: string;
  fee_type?: string;
}

export interface IFeesStructure {
  fee_name?: string;
  amount?: string;
  program?: IProgram;
  institution?: IInstitution;
  note?: string;
}
export interface IAdmissionRequirementData {
  academic_level?: string;
  gpa?: string;
  major_subject?: string;
  ielts?: string;
  toefl?: string;
  pte?: string;
  note?: string;
  program?: IProgram;
  institution?: IInstitution;
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
  id?: string;
  question: string;
  answer: string;
}

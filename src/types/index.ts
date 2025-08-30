export type TESTIMONIALS_TYPE = "TEXT" | "VIDEO";

export type TESTIMONIALS_THEME = "light" | "dark" | "gradient" | "minimal"

export type TESTIMONIALS_VARIANT =
  | "masonry"
  | "scroll"
  | "carousel"
  | "list";

export interface Testimonial {
  id: string;
  content?: string;
  giverName: string;
  giverImage?: string;
  type: TESTIMONIALS_TYPE;
  videoUrl?: string;
  stars?: number;
  email?: string;
  role?: string;
  company?: string;
  socialLink?: string;
  isUserConsent: boolean;
  collectionId: string;
}

export type DATA_TYPE = Omit<Testimonial, "id" | "collectionId" | "isUserConsent">;

export interface TestimonialsProps {
  data?: DATA_TYPE[];
  collectionId?: string;
  variant?: TESTIMONIALS_VARIANT;
  theme?: TESTIMONIALS_THEME;
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

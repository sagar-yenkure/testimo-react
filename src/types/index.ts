export type TESTIMONIALS_TYPE = "TEXT" | "VIDEO";

export type TestimonialTheme = "light" | "dark" | "gradient" | "minimal";

export type TESTIMONIAL_STATUS =
  | "NORMAL"
  | "HIGHLIGHTED"
  | "LIKED"
  | "SPAM"
  | "ARCHIVED";

export type TestimonialVariant =
  | "grid"
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
  status: TESTIMONIAL_STATUS;
  createdAt: Date;
  updatedAt: Date;
  collectionId: string;
}

export interface TestimonialsProps {
  collectionId: string;
  variant?: TestimonialVariant;
  theme?: TestimonialTheme;
  className?: string;
}

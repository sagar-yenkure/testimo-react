import React from "react";

import { TESTIMONIALS_THEME, TESTIMONIALS_TYPE, TestimonialsProps, TESTIMONIALS_VARIANT, DATA_TYPE } from "../../types";
import { cn } from "../../lib/utils";
import { MasonryLayout } from "./MasonryLayout";
import { CarouselLayout } from "./CarouselLayout";
import { ScrollLayout } from "./ScrollLayout";
import { ListLayout } from "./ListLayout";
import { useFetch } from "../../hooks/useFetch";
import { API_BASE } from "../../constants/t";
import { TestimonialCardSkeleton } from "./TestimonialCardSkeleton";
import { TestimonialCardError } from "./TestimonialCardError";
import { Heart } from "lucide-react";

const Testimonials = ({
  data = [],
  collectionId,
  variant = "masonry",
  theme = "light",
  className,
}: TestimonialsProps) => {
  const shouldFetch = !data || data.length === 0;

  const {
    data: fetchedTestimonials,
    loading,
    error,
  } = useFetch(shouldFetch ? API_BASE(collectionId) : null);

  const testimonials = shouldFetch ? fetchedTestimonials : data;

  if (shouldFetch && loading) {
    return (
      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        {[...Array(6)].map((_, i) => (
          <TestimonialCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (shouldFetch && error) {
    return <TestimonialCardError message={error.message} />;
  }

  if (!testimonials || testimonials.length === 0) {
    return <TestimonialCardError message="No testimonials available." />;
  }

  const renderLayout = () => {
    const commonProps = {
      testimonials,
      theme,
      columns: {
        sm: variant === "list" ? 1 : 1,
        md: variant === "list" ? 1 : 2,
        lg: variant === "list" ? 1 : 3,
        xl: variant === "list" ? 1 : 4,
      },
      className: "w-full",
    };

    switch (variant) {
      case "carousel":
        return <CarouselLayout {...commonProps} />;
      case "scroll":
        return <ScrollLayout {...commonProps} />;
      case "list":
        return <ListLayout {...commonProps} />;
      case "masonry":
      default:
        return <MasonryLayout {...commonProps} />;
    }
  };

  return (
    <div className={cn("container mx-auto px-4", className)}>
      {renderLayout()}
      <a
        href={"https://testimo-love.vercel.app/"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-4 hover:cursor-pointer"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Heart className="h-4 w-4 text-white fill-current" />
        </div>
        <span className="text-xl font-bold text-gray-900">
          <span className="text-xl font-bold text-gray-900 italic">
            testimonials by {" "}
          </span>
          Testimo
        </span>
      </a>
    </div>
  );
};

export { Testimonials, DATA_TYPE, TESTIMONIALS_TYPE, TESTIMONIALS_THEME, TESTIMONIALS_VARIANT };

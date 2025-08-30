import React from "react";

import { TestimonialsProps } from "../../types";
import { cn } from "../../lib/utils";
import { MasonryLayout } from "./MasonryLayout";
import { CarouselLayout } from "./CarouselLayout";
import { ScrollLayout } from "./ScrollLayout";
import { ListLayout } from "./ListLayout";
import { useFetch } from "../../hooks/useFetch";
import { API_BASE } from "../../constants/t";
import { TestimonialCardSkeleton } from "./TestimonialCardSkeleton";
import { TestimonialCardError } from "./TestimonialCardError";

const Testimonials = ({
  collectionId,
  variant = "grid",
  theme = "light",
  className,
}: TestimonialsProps) => {
  const {
    data: testimonials,
    loading,
    error,
  } = useFetch(API_BASE(collectionId));

  if (loading)
    return (
      <>
        {
          <div className="flex flex-wrap gap-6">
            {[...Array(6)]?.map((_, i) => (
              <TestimonialCardSkeleton key={i} />
            ))}
          </div>
        }
      </>
    );

  if (error) return <TestimonialCardError message={error.message} />;

  if (!testimonials || testimonials?.length === 0)
    return <TestimonialCardError message="No testimonials available." />;

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
    <div className={cn("testimonials-container", className)}>
      {renderLayout()}
    </div>
  );
};

export { Testimonials };

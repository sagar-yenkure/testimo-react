import React from "react";

import { Testimonial, TestimonialsProps } from "../../types";
import { cn } from "../../lib/utils";
import { TestimonialCard } from "./TestimonialCard";
import { motion } from "framer-motion";

interface GridLayoutProps extends Omit<TestimonialsProps, "collectionId"> {
  testimonials: Testimonial[];
}

export function GridLayout({
  testimonials,
  theme = "light",
  className,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
}: GridLayoutProps) {
  const getGridClasses = () => {
    const baseClass = "grid gap-6";
    const responsiveClasses = [
      `grid-cols-${columns.sm || 1}`,
      `md:grid-cols-${columns.md || 2}`,
      `lg:grid-cols-${columns.lg || 3}`,
      `xl:grid-cols-${columns.xl || 4}`,
    ];
    return cn(baseClass, ...responsiveClasses);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={cn(getGridClasses(), "", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          theme={theme}
          index={index}
        />
      ))}
    </motion.div>
  );
}

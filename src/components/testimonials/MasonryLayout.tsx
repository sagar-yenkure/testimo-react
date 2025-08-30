import React from "react";

import { useEffect, useState } from "react";
import { Testimonial, TestimonialsProps } from "../../types";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";

interface MasonryLayoutProps extends Omit<TestimonialsProps, "collectionId"> {
  testimonials: Omit<Testimonial, "id" | "collectionId" | "isUserConsent">[];
}

export function MasonryLayout({
  testimonials,
  theme = "light",
  className,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
}: MasonryLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [columnCount, setColumnCount] = useState(columns.lg || 3);

  // Create columns based on screen size
  const getColumnCount = () => {
    if (typeof window === "undefined") return columns.lg || 3;

    const width = window.innerWidth;
    if (width >= 1280) return columns.xl || 4;
    if (width >= 1024) return columns.lg || 3;
    if (width >= 768) return columns.md || 2;
    return columns.sm || 1;
  };
  useEffect(() => {
    setIsMounted(true);
    setColumnCount(getColumnCount());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!isMounted) {
    return (
      <div
        className={cn(
          "grid gap-6 grid-cols-1  md:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.email}-${index}`}
            testimonial={testimonial}
            theme={theme}
            index={index}
          />
        ))}
      </div>
    );
  }

  // Distribute testimonials into columns
  const distributeIntoColumns = () => {
    const cols: (typeof testimonials)[] = Array.from(
      { length: columnCount },
      () => []
    );

    testimonials.forEach((testimonial, index) => {
      const columnIndex = index % columnCount;
      cols[columnIndex].push(testimonial);
    });

    return cols;
  };

  const columns_data = distributeIntoColumns();

  return (
    <motion.div
      className={cn("flex gap-6 ", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {columns_data.map((column, columnIndex) => (
        <div key={columnIndex} className="flex-1 space-y-6">
          {column.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.email}-${index}`}
              testimonial={testimonial}
              theme={theme}
              index={columnIndex * column.length + index}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
}

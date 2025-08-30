import React from "react";

import { Testimonial, TestimonialsProps } from "../../types";
import { cn } from "../../lib/utils";
import { TestimonialCard } from "./TestimonialCard";
import { motion } from "framer-motion";

interface ListLayoutProps extends Omit<TestimonialsProps, "collectionId"> {
  testimonials: Testimonial[];
}

export function ListLayout({
  testimonials,
  theme = "light",
  className,
  showStars = true,
}: ListLayoutProps) {
  return (
    <div className={cn("space-y-4 ", className)}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        >
          <TestimonialCard
            testimonial={testimonial}
            theme={theme}
            index={index}
            variant="compact"
          />
        </motion.div>
      ))}
    </div>
  );
}

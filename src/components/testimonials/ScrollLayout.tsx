import React from "react";

import { TestimonialCard } from "./TestimonialCard";
import { motion } from "framer-motion";
import { Testimonial, TestimonialsProps } from "../../types";
import { cn } from "../../lib/utils";

interface ScrollLayoutProps extends Omit<TestimonialsProps, "collectionId"> {
  testimonials: Testimonial[];
}

export function ScrollLayout({
  testimonials,
  theme = "light",
  className,
}: ScrollLayoutProps) {
  // Duplicate testimonials for seamless looping
  const items = [...testimonials, ...testimonials];

  // Approximate card width (Tailwind w-72/80/96 ≈ ~288–384px)
  const SPEED = 100;
  const CARD_WIDTH = 320;
  const totalWidth =
    CARD_WIDTH * testimonials.length + 24 * testimonials.length; // card + gap

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <motion.div
        className="flex gap-6 pb-4 px-2"
        animate={{ x: [0, -totalWidth] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: totalWidth / SPEED,
        }}
      >
        {items.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-72 sm:w-80 md:w-96"
          >
            <TestimonialCard
              testimonial={testimonial}
              theme={theme}
              index={index}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

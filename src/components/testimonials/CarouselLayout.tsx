import React from "react";

import { Testimonial, TestimonialsProps } from "../../types";
import { cn } from "../../lib/utils";
import { TestimonialCard } from "./TestimonialCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface CarouselLayoutProps extends Omit<TestimonialsProps, "collectionId"> {
  testimonials: Omit<Testimonial, "id" | "collectionId" | "isUserConsent">[];
}
export function CarouselLayout({
  testimonials,
  theme = "light",
  className,
}: CarouselLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Adjust visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleCount(3);
      else if (width >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= testimonials.length - visibleCount ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length, visibleCount]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? testimonials.length - visibleCount : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev >= testimonials.length - visibleCount ? 0 : prev + 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <div className={cn("relative", className)}>
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="h-8 w-8 p-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Carousel */}
      <div className="">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={cn(
              "grid gap-6",
              visibleCount === 1 && "grid-cols-1",
              visibleCount === 2 && "grid-cols-1 md:grid-cols-2",
              visibleCount === 3 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            )}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.email}-${currentIndex}`}
                testimonial={testimonial}
                theme={theme}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({
          length: Math.ceil(testimonials.length / visibleCount),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleCount)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-200",
              Math.floor(currentIndex / visibleCount) === index
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  );
}

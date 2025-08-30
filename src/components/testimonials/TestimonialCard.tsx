import React from "react";

import { Testimonial, TestimonialsProps } from "../../types";
import { cn } from "../../lib/utils";
import { Star, Play, ExternalLink, X, Maximize2 } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

interface TestimonialCardProps {
  testimonial: Testimonial;
  theme?: "light" | "dark" | "gradient" | "minimal";
  index?: number;
  variant?: "default" | "compact" | "detailed";
}

export function TestimonialCard({
  testimonial,
  theme = "light",
  index = 0,
  variant = "default",
}: TestimonialCardProps) {
  const isVideo = testimonial.type === "VIDEO";
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-white border-gray-700";
      case "gradient":
        return "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200";
      case "minimal":
        return "bg-white border-gray-100 shadow-none";
      default:
        return "bg-white border-gray-300";
    }
  };

  const renderStars = () => {
    if (!testimonial.stars) return null;

    return (
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < testimonial.stars!
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">
          {testimonial.stars}/5
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -2, scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card
        className={cn(
          "relative transition-all duration-300 hover:shadow-lg",
          getThemeClasses()
        )}
      >
        <CardContent className="p-6">
          {renderStars()}

          {isVideo ? (
            <div className="relative mb-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </motion.button>
                  </Dialog.Trigger>

                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                    <Dialog.Content
                      className={cn(
                        "fixed top-1/2 left-1/2 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg overflow-hidden transition-all",
                        isFullscreen ? "w-screen h-screen max-w-none" : ""
                      )}
                    >
                      {/* Controls (Close + Fullscreen) */}
                      <div className="absolute top-3 right-3 flex gap-2 z-10">
                        <button
                          onClick={() => setIsFullscreen((f) => !f)}
                          className="p-2 rounded-md bg-white/80 hover:bg-white text-gray-700 shadow"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <Dialog.Close asChild>
                          <button className="p-2 rounded-md bg-white/80 hover:bg-white text-gray-700 shadow">
                            <X className="w-4 h-4" />
                          </button>
                        </Dialog.Close>
                      </div>

                      {/* Video */}
                      <div className="aspect-video w-full h-full">
                        <video
                          src={testimonial.videoUrl}
                          controlsList="nodownload  nofullscreen "
                          disablePictureInPicture
                          controls
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            </div>
          ) : (
            testimonial.content && (
              <blockquote
                className={cn(
                  "text-gray-700 mb-4 leading-relaxed",
                  theme === "dark" && "text-gray-300",
                  variant === "compact" ? "text-sm" : "text-base"
                )}
              >
                &quot;{testimonial.content}&quot;
              </blockquote>
            )
          )}

          <div className="flex items-center gap-3">
            <Avatar.Root
              className={cn(
                "inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200",
                variant === "compact" ? "w-10 h-10" : "w-12 h-12"
              )}
            >
              <Avatar.Image
                src={testimonial.giverImage}
                alt={testimonial.giverName}
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback>
                {testimonial.giverName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar.Root>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    "font-semibold text-gray-900 truncate",
                    theme === "dark" && "text-white",
                    variant === "compact" ? "text-sm" : "text-base"
                  )}
                >
                  {testimonial.giverName}
                </p>
                {testimonial.socialLink && (
                  <a
                    href={testimonial.socialLink}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {(testimonial.role || testimonial.company) && (
                <p
                  className={cn(
                    "text-gray-600 truncate",
                    theme === "dark" && "text-gray-400",
                    variant === "compact" ? "text-xs" : "text-sm"
                  )}
                >
                  {testimonial.role}
                  {testimonial.role && testimonial.company && " at "}
                  {testimonial.company}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

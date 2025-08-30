import React from "react";

import { Card, CardContent } from "../ui/card";

export function TestimonialCardSkeleton() {
  return (
    <Card className="relative transition-all duration-300 bg-white border-gray-200">
      <CardContent className="p-6 animate-pulse">
        {/* Stars */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Video / Content placeholder */}
        <div className="mb-4">
          <div className="w-full aspect-video bg-gray-200 rounded-lg"></div>
        </div>

        {/* Avatar + name + role */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

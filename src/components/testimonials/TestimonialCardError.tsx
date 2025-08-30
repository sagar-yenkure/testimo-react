import React from "react";

import { Card, CardContent } from "../ui/card";
import { AlertTriangle } from "lucide-react";

export function TestimonialCardError({ message }: { message?: string }) {
  return (
    <Card className="relative border-red-300 bg-red-50 text-red-700">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <p className="font-medium">
          {message || "Failed to load testimonial."}
        </p>
      </CardContent>
    </Card>
  );
}

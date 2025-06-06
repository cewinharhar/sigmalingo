"use client";

import { type Resource } from "@/constants";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ResourceViewProps {
  resource: Resource;
}

export const ResourceView = ({ resource }: ResourceViewProps) => {
  if (resource.type === "youtube") {
    // Extract video ID from YouTube URL
    const videoId = resource.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
    
    if (!videoId) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Video</h3>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
        {resource.description && (
          <p className="text-sm text-muted-foreground">{resource.description}</p>
        )}
      </div>
    );
  }

  if (resource.type === "app") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended App</h3>
        <div className="rounded-lg border p-4 bg-neutral-50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(resource.url, "_blank")}
              className="flex items-center gap-2"
            >
              <span>Get App</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (resource.type === "book") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Book</h3>
        <div className="rounded-lg border p-4 bg-neutral-50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(resource.url, "_blank")}
              className="flex items-center gap-2"
            >
              <span>Read Reviews</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (resource.type === "website") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Resource</h3>
        <div className="rounded-lg border p-4 bg-neutral-50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(resource.url, "_blank")}
              className="flex items-center gap-2"
            >
              <span>Visit</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

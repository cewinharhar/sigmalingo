"use client";

import { type Resource } from "@/constants";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ResourceViewProps {
  resource: Resource;
}

export const ResourceView = ({ resource }: ResourceViewProps) => {
  if (resource.type === "youtube") {
    const videoId = resource.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
    
    if (!videoId) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Video</h3>
        <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden border">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        {resource.description && (
          <p className="text-sm text-neutral-600">{resource.description}</p>
        )}
      </div>
    );
  }

  if (resource.type === "app") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended App</h3>
        <div className="rounded-lg border p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-neutral-900">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-neutral-600 mt-1">{resource.description}</p>
              )}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open(resource.url, "_blank")}
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
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
        <div className="rounded-lg border p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-neutral-900">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-neutral-600 mt-1">{resource.description}</p>
              )}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open(resource.url, "_blank")}
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            >
              <span>Read Reviews</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (resource.type === "movies") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Movie</h3>
        <div className="rounded-lg border p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-neutral-900">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-neutral-600 mt-1">{resource.description}</p>
              )}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open(resource.url, "_blank")}
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            >
              <span>Watch Now</span>
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
        <div className="rounded-lg border p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-neutral-900">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-neutral-600 mt-1">{resource.description}</p>
              )}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open(resource.url, "_blank")}
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
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

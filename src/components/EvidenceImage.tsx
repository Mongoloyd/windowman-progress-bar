import { useState } from "react";

interface EvidenceImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

const EvidenceImage = ({
  src,
  alt,
  width = 400,
  height = 225,
  className = "",
  onClick,
}: EvidenceImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Skeleton loader */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-t-xl" />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-t-xl">
          <span className="text-muted-foreground text-xs">Image unavailable</span>
        </div>
      )}

      {!error && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`w-full h-full object-cover rounded-t-xl cursor-pointer transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ aspectRatio: "16/9" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default EvidenceImage;

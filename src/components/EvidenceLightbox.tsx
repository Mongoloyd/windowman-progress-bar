import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface EvidenceLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
}

const EvidenceLightbox = ({ open, onOpenChange, src, alt }: EvidenceLightboxProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="max-w-3xl w-[95vw] p-2 sm:p-4 bg-black/95 border-none"
      aria-label="Evidence image enlarged view"
    >
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <DialogDescription className="sr-only">
        Full-size view of evidence document
      </DialogDescription>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-md object-contain max-h-[85vh]"
        decoding="async"
      />
    </DialogContent>
  </Dialog>
);

export default EvidenceLightbox;

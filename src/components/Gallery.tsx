import { useState } from "react";
import { X } from "lucide-react";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const main = images[0];
  const rest = images.slice(1, 5);

  return (
    <>
      <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
        <button
          type="button"
          onClick={() => {
            setActive(0);
            setOpen(true);
          }}
          className="md:col-span-2 md:row-span-2"
        >
          <img src={main} alt={name} className="aspect-[4/5] h-full w-full object-cover md:aspect-auto md:min-h-[520px]" />
        </button>
        {rest.map((src, index) => (
          <button
            key={src}
            type="button"
            className="hidden overflow-hidden md:block"
            onClick={() => {
              setActive(index + 1);
              setOpen(true);
            }}
          >
            <img src={src} alt="" className="aspect-[4/3] h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between px-1 md:hidden">
        <p className="eyebrow text-muted-foreground">
          {images.length} photographs
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="eyebrow border-b border-gold pb-1"
        >
          View all
        </button>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="eyebrow mt-4 hidden border-b border-gold pb-1 md:inline-block"
      >
        View all photographs
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] bg-primary text-primary-foreground">
          <div className="flex items-center justify-between px-5 py-4">
            <p className="eyebrow text-gold">
              {active + 1} / {images.length}
            </p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close gallery">
              <X className="size-6" />
            </button>
          </div>
          <div className="flex h-[calc(100%-4rem)] items-center">
            <button
              type="button"
              className="h-full px-3 text-3xl text-gold"
              onClick={() => setActive((i) => (i === 0 ? images.length - 1 : i - 1))}
              aria-label="Previous"
            >
              ‹
            </button>
            <img
              src={images[active]}
              alt=""
              className="max-h-full w-full object-contain"
            />
            <button
              type="button"
              className="h-full px-3 text-3xl text-gold"
              onClick={() => setActive((i) => (i === images.length - 1 ? 0 : i + 1))}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { X } from "lucide-react";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const main = images[0];
  const rest = images.slice(1, 5);

  return (
    <>
      <div className="hidden gap-2 md:grid md:grid-cols-4 md:grid-rows-2">
        <button
          type="button"
          onClick={() => {
            setActive(0);
            setOpen(true);
          }}
          className="md:col-span-2 md:row-span-2"
        >
          <img
            src={main}
            alt={`${name}, principal view`}
            className="h-full min-h-[520px] w-full object-cover"
          />
        </button>
        {rest.map((src, index) => (
          <button
            key={src}
            type="button"
            className="overflow-hidden"
            onClick={() => {
              setActive(index + 1);
              setOpen(true);
            }}
          >
            <img src={src} alt={`${name}, view ${index + 2}`} className="aspect-[4/3] h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 md:hidden">
        {images.slice(0, 4).map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setActive(index);
              setOpen(true);
            }}
            className={index === 0 ? "col-span-2" : ""}
          >
            <img
              src={src}
              alt={`${name}, view ${index + 1}`}
              className={`w-full object-cover ${index === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
            />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="eyebrow text-muted-foreground">{images.length} photographs</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="eyebrow border-b border-gold pb-1"
        >
          View all photographs
        </button>
      </div>

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
              className="h-full min-w-11 px-3 text-3xl text-gold"
              onClick={() => setActive((i) => (i === 0 ? images.length - 1 : i - 1))}
              aria-label="Previous"
            >
              ‹
            </button>
            <img src={images[active]} alt={`${name}, photograph ${active + 1}`} className="max-h-full w-full object-contain" />
            <button
              type="button"
              className="h-full min-w-11 px-3 text-3xl text-gold"
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

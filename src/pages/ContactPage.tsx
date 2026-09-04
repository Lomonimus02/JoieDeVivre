import { type FormEvent, useState } from "react";
import { Ornament } from "@/components/Ornament";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="px-6 pb-28 pt-16 lg:px-10">
      <div className="mx-auto grid max-w-[86rem] gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow text-gold">Enquiries</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] sm:text-6xl">Let’s begin.</h1>
          <p className="mt-8 max-w-xl text-base leading-[1.95] text-muted-foreground">
            A house for a summer, a birthday that deserves better, a week of doing very little.
            There are no wrong answers. Every enquiry is read personally, usually within two days.
          </p>
          <div className="mt-12 space-y-6">
            <p>
              <span className="eyebrow block text-muted-foreground">Email</span>
              <a href="mailto:hello@joiedevivrecollection.com" className="font-serif text-2xl">
                hello@joiedevivrecollection.com
              </a>
            </p>
            <p>
              <span className="eyebrow block text-muted-foreground">Studio hours</span>
              <span className="font-serif text-2xl">Monday – Friday, 09.00 – 18.00 CET</span>
            </p>
          </div>
        </div>

        {sent ? (
          <div className="border border-border bg-blush/30 p-10 text-center">
            <Ornament />
            <p className="mt-8 font-serif text-3xl italic">We have it. We’ll write back.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-7">
            <label className="block">
              <span className="eyebrow text-muted-foreground">Your name</span>
              <input required className="mt-3 w-full border-b border-input bg-transparent py-3 text-lg outline-none" />
            </label>
            <label className="block">
              <span className="eyebrow text-muted-foreground">Email</span>
              <input required type="email" className="mt-3 w-full border-b border-input bg-transparent py-3 text-lg outline-none" />
            </label>
            <label className="block">
              <span className="eyebrow text-muted-foreground">What draws you here?</span>
              <select className="mt-3 w-full border-b border-input bg-transparent py-3 font-serif text-lg outline-none">
                <option>A Private Residence</option>
                <option>A particular room</option>
                <option>A celebration</option>
                <option>Something else entirely</option>
              </select>
            </label>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-muted-foreground">Dates (approximate)</span>
                <input className="mt-3 w-full border-b border-input bg-transparent py-3 text-lg outline-none" />
              </label>
              <label className="block">
                <span className="eyebrow text-muted-foreground">Party size</span>
                <input className="mt-3 w-full border-b border-input bg-transparent py-3 text-lg outline-none" />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow text-muted-foreground">Tell us more</span>
              <textarea rows={5} className="mt-3 w-full border-b border-input bg-transparent py-3 outline-none" />
            </label>
            <button
              type="submit"
              className="eyebrow bg-primary px-10 py-4 text-primary-foreground hover:bg-gold hover:text-primary"
            >
              Send enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

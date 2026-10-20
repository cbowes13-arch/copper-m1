import Image from "next/image";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Button } from "@/components/ui/button";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
} from "@/lib/copper/catalog";

const CAPTIONS: Record<string, string> = {
  "/assets/lifestyle/copper-home-desert-light.png":
    "Copper Home keeps the house running while the desert sun comes up.",
  "/assets/lifestyle/copper-notes-stone-desk.png":
    "Copper Notes clipped on at a stone desk, ready for the next meeting.",
  "/assets/lifestyle/copper-notes-golden-hour.png":
    "Copper Notes catching lecture notes in the golden hour.",
};

const LIFESTYLE_SIZE: Record<string, { width: number; height: number }> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    width: 1672,
    height: 941,
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": { width: 1672, height: 941 },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    width: 1536,
    height: 1024,
  },
};

const ALT: Record<string, string> = {
  "/assets/lifestyle/copper-home-desert-light.png":
    "Copper Home smart speaker on a shelf in warm desert light",
  "/assets/lifestyle/copper-notes-stone-desk.png":
    "Copper Notes clip-on recorder resting on a stone desk",
  "/assets/lifestyle/copper-notes-golden-hour.png":
    "Copper Notes clip-on recorder in golden-hour sunlight",
};

export default function Home() {
  const products = getProducts();
  const plans = getPlans();
  const privacy = getPrivacySummary();
  const home = products.find((p) => p.id === "copper-home")!;
  const notes = products.find((p) => p.id === "copper-notes")!;
  const lifestyle = products.flatMap((p) =>
    p.lifestyle.map((src) => ({ src, product: p.name })),
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          id="top"
          data-testid="hero"
          className="bg-secondary text-secondary-foreground"
        >
          <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
            <div className="flex flex-col items-start gap-5">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Smart helpers, made in Arizona.
              </h1>
              <p className="text-lg">From raw ideas to refined answers.</p>
              <Button asChild size="lg" className="h-11 px-6 text-base">
                <a href="#products">See products</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Image
                src={home.cutout}
                alt="Copper Home smart speaker in Polished Copper"
                width={1254}
                height={1254}
                priority
                className="h-auto w-full"
              />
              <Image
                src={notes.cutout}
                alt="Copper Notes clip-on recorder in Brushed Copper"
                width={1254}
                height={1254}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section
          id="products"
          data-testid="products"
          className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16"
        >
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            Meet the Copper family
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                data-testid="product-card"
                data-product={product.id}
                className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-6"
              >
                <Image
                  src={product.cutout}
                  alt={`${product.name} ${product.type.toLowerCase()}`}
                  width={1254}
                  height={1254}
                  className="mx-auto h-auto w-full max-w-xs"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="text-primary text-2xl font-bold">
                    {formatUsd(product.priceUsd)}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">{product.type}</p>
                <ul className="flex flex-col gap-2 text-sm">
                  {product.features.map((feature) => (
                    <li key={feature.name}>
                      <span className="font-semibold">{feature.name}.</span>{" "}
                      {feature.description}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-auto text-sm">
                  Colors: {product.colors.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="showcase"
          data-testid="showcase"
          className="bg-muted scroll-mt-20"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Made for Arizona living
            </h2>
            {lifestyle.map(({ src }, index) => (
              <figure
                key={src}
                className={`grid items-center gap-6 md:grid-cols-2 ${
                  index % 2 === 1 ? "md:[&>img]:order-2" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={ALT[src]}
                  width={LIFESTYLE_SIZE[src].width}
                  height={LIFESTYLE_SIZE[src].height}
                  className="h-auto w-full rounded-xl"
                />
                <figcaption className="text-lg">{CAPTIONS[src]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          id="plus"
          data-testid="plus-pricing"
          className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16"
        >
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Free or Copper Plus
          </h2>
          <p className="text-muted-foreground mb-8">
            Start free, and upgrade when you want more memory and unlimited
            notes.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => {
              const isPlus = plan.id === "copper-plus";
              return (
                <article
                  key={plan.id}
                  className={`flex flex-col gap-4 rounded-xl border p-6 ${
                    isPlus
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground"
                  }`}
                >
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="text-3xl font-bold">
                    {formatUsd(plan.monthlyUsd)}/month
                  </p>
                  <p className="text-sm">or {formatUsd(plan.annualUsd)}/year</p>
                  <ul className="flex flex-col gap-2">
                    <li>Memory kept: {formatMemory(plan.memoryDays)}</li>
                    <li>
                      Copper Notes recording:{" "}
                      {formatNotesHours(plan.notesHoursPerMonth)}
                    </li>
                    <li>
                      Refined answers:{" "}
                      {plan.refinedAnswers ? "Included" : "Not included"}
                    </li>
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="privacy"
          data-testid="privacy-summary"
          className="bg-muted scroll-mt-20"
        >
          <div className="mx-auto grid max-w-5xl items-start gap-8 px-4 py-16 md:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tight">
                How Copper handles your recordings
              </h2>
              <p className="text-muted-foreground">
                Our {privacy.policy} privacy policy, in plain language.
              </p>
              <ul className="flex list-disc flex-col gap-3 pl-5">
                {privacy.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <Image
              src="/assets/brand/copper-mascot.png"
              alt="Copper the friendly robot mascot"
              width={1254}
              height={1254}
              className="mx-auto h-auto w-40 md:w-56"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

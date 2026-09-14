import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  Code2,
  Coins,
  Lightbulb,
  Menu,
  MessageCircle,
  Network,
  Presentation,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import exchangeHero from "@/assets/exchange-hero.jpg";
import studentsImage from "@/assets/exchange-students.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EXCHANGE — Your Skills Are Your Currency" },
      {
        name: "description",
        content:
          "Learn without upfront cost, teach what you know, and build verified proof of your skills with EXCHANGE.",
      },
      { property: "og:title", content: "EXCHANGE — Your Skills Are Your Currency" },
      {
        property: "og:description",
        content: "A trusted skill exchange network built for university students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Credits", href: "#credits" },
  { label: "Skill Passport", href: "#passport" },
  { label: "Community", href: "#community" },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="EXCHANGE home">
            <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">
              E
            </span>
            <span className="font-display text-base font-bold tracking-normal">EXCHANGE</span>
          </a>

          <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>

          <Button asChild size="sm" className="ml-8 hidden lg:inline-flex">
            <Link to="/auth">Start Exchange <ArrowRight className="size-4" /></Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-3"><Link to="/auth" onClick={() => setMenuOpen(false)}>Start Exchange</Link></Button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[720px] border-b border-border pt-18 lg:min-h-[760px]">
          <img src={exchangeHero} alt="University students from different faculties exchanging knowledge around a table" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative mx-auto flex min-h-[calc(720px-4.5rem)] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:min-h-[calc(760px-4.5rem)] lg:px-10 lg:pb-14">
            <div className="max-w-3xl animate-exchange-rise">
              <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                <span className="h-px w-8 bg-primary" /> Student-powered learning network
              </p>
              <h1 className="font-display text-5xl font-bold leading-[0.98] text-hero-foreground sm:text-6xl lg:text-8xl">
                Your Skills Are<br /><span className="text-primary">Your Currency</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-hero-muted sm:text-lg">
                Learn new skills without upfront cost. Teach what you know. Build verified proof of your abilities.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><Link to="/auth">Start Exchange <ArrowRight className="size-4" /></Link></Button>
                <Button asChild variant="heroOutline" size="lg"><Link to="/auth">Explore Skills <Search className="size-4" /></Link></Button>
              </div>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-hero-border bg-hero-border sm:grid-cols-3 lg:ml-auto lg:w-[58%]">
              <ExchangePair left="Business" right="Coding" icon={<Code2 className="size-4" />} />
              <ExchangePair left="Design" right="Public Speaking" icon={<Presentation className="size-4" />} />
              <ExchangePair left="Research" right="Data Analysis" icon={<BarChart3 className="size-4" />} />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface-light py-20 text-surface-foreground sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro eyebrow="The gap" title="Potential is everywhere. Access isn't." description="University is full of capable people, but the systems around learning and opportunity still leave too much talent unseen." dark />
            <div className="mt-14 grid border-y border-border md:grid-cols-3">
              <Problem number="01" icon={<Coins />} title="Learning new skills can be expensive" text="The skills students need often sit behind fees, subscriptions, and access barriers." />
              <Problem number="02" icon={<Lightbulb />} title="Hidden skills have no proof" text="Students solve real problems every day, but that ability rarely becomes credible evidence." />
              <Problem number="03" icon={<BriefcaseBusiness />} title="Experience asks for experience" text="Opportunities require a track record before students get the chance to build one." />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-18 border-b border-border py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro eyebrow="How it works" title="One exchange. Three moves." description="Find the right peer, trade value through credits, and leave with proof that travels with you." />
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              <Step number="01" icon={<Search />} title="Discover" text="Find students across faculties by skill, availability, and trusted peer reputation." accent="blue" />
              <Step number="02" icon={<Network />} title="Exchange" text="Teach what you know to earn credits. Use those credits to learn what comes next." accent="orange" />
              <Step number="03" icon={<BadgeCheck />} title="Prove" text="Turn completed exchanges and peer assessment into verified skill evidence." accent="blue" />
            </div>
          </div>
        </section>

        <section id="credits" className="scroll-mt-18 border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <div className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
              <p className="text-xs font-semibold uppercase text-primary-soft">The credit economy</p>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight sm:text-5xl">Value moves when knowledge moves.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-primary-muted">
                EXCHANGE credits make learning reciprocal. No upfront payment: contribute your knowledge, earn access to someone else's.
              </p>
              <div className="mt-10 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-primary-border px-4 py-2">No cash price tags</span>
                <span className="rounded-full border border-primary-border px-4 py-2">Every contribution counts</span>
              </div>
            </div>
            <div className="flex items-center justify-center border-t border-primary-border px-5 py-20 sm:px-8 lg:border-l lg:border-t-0 lg:px-10">
              <div className="w-full max-w-lg">
                <CreditFlow icon={<Presentation />} label="Teach a skill" detail="Share what you already know" badge="+ credits" />
                <div className="flex h-16 items-center justify-center"><ArrowDown className="size-5 text-primary-soft" /></div>
                <CreditFlow icon={<Coins />} label="Build your balance" detail="Value stays inside the network" badge="credits" featured />
                <div className="flex h-16 items-center justify-center"><ArrowDown className="size-5 text-primary-soft" /></div>
                <CreditFlow icon={<BookOpen />} label="Unlock learning" detail="Learn from another student" badge="− credits" />
              </div>
            </div>
          </div>
        </section>

        <section id="passport" className="scroll-mt-18 border-b border-border bg-surface-light py-20 text-surface-foreground sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
            <div>
              <SectionIntro eyebrow="Skill Passport" title="Proof that grows with you." description="Not a list of claims. A living professional profile built from real exchanges, peer assessment, and demonstrated skill." dark />
              <ul className="mt-10 grid gap-5 sm:grid-cols-2">
                <PassportPoint icon={<BadgeCheck />} label="Verified skills" />
                <PassportPoint icon={<BookOpen />} label="Teaching history" />
                <PassportPoint icon={<BarChart3 />} label="Assessment" />
                <PassportPoint icon={<Star />} label="Reputation" />
              </ul>
            </div>
            <PassportCard />
          </div>
        </section>

        <section id="community" className="scroll-mt-18 border-b border-border py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro eyebrow="The network" title="Built on campus. Ready for the world." description="EXCHANGE connects the people who build skills, the institutions that nurture them, and the companies searching for credible talent." />
            <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
              <Community icon={<Users />} title="Students" stat="Exchange knowledge" text="Build confidence, access new skills, and create a visible record of contribution." />
              <Community icon={<Building2 />} title="Faculties" stat="Connect disciplines" text="Turn the whole university into a collaborative learning environment." />
              <Community icon={<BriefcaseBusiness />} title="Companies" stat="Discover proof" text="See emerging talent through verified skills, not credentials alone." />
            </div>
          </div>
        </section>

        <section id="join" className="scroll-mt-18 bg-accent py-20 text-accent-foreground sm:py-24">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-9 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase">Your next skill is already on campus</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">What will you exchange first?</h2>
            </div>
            <Button asChild variant="dark" size="lg" className="shrink-0"><a href="#how-it-works">Explore the exchange <ArrowRight className="size-4" /></a></Button>
          </div>
        </section>
      </main>

      <footer className="bg-background py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 text-foreground"><span className="grid size-8 place-items-center rounded-md bg-primary font-display font-bold text-primary-foreground">E</span><span className="font-display font-bold">EXCHANGE</span></div>
          <p>Knowledge belongs in motion.</p>
          <p>Universitas Indonesia pilot</p>
        </div>
      </footer>
    </div>
  );
}

function ExchangePair({ left, right, icon }: { left: string; right: string; icon: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-4 bg-hero-panel px-4 py-4 text-xs text-hero-foreground backdrop-blur-md"><span>{left}</span><span className="flex items-center gap-2 text-primary">{icon}<ArrowRight className="size-3" /></span><span className="text-right">{right}</span></div>;
}

function SectionIntro({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) {
  return <div className="grid gap-6 lg:grid-cols-[0.8fr_1.5fr_1fr] lg:items-end"><p className={cn("text-xs font-semibold uppercase", dark ? "text-primary" : "text-accent")}>{eyebrow}</p><h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h2><p className={cn("max-w-md text-sm leading-6 lg:justify-self-end", dark ? "text-surface-muted" : "text-muted-foreground")}>{description}</p></div>;
}

function Problem({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) {
  return <article className="border-b border-border py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-surface-muted">{number}</span><span className="text-primary [&>svg]:size-5">{icon}</span></div><h3 className="mt-12 max-w-xs font-display text-xl font-bold">{title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-surface-muted">{text}</p></article>;
}

function Step({ number, icon, title, text, accent }: { number: string; icon: React.ReactNode; title: string; text: string; accent: "blue" | "orange" }) {
  return <article className="group relative min-h-72 overflow-hidden rounded-md border border-border bg-card p-7 transition-transform hover:-translate-y-1"><div className={cn("absolute inset-x-0 top-0 h-1", accent === "blue" ? "bg-primary" : "bg-accent")} /><div className="flex items-start justify-between"><span className={cn("grid size-12 place-items-center rounded-md", accent === "blue" ? "bg-secondary text-primary" : "bg-accent-soft text-accent")}>{icon}</span><span className="font-display text-5xl font-bold text-border">{number}</span></div><h3 className="mt-14 font-display text-2xl font-bold">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{text}</p></article>;
}

function CreditFlow({ icon, label, detail, badge, featured = false }: { icon: React.ReactNode; label: string; detail: string; badge: string; featured?: boolean }) {
  return <div className={cn("flex items-center gap-4 rounded-md border p-5", featured ? "border-accent bg-accent text-accent-foreground" : "border-primary-border bg-primary-panel")}><span className={cn("grid size-11 shrink-0 place-items-center rounded-md [&>svg]:size-5", featured ? "bg-accent-foreground text-accent" : "bg-primary-foreground text-primary")}>{icon}</span><div className="min-w-0"><p className="font-semibold">{label}</p><p className={cn("mt-1 text-xs", featured ? "text-accent-foreground/75" : "text-primary-muted")}>{detail}</p></div><span className={cn("ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-semibold", featured ? "bg-accent-foreground text-accent" : "border border-primary-border text-primary-soft")}>{badge}</span></div>;
}

function PassportPoint({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <li className="flex items-center gap-3 text-sm font-medium"><span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground [&>svg]:size-4">{icon}</span>{label}</li>;
}

function PassportCard() {
  return <div className="relative mx-auto w-full max-w-xl rounded-md border border-border bg-card shadow-passport"><div className="h-2 rounded-t-md bg-primary" /><div className="p-5 sm:p-8"><div className="flex items-start gap-4"><div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-secondary"><img src={studentsImage} alt="Dita Prameswari" width={1024} height={1024} loading="lazy" className="absolute left-0 bottom-0 size-[200%] max-w-none object-cover object-left-bottom" /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-display text-xl font-bold">Dita Prameswari</h3><BadgeCheck className="size-5 text-primary" /></div><p className="mt-1 text-xs text-muted-foreground">Economics · Universitas Indonesia</p><div className="mt-3 flex items-center gap-2 text-xs"><Star className="size-3.5 fill-accent text-accent" /><strong>4.9</strong><span className="text-muted-foreground">from 31 exchanges</span></div></div></div><div className="mt-8 grid grid-cols-3 gap-2 border-y border-border py-5 text-center"><PassportStat value="12" label="Skills" /><PassportStat value="18" label="Taught" /><PassportStat value="248" label="Credits" /></div><div className="mt-6"><div className="mb-4 flex items-center justify-between"><p className="text-xs font-semibold uppercase text-muted-foreground">Verified skills</p><ShieldCheck className="size-4 text-primary" /></div><div className="space-y-3"><SkillRow skill="UI Sketching" level="Advanced" width="w-[88%]" /><SkillRow skill="Financial Modeling" level="Proficient" width="w-[72%]" /><SkillRow skill="Public Speaking" level="Developing" width="w-[48%]" /></div></div><div className="mt-7 flex items-center gap-2 rounded-md bg-secondary p-3 text-xs text-primary"><Sparkles className="size-4" /><span><strong>Passport verified</strong> through peer exchanges</span></div></div></div>;
}

function PassportStat({ value, label }: { value: string; label: string }) { return <div><p className="font-display text-xl font-bold">{value}</p><p className="mt-1 text-[11px] text-muted-foreground">{label}</p></div>; }
function SkillRow({ skill, level, width }: { skill: string; level: string; width: string }) { return <div><div className="mb-2 flex justify-between gap-3 text-xs"><span className="font-medium">{skill}</span><span className="text-muted-foreground">{level}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-secondary"><div className={cn("h-full rounded-full bg-primary animate-passport-fill", width)} /></div></div>; }

function Community({ icon, title, stat, text }: { icon: React.ReactNode; title: string; stat: string; text: string }) {
  return <article className="bg-card p-7 sm:p-9"><span className="grid size-12 place-items-center rounded-md bg-secondary text-primary [&>svg]:size-5">{icon}</span><p className="mt-10 text-xs font-semibold uppercase text-accent">{stat}</p><h3 className="mt-2 font-display text-2xl font-bold">{title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{text}</p><div className="mt-8 flex items-center gap-2 text-xs font-semibold text-primary"><Check className="size-4" /> Part of one trusted network</div></article>;
}
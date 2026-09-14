import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  Code2,
  Coins,
  Compass,
  Languages,
  Palette,
  FlaskConical,
  Star,
  Trophy,
  Users,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const exploreSearchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "all").default("all"),
  goal: fallback(z.string(), "all").default("all"),
});

export const Route = createFileRoute("/_authenticated/_workspace/explore")({
  validateSearch: zodValidator(exploreSearchSchema),
  head: () => ({
    meta: [
      { title: "Explore Skills — EXCHANGE" },
      { name: "description", content: "Exchange knowledge with verified students across campus. Find a skill, meet the teacher, grow together." },
      { property: "og:title", content: "Explore Skills — EXCHANGE" },
      { property: "og:description", content: "Exchange knowledge with verified students across campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ExplorePage,
});

const categories = [
  { id: "all", label: "All", icon: Compass },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "technology", label: "Technology", icon: Code2 },
  { id: "design", label: "Design", icon: Palette },
  { id: "language", label: "Language", icon: Languages },
  { id: "research", label: "Research", icon: FlaskConical },
] as const;

const goals = [
  { id: "all", label: "All goals", icon: Compass },
  { id: "internship", label: "Internship", icon: Building2 },
  { id: "competition", label: "Competition", icon: Trophy },
  { id: "organization", label: "Organization", icon: Users },
  { id: "career", label: "Career", icon: Briefcase },
] as const;

type Skill = {
  name: string;
  level: string;
  teacher: string;
  faculty: string;
  verified: boolean;
  rating: number;
  sessions: number;
  outcome: string;
  credits: number;
  category: string;
  goals: string[];
};

const skills: Skill[] = [
  { name: "Financial Modeling", level: "Beginner", teacher: "Nadia", faculty: "FEB UI", verified: true, rating: 4.9, sessions: 8, outcome: "Build a 3-statement model from scratch for a real company case.", credits: 5, category: "business", goals: ["internship", "competition", "career"] },
  { name: "React Fundamentals", level: "Beginner", teacher: "Raka", faculty: "Fasilkom UI", verified: true, rating: 4.8, sessions: 12, outcome: "Ship a small working web app with components, state, and routing.", credits: 6, category: "technology", goals: ["internship", "organization", "career"] },
  { name: "Public Speaking", level: "Intermediate", teacher: "Sinta", faculty: "FISIP UI", verified: true, rating: 5.0, sessions: 15, outcome: "Deliver a confident 10-minute presentation with live feedback.", credits: 4, category: "language", goals: ["competition", "organization", "career"] },
  { name: "UI Design with Figma", level: "Beginner", teacher: "Bima", faculty: "FT UI", verified: false, rating: 4.6, sessions: 5, outcome: "Design a complete mobile app screen set ready for handoff.", credits: 5, category: "design", goals: ["internship", "organization"] },
  { name: "Academic Research Methods", level: "Intermediate", teacher: "Dr. Ayu (TA)", faculty: "FIB UI", verified: true, rating: 4.9, sessions: 10, outcome: "Structure a literature review and methodology for your paper.", credits: 6, category: "research", goals: ["competition", "career"] },
  { name: "Business English", level: "Intermediate", teacher: "Kevin", faculty: "FIB UI", verified: true, rating: 4.7, sessions: 9, outcome: "Handle interviews and professional emails with confidence.", credits: 4, category: "language", goals: ["internship", "career"] },
  { name: "Data Analysis with Python", level: "Beginner", teacher: "Farhan", faculty: "FMIPA UI", verified: true, rating: 4.8, sessions: 11, outcome: "Clean, analyze, and visualize a real dataset end to end.", credits: 6, category: "technology", goals: ["internship", "competition", "career"] },
  { name: "Pitch Deck Storytelling", level: "Beginner", teacher: "Laras", faculty: "FEB UI", verified: false, rating: 4.5, sessions: 4, outcome: "Turn your idea into a 10-slide deck that wins judges over.", credits: 4, category: "business", goals: ["competition", "organization"] },
  { name: "Poster & Layout Design", level: "Beginner", teacher: "Maya", faculty: "FT UI", verified: true, rating: 4.7, sessions: 7, outcome: "Produce print-ready event posters for your organization.", credits: 3, category: "design", goals: ["organization"] },
];

function ExplorePage() {
  const { q, category, goal } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = skills.filter((s) => {
    const query = q.trim().toLowerCase();
    const matchesQuery = !query || `${s.name} ${s.teacher} ${s.faculty} ${s.outcome}`.toLowerCase().includes(query);
    const matchesCategory = category === "all" || s.category === category;
    const matchesGoal = goal === "all" || s.goals.includes(goal);
    return matchesQuery && matchesCategory && matchesGoal;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-10">
      <p className="text-[11px] font-semibold uppercase text-primary">Knowledge exchange</p>
      <div className="mt-2 border-b border-workspace-border pb-7">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Explore Skills</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-workspace-muted">
          No one is selling courses here. Every card is a fellow student ready to exchange what they know — verified by real sessions, rated by real learners.
        </p>
      </div>

      {/* Search */}
      <div className="mt-6">
        <input
          value={q}
          onChange={(e) => navigate({ search: (prev) => ({ ...prev, q: e.target.value }), replace: true })}
          placeholder="Search a skill, teacher, or faculty…"
          aria-label="Search skills"
          className="h-11 w-full max-w-lg rounded-md border border-workspace-border bg-workspace-card px-4 text-sm outline-none placeholder:text-workspace-muted focus:border-primary"
        />
      </div>

      {/* Filters */}
      <div className="mt-5 space-y-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          <span className="mr-1 text-[11px] font-semibold uppercase text-workspace-muted">Category</span>
          {categories.map((c) => {
            const Icon = c.icon;
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => navigate({ search: (prev) => ({ ...prev, category: c.id }), replace: true })}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-workspace-border bg-workspace-card text-workspace-muted hover:text-workspace-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {c.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by goal">
          <span className="mr-1 text-[11px] font-semibold uppercase text-workspace-muted">Goal</span>
          {goals.map((g) => {
            const Icon = g.icon;
            const active = goal === g.id;
            return (
              <button
                key={g.id}
                onClick={() => navigate({ search: (prev) => ({ ...prev, goal: g.id }), replace: true })}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-workspace-border bg-workspace-card text-workspace-muted hover:text-workspace-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <p className="mt-7 text-xs text-workspace-muted">
        {filtered.length} skill{filtered.length === 1 ? "" : "s"} open for exchange
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => (
          <SkillCard key={`${skill.name}-${skill.teacher}`} skill={skill} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-md border border-dashed border-workspace-border bg-workspace-card p-10 text-center">
            <p className="font-display text-base font-bold">No match yet</p>
            <p className="mt-2 text-sm text-workspace-muted">Try a different keyword, category, or goal — or teach this skill yourself.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="flex flex-col rounded-md border border-workspace-border bg-workspace-card p-5 transition-shadow hover:shadow-md">
      {/* Skill identity */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-bold leading-snug">{skill.name}</h2>
          <p className="mt-0.5 text-xs text-workspace-muted">{skill.level}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-strong">
          <Coins className="size-3.5" />
          {skill.credits} Credits
        </span>
      </div>

      {/* Teacher + trust */}
      <div className="mt-4 flex items-center gap-3 rounded-md bg-workspace-soft p-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary-panel font-display text-sm font-bold text-primary-strong">
          {skill.teacher.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-semibold">
            <span className="truncate">{skill.teacher}</span>
            <span className="text-workspace-muted">·</span>
            <span className="truncate text-xs font-normal text-workspace-muted">{skill.faculty}</span>
          </p>
          {skill.verified ? (
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-primary-strong">
              <BadgeCheck className="size-3.5" /> Verified Skill
            </p>
          ) : (
            <p className="mt-0.5 text-[11px] text-workspace-muted">Verification in progress</p>
          )}
        </div>
      </div>

      {/* Social proof */}
      <div className="mt-3 flex items-center gap-4 text-xs text-workspace-muted">
        <span className="flex items-center gap-1 font-semibold text-workspace-foreground">
          <Star className="size-3.5 fill-accent text-accent" />
          {skill.rating.toFixed(1)}
        </span>
        <span>{skill.sessions} sessions completed</span>
      </div>

      {/* Outcome */}
      <p className="mt-3 flex-1 text-sm leading-6 text-workspace-muted">
        <span className="font-medium text-workspace-foreground">You'll walk away able to: </span>
        {skill.outcome}
      </p>

      {/* Action */}
      <button className="mt-4 flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
        Request exchange <ArrowRight className="size-4" />
      </button>
    </article>
  );
}

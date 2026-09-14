import { createFileRoute } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  BookOpenCheck,
  GraduationCap,
  Presentation,
  Star,
  Download,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/_workspace/passport")({
  head: () => ({
    meta: [
      { title: "Skill Passport — EXCHANGE" },
      { name: "description", content: "A verified competency profile built from real skill exchanges — ready to show recruiters." },
      { property: "og:title", content: "Skill Passport — EXCHANGE" },
      { property: "og:description", content: "A verified competency profile built from real skill exchanges." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PassportPage,
});

const workspaceApi = getRouteApi("/_authenticated/_workspace");

type VerifiedSkill = {
  name: string;
  level: string;
  category: string;
  score: number;
  evidence: { label: string; met: boolean }[];
};

const verifiedSkills: VerifiedSkill[] = [
  {
    name: "Excel Modeling",
    level: "Verified Beginner",
    category: "Business",
    score: 82,
    evidence: [
      { label: "Learned from 3 mentors", met: true },
      { label: "Taught 5 students", met: true },
      { label: "Passed assessment", met: true },
      { label: "Rating 4.8 from learners", met: true },
    ],
  },
  {
    name: "Data Analysis with Python",
    level: "Verified Intermediate",
    category: "Technology",
    score: 74,
    evidence: [
      { label: "Learned from 2 mentors", met: true },
      { label: "Taught 3 students", met: true },
      { label: "Passed assessment", met: true },
      { label: "Rating 4.6 from learners", met: true },
    ],
  },
  {
    name: "Public Speaking",
    level: "In progress",
    category: "Language",
    score: 41,
    evidence: [
      { label: "Learned from 2 mentors", met: true },
      { label: "Taught 1 student", met: true },
      { label: "Assessment scheduled", met: false },
      { label: "Rating 4.5 so far", met: true },
    ],
  },
];

function PassportPage() {
  const { user } = workspaceApi.useRouteContext();
  const profile = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, faculty, university, reputation, profile_strength, credits")
        .eq("id", user.id)
        .maybeSingle();
      return data;
    },
  });

  const name = profile.data?.display_name || String(user.user_metadata["display_name"] ?? user.email?.split("@")[0] ?? "Student");
  const faculty = profile.data?.faculty || String(user.user_metadata["faculty"] ?? "—");
  const university = profile.data?.university || "Universitas Indonesia";
  const reputation = Number(profile.data?.reputation ?? 0);
  const skillScore = profile.data?.profile_strength ?? 20;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-7 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase text-primary">Competency profile</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Skill Passport</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-workspace-muted">
            Not a social profile — a verified record of what you can actually do, built session by session. Share it with recruiters.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex h-9 items-center gap-1.5 rounded-md border border-workspace-border bg-workspace-card px-3 text-sm font-medium text-workspace-foreground transition-colors hover:bg-workspace-soft">
            <Share2 className="size-4" /> Share
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
            <Download className="size-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Identity + score */}
      <section className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]" aria-label="Student identity">
        <div className="rounded-md border border-workspace-border bg-workspace-card p-6">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-md bg-primary-panel font-display text-xl font-bold text-primary-strong">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="flex items-center gap-2 font-display text-xl font-bold">
                {name}
                <ShieldCheck className="size-5 text-primary" aria-label="Identity verified" />
              </p>
              <p className="mt-1 text-sm text-workspace-muted">{faculty} · {university}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
                <span className="rounded-full bg-workspace-soft px-2.5 py-1 text-workspace-muted">Member of EXCHANGE</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent-foreground">⭐ {reputation > 0 ? reputation.toFixed(1) : "New"} peer reputation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-md border border-workspace-border bg-sidebar px-8 py-6 text-center">
          <p className="text-[11px] font-semibold uppercase text-sidebar-muted">Skill score</p>
          <p className="mt-1 font-display text-5xl font-bold text-sidebar-foreground">{skillScore}</p>
          <div className="mt-3 h-1.5 w-36 overflow-hidden rounded-full bg-sidebar-border">
            <div className="h-full bg-primary" style={{ width: `${skillScore}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-sidebar-muted">of 100 · grows with verified activity</p>
        </div>
      </section>

      {/* Verified skills */}
      <section className="mt-10" aria-label="Verified skills">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold">Verified skills</h2>
          <p className="text-xs text-workspace-muted">{verifiedSkills.filter((s) => s.level.startsWith("Verified")).length} verified · {verifiedSkills.length} total</p>
        </div>

        <div className="mt-4 space-y-4">
          {verifiedSkills.map((skill) => (
            <article key={skill.name} className="rounded-md border border-workspace-border bg-workspace-card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-base font-bold">{skill.name}</span>
                    <span
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        skill.level.startsWith("Verified")
                          ? "bg-primary-soft text-primary-strong"
                          : "bg-workspace-soft text-workspace-muted"
                      )}
                    >
                      {skill.level.startsWith("Verified") && <BadgeCheck className="size-3.5" />}
                      {skill.level}
                    </span>
                    <span className="rounded-full bg-workspace-soft px-2.5 py-0.5 text-[11px] text-workspace-muted">{skill.category}</span>
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] uppercase text-workspace-muted">Competency</p>
                  <p className="font-display text-2xl font-bold">{skill.score}<span className="text-sm text-workspace-muted">/100</span></p>
                </div>
              </div>

              {/* Evidence ledger */}
              <div className="mt-4 rounded-md bg-workspace-soft p-4">
                <p className="text-[11px] font-semibold uppercase text-workspace-muted">Evidence</p>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {skill.evidence.map((ev) => (
                    <li key={ev.label} className={cn("flex items-center gap-2 text-sm", ev.met ? "text-workspace-foreground" : "text-workspace-muted")}>
                      {ev.label.includes("Taught") ? (
                        <Presentation className={cn("size-4 shrink-0", ev.met ? "text-primary" : "text-workspace-muted")} />
                      ) : ev.label.includes("assessment") || ev.label.includes("Assessment") ? (
                        <BookOpenCheck className={cn("size-4 shrink-0", ev.met ? "text-primary" : "text-workspace-muted")} />
                      ) : ev.label.includes("Rating") ? (
                        <Star className={cn("size-4 shrink-0", ev.met ? "fill-accent text-accent" : "text-workspace-muted")} />
                      ) : (
                        <GraduationCap className={cn("size-4 shrink-0", ev.met ? "text-primary" : "text-workspace-muted")} />
                      )}
                      <span className={cn(ev.met && "font-medium")}>
                        {ev.met ? "✓ " : ""}{ev.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recruiter note */}
      <section className="mt-8 rounded-md border border-primary-border bg-primary-panel p-5" aria-label="For recruiters">
        <p className="text-sm leading-6 text-workspace-foreground">
          <span className="font-semibold">For recruiters:</span> every line above is backed by completed exchanges on EXCHANGE — sessions attended, students taught, assessments passed, and peer ratings. No self-reported claims.
        </p>
      </section>
    </div>
  );
}

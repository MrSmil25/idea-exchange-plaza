import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpenCheck,
  Clock,
  Download,
  GraduationCap,
  Presentation,
  Repeat2,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import {
  currentStudent,
  learningJourney,
  passportSkills,
  teachingHours,
} from "@/data/exchange";
import { EmptyState } from "@/components/exchange/empty-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/_workspace/passport")({
  head: () => ({
    meta: [
      { title: "Skill Passport — EXCHANGE" },
      {
        name: "description",
        content:
          "A verified competency profile built from real peer exchanges: evidence, contribution, and a learning journey recruiters can read.",
      },
      { property: "og:title", content: "Skill Passport — EXCHANGE" },
      { property: "og:description", content: "A verified competency profile built from real exchanges." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PassportPage,
});

function PassportPage() {
  const me = currentStudent;
  const entries = passportSkills(me);
  const verifiedCount = entries.filter((e) => e.verified).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-7 sm:py-12">
      {/* Profile header */}
      <header className="rounded-lg border border-workspace-border bg-workspace-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="grid size-16 shrink-0 place-items-center rounded-lg bg-primary-soft font-display text-xl font-bold text-primary-strong"
            >
              {me.photo}
            </span>
            <div>
              <p className="flex items-center gap-2 font-display text-2xl font-bold">
                {me.name}
                <ShieldCheck className="size-5 text-primary" aria-label="Identity verified" />
              </p>
              <p className="mt-1 text-sm text-workspace-muted">
                {me.faculty} · {me.major} · Year {me.year}
              </p>
              <p className="mt-3 max-w-lg text-sm leading-6 text-workspace-muted">{me.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-primary-strong">
                  {me.level}
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent-foreground">
                  ⭐ {me.rating.toFixed(1)} peer rating
                </span>
                <span className="rounded-full bg-workspace-soft px-2.5 py-1 text-workspace-muted">
                  {verifiedCount} verified skills
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div className="rounded-lg bg-sidebar px-6 py-4 text-center text-sidebar-foreground">
              <p className="text-[11px] font-semibold uppercase text-sidebar-muted">Skill Score</p>
              <p className="mt-1 font-display text-4xl font-bold">{me.skillScore}</p>
              <p className="text-[11px] text-sidebar-muted">Top 12% on campus</p>
            </div>
            <div className="flex gap-2">
              <button className="flex h-9 items-center gap-1.5 rounded-md border border-workspace-border bg-workspace-card px-3 text-sm font-medium transition-colors hover:bg-workspace-soft">
                <Share2 className="size-4" /> Share profile
              </button>
              <button className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
                <Download className="size-4" /> Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Verified skills */}
      <section className="mt-10" aria-label="Verified skills">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold">Verified skills</h2>
          <p className="text-xs text-workspace-muted">
            {verifiedCount} verified · {entries.length} tracked
          </p>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            className="mt-4"
            icon={<BadgeCheck className="size-5" />}
            title="Your Skill Passport is waiting."
            description="Complete your first exchange and start building a professional identity backed by evidence, not claims."
            actionLabel="Explore your first skill"
            actionTo="/explore"
          />
        ) : (
          <div className="mt-4 space-y-4">
            {entries.map((entry) => (
              <article
                key={entry.skill.id}
                className="rounded-lg border border-workspace-border bg-workspace-card p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-base font-bold">{entry.skill.name}</span>
                      <span
                        className={cn(
                          "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                          entry.verified
                            ? "bg-primary-soft text-primary-strong"
                            : "bg-workspace-soft text-workspace-muted"
                        )}
                      >
                        {entry.verified && <BadgeCheck className="size-3.5" />}
                        {entry.level}
                      </span>
                    </p>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-workspace-muted">
                      {entry.skill.outcomes[0]}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[11px] uppercase text-workspace-muted">Competency</p>
                    <p className="font-display text-2xl font-bold">
                      {entry.competency}
                      <span className="text-sm text-workspace-muted">/100</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-md bg-workspace-soft p-4">
                  <p className="text-[11px] font-semibold uppercase text-workspace-muted">Evidence</p>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {entry.evidence.map((ev) => (
                      <li
                        key={ev.label}
                        className={cn(
                          "flex items-center gap-2 text-sm",
                          ev.met ? "font-medium text-workspace-foreground" : "text-workspace-muted"
                        )}
                      >
                        {ev.label.includes("Taught") || ev.label.includes("Not taught") ? (
                          <Presentation
                            className={cn("size-4 shrink-0", ev.met ? "text-primary" : "text-workspace-muted")}
                          />
                        ) : ev.label.toLowerCase().includes("assessment") ? (
                          <BookOpenCheck
                            className={cn("size-4 shrink-0", ev.met ? "text-primary" : "text-workspace-muted")}
                          />
                        ) : ev.label.includes("Rating") ? (
                          <Star
                            className={cn(
                              "size-4 shrink-0",
                              ev.met ? "fill-accent text-accent" : "text-workspace-muted"
                            )}
                          />
                        ) : (
                          <GraduationCap
                            className={cn("size-4 shrink-0", ev.met ? "text-primary" : "text-workspace-muted")}
                          />
                        )}
                        <span>
                          {ev.met ? "✓ " : ""}
                          {ev.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Contribution */}
      <section className="mt-10" aria-label="Contribution">
        <h2 className="font-display text-xl font-bold">Contribution</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Contribution
            icon={<Clock className="size-4" />}
            value={`${teachingHours(me)} hours`}
            label="Knowledge shared"
          />
          <Contribution
            icon={<Users className="size-4" />}
            value={String(me.studentsHelped)}
            label="Students helped"
          />
          <Contribution
            icon={<Repeat2 className="size-4" />}
            value={String(me.exchangesCompleted)}
            label="Exchanges completed"
          />
        </div>
      </section>

      {/* Learning journey */}
      <section className="mt-10" aria-label="Learning journey">
        <h2 className="font-display text-xl font-bold">Learning journey</h2>
        <div className="mt-4 rounded-lg border border-workspace-border bg-workspace-card p-6">
          <ol className="space-y-7">
            {learningJourney.map((month) => (
              <li key={month.month} className="relative border-l border-workspace-border pl-6">
                <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary" />
                <p className="font-display text-sm font-bold">{month.month}</p>
                <ul className="mt-2 space-y-1.5">
                  {month.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-workspace-muted">
                      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-primary-border bg-primary-panel p-6" aria-label="For recruiters">
        <p className="text-sm leading-7 text-workspace-foreground">
          <span className="font-semibold">For recruiters:</span> every line above is generated from completed
          exchanges on EXCHANGE — sessions attended, students taught, assessments passed, and peer ratings.
          Nothing here is self-reported.
        </p>
      </section>
    </div>
  );
}

function Contribution({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-lg border border-workspace-border bg-workspace-card p-5">
      <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary-strong">
        {icon}
      </span>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide text-workspace-muted">{label}</p>
    </div>
  );
}

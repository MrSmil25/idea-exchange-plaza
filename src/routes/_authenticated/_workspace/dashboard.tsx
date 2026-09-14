import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, CalendarDays, Check, ChevronRight, CircleDot, Coins, Flame, Plus, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentAvatar } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/_workspace/dashboard")({
  head: () => ({ meta: [
    { title: "Dashboard — EXCHANGE" },
    { name: "description", content: "Grow your verified student skill identity on EXCHANGE." },
    { property: "og:title", content: "Dashboard — EXCHANGE" },
    { property: "og:description", content: "Grow your verified student skill identity on EXCHANGE." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useRouteContext();
  const profile = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) return data;
      const metadata = user.user_metadata;
      const draft = { id: user.id, display_name: String(metadata["display_name"] ?? user.email?.split("@")[0] ?? "Student"), faculty: String(metadata["faculty"] ?? "Universitas Indonesia"), university: "Universitas Indonesia" };
      const { data: created, error } = await supabase.from("profiles").insert(draft).select().single();
      if (error) throw error;
      return created;
    },
  });
  const firstName = profile.data?.display_name.split(" ")[0] || "Dita";

  return <div className="mx-auto max-w-6xl px-4 py-7 sm:px-7 sm:py-10"><div className="flex flex-col gap-6 border-b border-workspace-border pb-8 md:flex-row md:items-end md:justify-between"><div><p className="text-xs text-workspace-muted">Monday, 14 September · Depok</p><h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Good morning, {firstName}.</h1><p className="mt-3 text-sm text-workspace-muted">Your next exchange can make another skill visible.</p></div><div className="flex gap-2"><Button asChild variant="outline" className="border-workspace-border bg-workspace-card"><Link to="/teach"><Plus className="size-4" /> Offer a skill</Link></Button><Button asChild><Link to="/explore">Find an exchange <ArrowRight className="size-4" /></Link></Button></div></div>

    <section className="grid gap-4 py-6 md:grid-cols-[1.55fr_.8fr]">
      <div className="rounded-md border border-workspace-border bg-workspace-card p-5 sm:p-6"><div className="flex items-start justify-between gap-5"><div><p className="text-[11px] font-semibold uppercase text-primary">Skill Passport · Level 4</p><h2 className="mt-2 font-display text-xl font-bold">Your identity is taking shape</h2><p className="mt-2 max-w-lg text-sm leading-6 text-workspace-muted">Complete one teaching session and verify Data Storytelling to reach 85% profile strength.</p></div><div className="grid size-14 shrink-0 place-items-center rounded-md bg-workspace-soft font-display text-lg font-bold text-primary">78%</div></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-workspace-soft"><div className="h-full w-[78%] bg-primary" /></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><Signal icon={<BadgeCheck />} value="4" label="Verified skills" /><Signal icon={<Star />} value="4.9" label="Peer reputation" /><Signal icon={<Users />} value="31" label="Trusted sessions" /></div><Link to="/passport" className="mt-6 flex items-center justify-between border-t border-workspace-border pt-4 text-sm font-semibold">Open Skill Passport <ChevronRight className="size-4" /></Link></div>
      <div className="rounded-md bg-sidebar p-6 text-sidebar-foreground"><p className="text-[11px] font-semibold uppercase text-primary">Credit balance</p><div className="mt-5 flex items-center gap-3"><Coins className="size-7 text-accent" /><span className="font-display text-4xl font-bold">{profile.data?.credits ?? 100}</span></div><p className="mt-2 text-sm text-sidebar-muted">Available to unlock learning</p><div className="my-6 h-px bg-sidebar-border" /><p className="text-sm font-semibold">Teach UI Sketching</p><p className="mt-1 text-xs text-sidebar-muted">Earn 45 credits · 2 requests</p><Button asChild variant="secondary" className="mt-5 w-full"><Link to="/wallet">View wallet</Link></Button></div>
    </section>

    <section className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]"><div className="rounded-md border border-workspace-border bg-workspace-card"><div className="flex items-center justify-between border-b border-workspace-border p-5"><div><p className="text-[11px] font-semibold uppercase text-primary">Next on your calendar</p><h2 className="mt-1 font-display text-lg font-bold">Active exchanges</h2></div><Button asChild variant="workspaceGhost" size="sm"><Link to="/sessions">All sessions</Link></Button></div><Session date="Today · 15:30" skill="Data Storytelling in Figma" peer="Reza Aditya · Computer Science" mode="Learning" /><Session date="Saturday · 10:00" skill="UI Sketching for Product Ideas" peer="Alya Kusuma · Psychology" mode="Teaching" /></div><div className="rounded-md border border-workspace-border bg-workspace-card p-5"><p className="text-[11px] font-semibold uppercase text-primary">Weekly momentum</p><div className="mt-5 flex items-center gap-3"><Flame className="size-6 text-accent" /><p className="font-display text-2xl font-bold">3 week streak</p></div><div className="mt-6 flex justify-between">{[true,true,true,true,false,false,false].map((done, index) => <div key={index} className={`grid size-7 place-items-center rounded-md text-[10px] font-semibold ${done ? "bg-primary text-primary-foreground" : "bg-workspace-soft text-workspace-muted"}`}>{done ? <Check className="size-3" /> : index + 1}</div>)}</div><p className="mt-5 text-xs leading-5 text-workspace-muted">One meaningful exchange each week builds a stronger reputation signal.</p></div></section>

    <section className="mt-4 rounded-md border border-workspace-border bg-workspace-card p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><div className="grid size-10 place-items-center rounded-md bg-accent/15 text-accent"><Sparkles className="size-5" /></div><div><h2 className="font-display font-bold">Recommended next move</h2><p className="mt-1 text-sm text-workspace-muted">Ask Nadia from Accounting to verify your Financial Modeling foundations.</p></div></div><Button asChild variant="outline" className="border-workspace-border"><Link to="/explore">View match <ArrowRight className="size-4" /></Link></Button></div></section>
  </div>;
}

function Signal({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) { return <div className="rounded-md bg-workspace-soft p-3"><div className="flex items-center gap-2 text-primary">{icon}<span className="font-display text-lg font-bold text-workspace-foreground">{value}</span></div><p className="mt-1 text-[11px] text-workspace-muted">{label}</p></div>; }
function Session({ date, skill, peer, mode }: { date: string; skill: string; peer: string; mode: string }) { return <div className="flex items-center gap-4 border-b border-workspace-border p-5 last:border-0"><div className="grid size-10 shrink-0 place-items-center rounded-md bg-workspace-soft"><CalendarDays className="size-4 text-primary" /></div><div className="min-w-0 flex-1"><p className="text-xs text-workspace-muted">{date} · {mode}</p><h3 className="mt-1 truncate text-sm font-semibold">{skill}</h3><p className="mt-1 truncate text-xs text-workspace-muted">{peer}</p></div><CircleDot className="size-4 text-primary" /></div>; }
# EXCHANGE authenticated student workspace

## What will be built
- Add account creation and sign-in with email/password and Google.
- Store a secure student profile with identity, faculty, skills, reputation, credits, and onboarding progress.
- Create a protected workspace at `/dashboard` with the requested sidebar: Dashboard, Explore Skills, My Sessions, Teach, Skill Passport, Wallet, Referral, and Profile.
- Make the dashboard prioritize skill identity growth: profile strength, verified skills, active exchanges, teaching momentum, and useful next actions.
- Keep the public landing page at `/`, with its main actions leading into account access.

## Experience
- Use a focused Notion-like workspace structure with LinkedIn-like identity and trust signals.
- Preserve EXCHANGE’s deep navy, electric blue, and orange brand while shifting signed-in content to a clear, bright working surface.
- Provide a compact mobile navigation drawer and desktop sidebar.
- Use realistic pilot content initially, then personalize the account name, avatar, faculty, and bio from the saved profile.

## Technical details
- Enable Lovable Cloud authentication and persistent profile storage with owner-only security rules.
- Add a public auth page and a protected application layout.
- Keep each requested sidebar destination functional through a single application shell, with the dashboard as the complete first view.
- Add route-specific metadata and verify signed-out routing, desktop/mobile rendering, navigation, and form states.

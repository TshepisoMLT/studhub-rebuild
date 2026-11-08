# StudHub rebuild plan

This plan is a proposed sequence, not a commitment to a technology stack or launch date. Each phase should end with evidence that the next phase is worth doing.

## Phase 0 - Validate the problem

- Talk with students from a clearly chosen first segment.
- Ask how they currently find course help, study groups, and useful resources.
- Identify the most costly workaround and the smallest improvement they would use.
- Decide whether the first community is organized by institution, course, class, or topic.

**Exit criteria:** A named first user segment, a validated primary problem, and a narrow MVP loop written in the product brief.

## Phase 1 - Define the product and system

- Map signup, community discovery, joining, posting, responding, and reporting.
- Decide the first-platform scope and technology stack.
- Define account identity, community visibility, roles, and content ownership.
- Agree on API contracts, data retention, file policy, and basic moderation responsibilities.

**Exit criteria:** Reviewed screens or flow sketches, explicit architecture decisions, and acceptance criteria for the first vertical slice.

## Phase 2 - Build the core learning loop

- Implement authentication and onboarding for the chosen first segment.
- Let a student discover and join a community.
- Support text/link posts and durable replies.
- Show real data in the feed, with working refresh, pagination, and loading/empty/error states.
- Add report/block and a minimal moderation path before inviting a wider pilot.

**Exit criteria:** A new student can complete the loop on a clean install; posts and replies persist and appear only to authorized users; core flows have automated checks.

## Phase 3 - Pilot and learn

- Invite a small, intentionally selected student group.
- Observe where students get stuck and whether posts receive useful replies.
- Review safety reports, spam, privacy expectations, and moderation workload.
- Prioritize fixes from observed behavior rather than adding features by assumption.

**Exit criteria:** Evidence that the core loop solves a real problem, an agreed set of launch blockers, and a decision to iterate, narrow, or stop.

## Phase 4 - Expand only with evidence

Possible additions include richer resources, direct messaging, search, notifications, or more communities. Choose each based on student feedback, safety requirements, and operational cost.

## Quality gate for every phase

- Authentication and authorization are tested at the API boundary.
- No secrets are embedded in the client app.
- Empty, loading, error, and retry states are usable.
- Content ownership and community visibility rules are covered by tests.
- Accessibility and device-size checks are included in acceptance criteria.

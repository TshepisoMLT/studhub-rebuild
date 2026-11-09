# Decision log

Record consequential product and engineering choices here. Keep proposals separate from accepted decisions. Link each entry to supporting evidence when available.

## Status key

- **Proposed** - a candidate that needs review or evidence.
- **Accepted** - approved and current.
- **Superseded** - replaced by a later decision; keep the history.

## DEC-001 - Start with documentation before implementation

- **Status:** Accepted
- **Date:** 2026-11-08
- **Decision:** Establish the product hypothesis, rebuild sequence, architecture boundaries, and contribution expectations before copying or writing application code.
- **Reason:** The existing repositories show promising ideas but also incomplete flows and unresolved product/technical assumptions. A small, explicit foundation should prevent another collection of disconnected screens.
- **Revisit when:** The first product validation and MVP scope are complete.

## DEC-002 - Test a course/community-centered collaboration loop

- **Status:** Proposed
- **Date:** 2026-11-08
- **Proposal:** Test whether students value finding a relevant community, posting a question or resource, and receiving a durable reply more than a general social feed.
- **Evidence needed:** Student interviews and a small pilot with the chosen first segment.

## DEC-003 - First client is Expo SDK 58

- **Status:** Accepted
- **Date:** 2026-11-09
- **Decision:** The first installable client is an Expo SDK 58 app (React Native 0.88, Expo Router, TypeScript) in this repository. The iOS bundle id is `com.tshepisomlt.studhub`. Backend, database, and identity provider stay undecided.
- **Reason:** The owner asked for a current Expo rebuild of the SDK 51 apps that can be built and installed on an iPhone before more features are added. SDK 58 is the current stable Expo release. Expo Go on a physical phone is still documented as SDK 57 during the transition, so the supported device check is an EAS preview build, not Expo Go.
- **Not included:** Clerk, Supabase, NativeWind, and the old EAS project id. Those were tied to unfinished flows and would require secrets this shell does not have.

## DEC-004 - Device-local shell before a server

- **Status:** Accepted
- **Date:** 2026-11-09
- **Decision:** The first build stores one profile, community membership, posts, and replies on the device. It does not pretend to authenticate against a server. Direct messages stay out of this build.
- **Reason:** A phone install was requested before a backend decision. Copying Clerk from StudHub-new would crash without a publishable key and would hide that accounts are not real yet.
- **Revisit when:** An identity provider and API are chosen. Device-local rows must not be treated as the production account system.

## DEC-005 - Technology stack beyond the client

- **Status:** Open
- **Date:** 2026-11-09
- **Decision:** None yet for the API, database, identity provider, media storage, or moderation tools. DEC-003 only settles the mobile client.


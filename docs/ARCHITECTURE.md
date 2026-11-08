# Architecture notes

**Status:** Technology choices are open. This document sets boundaries and safety requirements, not a final stack.

## Logical components

1. **Client app** - onboarding, community discovery, feed, post composition, replies, and user-facing safety controls.
2. **Application API** - validates identity, enforces community and content permissions, applies business rules, and returns paginated results.
3. **Identity provider** - authenticates users. The API must validate provider-issued tokens rather than trusting IDs or roles sent by the client.
4. **Data store** - persists users, communities, memberships, posts, replies, and reports.
5. **Media storage** - a later capability for uploads, with file type/size limits, access rules, and deletion behavior defined before launch.

The exact providers and deployment model remain undecided.

## Initial domain model

- **User:** stable internal identity and public profile fields.
- **Community:** course/topic identity, visibility, owner, and moderation settings.
- **Membership:** user, community, role, and membership state.
- **Post:** author, community, content, timestamps, and visibility.
- **Reply:** author, post, content, and timestamps.
- **Report:** reporter, target, reason, status, and moderation outcome.

Add direct-message and media entities only after those features are approved for scope.

## Required invariants

- Derive the acting user from a verified session on the server; never authorize a write using a client-provided user ID alone.
- Enforce access to private communities and their content on every relevant API request.
- Treat all values compiled into a mobile or web client as public. Client API keys may identify an app but cannot be an authorization secret.
- Use pagination with a stable ordering and cursor/offset contract; define how refresh and duplicates behave.
- Validate and limit user content and uploads on the server.
- Provide actionable errors without logging passwords, session tokens, or private content unnecessarily.

## Operational requirements

- Separate development, preview, and production configuration.
- Keep real credentials in managed secrets; commit only placeholders in an environment example file.
- Add structured, privacy-conscious error monitoring and a documented backup/restore plan before a broad launch.
- Define data retention and account/content deletion behavior before storing sensitive student data.

## Decisions still needed

Mobile/web scope, app framework, backend/API hosting, database, identity provider, media storage, moderation tooling, and observability. Record choices and tradeoffs in DECISIONS.md.

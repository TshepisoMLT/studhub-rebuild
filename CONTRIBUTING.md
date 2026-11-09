# Contributing to StudHub

Thanks for helping build a useful and safe student collaboration product.

The app is an Expo SDK 58 client. `npm test` covers the local post/reply rules. `npm run typecheck` runs TypeScript. An iPhone install uses the EAS preview profile in the README. There is no server yet, so do not add a client-trusted user id as if it were authentication.

## Before opening a change

- Read the product brief and decision log.
- Prefer a complete, testable user workflow over unrelated UI scaffolding.
- Keep new product assumptions labeled and record accepted decisions in the decision log.
- Do not copy credentials, user data, or private production content from the earlier repositories.

## Pull requests

Include:

- The user problem and behavior being changed.
- Screenshots or a short recording for user-facing changes.
- Tests and validation performed, plus any checks that could not be run.
- API, schema, migration, privacy, or moderation impacts.
- Any follow-up work or known limitations.

Keep changes focused and avoid bundling unrelated refactors.

## Security and privacy

- Never commit API keys, passwords, tokens, signing keys, or real user data.
- Use managed environment secrets for credentials; commit placeholders only.
- Treat client-side environment variables as public.
- Enforce identity, community membership, and permissions on the server.
- Avoid logging authentication material or private student content.
- Report security issues privately to the repository owner rather than posting exploit details in a public issue.

## Quality expectations once application code exists

The project should define and maintain commands for formatting/linting, type checking, automated tests, and the platform build. Pull requests should pass the relevant checks. Changes to authentication, permissions, community visibility, or data schemas need targeted tests and migration/rollback notes.

# StudHub

A student-first place to find people studying the same things, ask for help, and keep the reply.

**Status:** Expo SDK 58 shell you can install on an iPhone. Accounts, posts, and replies are stored on the phone. There is no backend yet.

The older apps (`StudHub-old`, `StudHub-new`) were Expo SDK 51 with Clerk, NativeWind 2, and a drawer. This rebuild keeps the same loop (welcome, profile, communities, feed, replies) and leaves direct messages out until moderation rules exist.

## What you can try

1. Sign up with a name, email, and course. Nothing is uploaded.
2. Open Home. Read the sample posts, join a community, and publish a question.
3. Open the post and add a reply. Leave the app and come back; it should still be there.
4. Messages explains why direct messages are not in this build.

## Run it

```bash
npm install
npx expo start
```

## Install a build on an iPhone

Expo Go on a physical iPhone is still on SDK 57 during the SDK 58 transition, so a QR code in Expo Go may be rejected. Use a preview build instead:

```bash
npm install
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build --platform ios --profile preview
```

`eas init` writes an EAS project id into `app.json`. The iOS bundle id is `com.tshepisomlt.studhub`, which is new, so this build installs beside the old StudyHub app. An internal iOS build needs an Apple Developer account and the phone registered with `npx eas-cli@latest device:create`.

## Docs

- Product brief: [docs/PRODUCT_BRIEF.md](docs/PRODUCT_BRIEF.md)
- Rebuild plan: [docs/REBUILD_PLAN.md](docs/REBUILD_PLAN.md)
- Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Decisions: [docs/DECISIONS.md](docs/DECISIONS.md)

## Checks

```bash
npm test
npm run typecheck
```

# StudHub agent notes

Read `docs/` in this repository before changing product behavior.

Also use `TshepisoMLT/ai-knowledge-base` as the shared instruction set: start with `AGENTS.md`, then `ai/FEATURE_WORKFLOW.md`. There is no StudHub project note in that knowledge base yet.

The runnable app is an Expo SDK 58 client. Profiles, posts, replies, and community membership are stored on the device with AsyncStorage. There is no server, no Clerk project, and no production identity provider. Do not copy secrets, tokens, or `.env` values from StudHub-old or StudHub-new.

Sample posts are fixtures for a device build. Do not describe them as live student data.

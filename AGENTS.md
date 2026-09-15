# Repository Instructions for Coding Agents

These instructions apply to the entire repository. Follow the user's current request first when it
adds more specific requirements, but do not weaken the safety rules below without explicit user
approval.

## Working branches

- Make application and documentation changes only on `codex-work`.
- Use `github-actions` only for changes specific to GitHub Actions workflows.
- Never create another branch.
- Before starting changes, confirm the branch and working-tree state, fetch `origin`, and
  fast-forward the working branch from `origin/main`.
- Preserve unrelated user changes. If unexpected changes appear, stop before Git operations and
  ask whether they belong in the current work.

## Git and pull requests

- Never stage, commit, or push until the user explicitly approves those actions.
- Before asking for approval, show the files that changed and report the verification results.
- Stage only files that belong to the approved change.
- Use an identical commit message and pull-request title.
- Always provide the proposed pull-request description inside a copyable Markdown code block.
- Do not merge pull requests or publish directly unless the user explicitly requests it.
- Production EAS Updates should continue to run through the post-merge GitHub Actions workflow.

## Secrets and generated files

- Keep `.env` and `src/assets/client_secret*.json` ignored, confidential, and present locally.
- Never print, stage, commit, or include API keys, access tokens, client secrets, or their values in
  documentation and logs.
- Never commit `node_modules`, `dist`, or generated native/build output.
- Generate production exports in a temporary directory rather than inside the repository.
- Remember that values embedded in a mobile client bundle cannot be treated as confidential;
  sensitive service credentials ultimately belong behind a controlled backend.

## Architecture and implementation

- Follow `ARCHITECTURE.md` for directory responsibilities, dependency direction, naming, state,
  data access, and styling decisions.
- Keep feature-specific code inside its feature. Introduce `src/shared` only when code is genuinely
  reused across features.
- Keep screens focused on content, navigation, and interaction. Move substantial responsive
  calculations into a colocated `ScreenName.styles.ts` file.
- Use NativeWind `className` values for stable styling and colocated styles for calculated or
  device-dependent values.
- Keep API calls in feature API modules rather than UI components.
- Prefer small, behavior-preserving changes that can be tested independently.
- Do not add dependencies or architectural layers without a concrete requirement.

## Verification

Before preparing a pull request:

1. Run the TypeScript check:

   ```bash
   npm run typecheck
   ```

2. Run the automated tests when a test script exists.
3. Create production bundles for all supported platforms in a temporary directory:

   ```bash
   npx expo export --platform all --output-dir <temporary-directory> --clear
   ```

4. Exercise the affected user flow on an appropriate simulator or physical device when possible.
5. Use the live application through a browser when visual verification of deployed web behavior is
   needed.

If a required check cannot run, state why rather than reporting it as passed.

## Collaboration and explanations

- Explain relevant React Native, Expo, TypeScript, and architectural concepts while working so the
  maintainer can learn from each change.
- Lead with the practical outcome, then explain the reasoning and important tradeoffs.
- Show useful commands so the maintainer can repeat the process manually.
- Never hide unexpected files, warnings, skipped checks, or assumptions.

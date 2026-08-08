# Swotbee website

This Astro site uses **pnpm 9.12.3** as its only package manager. The exact version is pinned in `package.json`; enable Corepack once on a new machine so it selects that version automatically:

```sh
corepack enable
```

## Getting started

```sh
pnpm install
pnpm dev
```

The development server is available at `http://localhost:4321`.

## Commands

Use pnpm directly, or use the matching `just` recipes below. Run `just` to list the recipes.

| Task | pnpm | just |
| --- | --- | --- |
| Install dependencies | `pnpm install` | `just install` |
| Start development | `pnpm dev` | `just dev` |
| Production build | `pnpm build` | `just build` |
| Preview the build | `pnpm preview` | `just preview` |
| Run Astro CLI | `pnpm astro …` | `just astro …` |
| Add a dependency | `pnpm add <package>` | `just add <package>` |
| Add a development dependency | `pnpm add -D <package>` | `just add-dev <package>` |
| Remove a dependency | `pnpm remove <package>` | `just remove <package>` |
| Update dependencies | `pnpm update` | `just update` |
| Check outdated packages | `pnpm outdated` | `just outdated` |
| Audit dependencies | `pnpm audit` | `just audit` |

## Dependency policy

- Commit `pnpm-lock.yaml` whenever dependencies change.
- Use `pnpm install --frozen-lockfile` in CI and when verifying a clean install.
- Do not use npm, Yarn, or their lockfiles in this repository.
- Dependency version overrides belong in the `pnpm.overrides` section of `package.json`.

# Repository instructions

## Package management

- Use **pnpm 9.12.3** exclusively. The version is pinned by `package.json`.
- Enable Corepack when pnpm is not available: `corepack enable`.
- Never run `npm install`, `npm ci`, Yarn, or another package manager in this repository.
- `pnpm-lock.yaml` is the sole lockfile. When a dependency changes, regenerate and commit it with `pnpm install`.
- CI installs dependencies with `pnpm install --frozen-lockfile`; it must not modify the lockfile.
- Put transitive dependency pins in `pnpm.overrides` in `package.json`.

## Common commands

Use `just` recipes where helpful:

```sh
just install     # pnpm install
just dev         # pnpm dev
just build       # pnpm build
just preview     # pnpm preview
just astro check # pnpm astro check
just update      # pnpm update
just audit       # pnpm audit
```

Run `just` to list all available recipes.

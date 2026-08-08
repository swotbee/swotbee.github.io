default:
    @just --list --unsorted

# Install dependencies and refresh pnpm-lock.yaml when required.
install:
    pnpm install

# Install exactly the versions recorded in pnpm-lock.yaml.
install-frozen:
    pnpm install --frozen-lockfile

# Start the local Astro development server.
dev:
    pnpm dev

# Create the production site in dist/.
build:
    pnpm build

# Serve the production build locally.
preview:
    pnpm preview

# Run an Astro CLI command, for example: just astro check
astro +args:
    pnpm astro {{args}}

# Add a production dependency, for example: just add <package>
add package:
    pnpm add {{package}}

# Add a development dependency, for example: just add-dev <package>
add-dev package:
    pnpm add --save-dev {{package}}

# Remove a dependency, for example: just remove <package>
remove package:
    pnpm remove {{package}}

# Update dependencies within their declared version ranges.
update:
    pnpm update

# Show dependencies with available updates.
outdated:
    pnpm outdated

# Check known dependency vulnerabilities.
audit:
    pnpm audit

# Run a package executable, for example: just exec astro check
exec +args:
    pnpm exec {{args}}

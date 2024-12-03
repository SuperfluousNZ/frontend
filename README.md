## 🏃‍♀️‍➡️ Running the code

> [!TIP]
> If you use Visual Studio Code, this workspace has a few recommended suggestions.

### ✅ Pre-reqs

**Install [Node](https://nodejs.org/en).** Check the `engines.node` field of the [manifest file](/package.json), and install a matching version of Node. (We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node installations.)

**Enable [Corepack](https://nodejs.org/api/corepack.html).** Corepack comes bundled with official Node distributions, but depending on how you installed Node, you may need to install Corepack separately. (For example, [Homebrew](https://brew.sh) users may need to `brew install corepack`.) After confirming you have Corepack installed (with `corepack -v`), run:

```sh
corepack enable pnpm
```

**Verify that [pnpm](https://pnpm.io) has been installed.**

```sh
pnpm --version
```

### 👷‍♀️ Build & run

**Install dependencies.**

```sh
pnpm install
```

**Deploy!**

```sh
pnpm dev
```

## 👩‍⚕️ Troubleshooting

If your pnpm version becomes outdated, run `corepack install`.

To update the pnpm version for the repo, run `corepack up`.
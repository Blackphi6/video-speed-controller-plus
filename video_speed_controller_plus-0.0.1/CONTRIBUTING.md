# Contributing

**Video Speed Controller Plus** is a derivative of **[Video Speed Controller](https://github.com/igrigorik/videospeed)** (upstream). It is MIT-licensed; contributions are welcome.

Use **[github.com/Blackphi6/video-speed-controller-plus](https://github.com/Blackphi6/video-speed-controller-plus)** for cloning and Plus-specific issues. For bugs that also occur in stock upstream, consider reporting to **[igrigorik/videospeed](https://github.com/igrigorik/videospeed)** first.

## Get Started

### Windows Prerequisites

The build scripts and tests are cross-platform, but Git hooks (Husky) require
a POSIX shell. Windows users need:

1. **[Git for Windows](https://git-scm.com/download/win)** — provides the
   `sh.exe` that Husky hooks run under. Use Git Bash or a terminal backed by
   Git's bundled shell.
2. **Node.js >= 22.13** — install via any version manager that reads `.nvmrc`
   ([fnm](https://github.com/Schniz/fnm), [nvm-windows](https://github.com/coreybutler/nvm-windows),
   [volta](https://volta.sh/), etc.). Make sure Node is available in both your
   regular terminal and Git Bash.
3. **Husky + Node in hooks** — Husky hooks run in a non-interactive shell where
   your shell profile isn't sourced. If hooks fail with "node not found", add
   your version manager's init to `~/.config/husky/init.sh` (Husky sources this
   before every hook). For example with fnm:
   ```sh
   echo 'eval "$(fnm env)"' >> ~/.config/husky/init.sh
   ```

### Contribution Process

1. You must have a github account and be logged in
2. Open **this Video Speed Controller Plus repository** on GitHub (your fork or the canonical Plus repo URL).
3. Fork the repo using **Fork** on the top-right.
4. Clone **your fork** locally:

   ```sh
   git clone https://github.com/Blackphi6/video-speed-controller-plus.git
   cd video-speed-controller-plus
   ```

   Extension sources for **Load unpacked** live under `video_speed_controller_plus-0.0.1/` (the directory that contains `manifest.json`).

5. Create a branch for your changes

   ```sh
   git checkout -b bugfix/short-description
   ```

6. Open the code in your favorite code editor, make your changes

   ```sh
   echo "Awesome changes" > somefile.js
   git add .
   ```

   > Important: Your commit must be formatted using
   > [prettier](https://prettier.io/). If it is not it may be autoformatted for
   > you or your pull request may be rejected.

7. Next, open Chrome/Brave/Chromium and enable developer mode via
   `Settings > Extensions > Manage Extensions` and toggle `Developer mode` in
   the top-right corner.

8. Install dependencies

   ```sh
   npm install
   ```

9. Build the extension

   ```sh
   npm run build
   ```

10. Click `Load unpacked` and select the `dist/` folder (the build output).

11. Try out your changes, make sure they work as expected

12. Commit and push your changes to github

    ```sh
    git commit -m "Awesome description of some awesome changes."
    git push
    ```

13. Open your branch up on the github website then click `New pull request` and
    write up a description of your changes.

## Optional

### Run Pre-Commit Checks Locally

Installing [pre-commit](https://pre-commit.com/) is easy to do (click the link
for instructions on your platform). This repo comes with pre-commit already
configured. Doing this will ensure that your project is properly formatted and
runs some very basic tests. Once you have pre-commit installed on your system,
simply enter `pre-commit install` in your terminal in the folder to have these
checks run automatically each time you commit.

Even better, after issueing the install command you can now manually run
pre-commit checks before committing via `pre-commit run --all-files`

### Pull upstream (original Video Speed Controller) changes

To merge fixes from the original project into your Plus fork, add **upstream**:

`git remote add upstream https://github.com/igrigorik/videospeed.git`

Then fetch and merge or rebase as needed (branch name may be `master` or `main`):

`git fetch upstream && git merge upstream/main`

(Use this when you want bugfixes from **igrigorik/videospeed** in addition to Plus-only work.)

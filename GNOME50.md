# Fedora 44 / GNOME 50 Port

Validated on Fedora 44 with GNOME Shell 50.6 using a disposable headless
Wayland session. This is an experimental local port, not an upstream release.

## Changes

- Allow GNOME Shell 50 in extension metadata.
- Use actor-based cursor types on GNOME 50, retaining the legacy cursor path.
- Replace the unavailable GitPkg color dependency with npm `validate-color`
  2.2.4 and explicitly bundle its CommonJS validators as ESM exports.
- Disconnect indicator settings signals from their original settings instance.
- Clear disconnected clipboard signal IDs and include item-creation error stacks.

## Build

Node.js 22 and Yarn 1.22.22 are suitable. Fedora runtime dependencies are
`libgda`, `libgda-sqlite`, and `gsound`. Schema compilation and translation
generation also require `glib-compile-schemas` and `msgfmt`.

Run from the source directory:

```sh
npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile --ignore-scripts --non-interactive
npm exec --yes --package=yarn@1.22.22 -- yarn run build
cd dist
zip -qr ../pano-gnome50-test.zip .
cd ..
```

## Isolated Smoke Test

```sh
timeout 90s dbus-run-session -- gnome-shell-test-tool --headless \
  --extension "$PWD/pano-gnome50-test.zip" "$PWD/tests/gnome50-smoke.js"
```

The tool installs the ZIP in temporary settings/data/cache directories. A
separate D-Bus session isolates its clipboard and extension control from the
desktop session. The test covers startup, text clipboard capture, history-item
creation, window show/hide, disable, and re-enable. It accesses private Shell
and extension members and is intended specifically for GNOME 50.

Some desktop-service warnings are expected in this disposable session. A
successful run prints `PASS: Pano startup, clipboard capture, window toggle,
and disable/re-enable on GNOME 50`.

## Install for Manual Testing

This changes your user extension installation. It was not performed as part of
the automated smoke test.

```sh
gnome-extensions install ./pano-gnome50-test.zip
```

Log out and back in so the Wayland Shell discovers the newly installed extension,
then run:

```sh
gnome-extensions enable pano@elhan.io
```

If Pano is already installed, back up that installation and its history before
replacing it. Do not delete clipboard history as an installation step.

## Remaining Manual Checks

Preferences, image/file clipboard history, primary selection synchronization,
paste-on-select into Wayland applications, keyboard shortcuts, multi-monitor
placement, search/favorites, incognito/exclusions, and session-only deletion
still need interactive validation. Earlier GNOME versions retain their fallback
code paths but were not runtime-tested in this environment.
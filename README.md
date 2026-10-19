# Pano - Unofficial GNOME 50 Port

An unofficial, experimental GNOME 50 port of [Pano](https://github.com/oae/gnome-shell-pano),
the clipboard manager originally created by Alperen Elhan and upstream contributors.
The upstream project is no longer maintained; this repository contains the GNOME 50
compatibility changes and is not an official upstream release.

Source: [ii101ii/pano-gnome50](https://github.com/ii101ii/pano-gnome50).
See [GNOME 50 port notes](GNOME50.md) for changes, smoke-test coverage, and remaining manual checks.

[![ts](https://badgen.net/badge/icon/typescript?icon=typescript&label)](#)
[![opensource](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](#)
[![licence](https://badges.frapsoft.com/os/gpl/gpl.png?v=103)](LICENSE)

![ss](https://i.imgur.com/k8owX1i.png)

## Features

- ⌨️ Keyboard-driven navigation. See [Navigation](#navigation)
- 🧠 Content aware previews and notifications (Image, Link, Text, Code, Color, Emoji, File). See [Notifications](#content-aware-notifications)
- 🎨 Highly customizable UI with slick design. See [Customization](#settings)
- ⭐ Favorite any items and access them easily. See [Favorites](#favorites)
- ⚙️ And many more options for different needs. See [Settings](#settings)

## Settings

<table width="100%">
  <thead>
    <tr>
      <th width="33%">General Options</th>
      <th width="33%">Customization</th>
      <th width="33%">Danger Zone</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="33%"><img alt="General Options" src="https://i.imgur.com/Mc6yXsA.png" /></td>
      <td width="33%"><img alt="Customization" src="https://i.imgur.com/aZjfT7e.png" /></td>
      <td width="33%"><img alt="Danger Zone" src="https://i.imgur.com/RlM1AgI.png" /></td>
    </tr>
  </tbody>
</table>

## Favorites

[Favorites](https://user-images.githubusercontent.com/1043714/222934867-d8fb1c2c-81a2-46c6-a8b0-f0be96850d2f.webm)

## Content Aware Notifications

<table width="100%">
  <thead>
    <tr>
      <th width="33%">Item Type</th>
      <th width="80%">Notification</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="33%">Link</td>
      <td width="80%"><img alt="Link" src="https://i.imgur.com/XnIK7JT.png" /></td>
    </tr>
    <tr>
      <td width="33%">Image</td>
      <td width="80%"><img alt="Image" src="https://i.imgur.com/amHhZyI.png" /></td>
    </tr>
    <tr>
      <td width="33%">Color</td>
      <td width="80%"><img alt="Color" src="https://i.imgur.com/Qk6bFFM.png" /></td>
    </tr>
    <tr>
      <td width="33%">Emoji</td>
      <td width="80%"><img alt="Emoji" src="https://i.imgur.com/7iNLUpb.png" /></td>
    </tr>
    <tr>
      <td width="33%">Text,Code</td>
      <td width="80%"><img alt="Text" src="https://i.imgur.com/hDv8Fgp.png" /></td>
    </tr>
    <tr>
      <td width="33%">File Cut/Copy</td>
      <td width="80%">
        <img alt="File Copy" src="https://i.imgur.com/Wmiay4o.png" />
        <img alt="File Cut" src="https://i.imgur.com/L77dpS9.png" />
      </td>
    </tr>
  </tbody>
</table>

## Supported Shell Versions

GNOME Shell 50 is the target of this port. A headless smoke test passed on Fedora 44
with GNOME Shell 50.6, covering startup, text clipboard capture, window show/hide,
disable, and re-enable. This is not full interactive validation; see the
[remaining manual checks](GNOME50.md#remaining-manual-checks).

The extension metadata also allows GNOME Shell 45-49, but those versions were not
runtime-tested for this port. GNOME Shell 42-44 are not supported by this codebase;
the original project's [legacy branch](https://github.com/oae/gnome-shell-pano/tree/legacy)
is separate from this port.

## Installation

**Already using Pano?** This port retains the UUID `pano@elhan.io`, so it replaces
the upstream extension rather than installing alongside it. Back up your existing
extension installation and clipboard history before replacing it. Do not delete
clipboard history as an installation step.

### Runtime Dependencies

Install `libgda` (5.0 or 6.0, including SQLite support) and `gsound` before enabling
the extension. Package names depend on your distribution:

- Fedora

  ```bash
  sudo dnf install libgda libgda-sqlite gsound
  ```

- Arch Linux

  ```bash
  sudo pacman -S libgda6 gsound
  ```

- Ubuntu/Debian

  ```bash
  sudo apt install gir1.2-gda-5.0 gir1.2-gsound-1.0
  ```

- openSUSE

  ```bash
  sudo zypper install libgda-6_0-sqlite typelib-1_0-Gda-6_0 typelib-1_0-GSound-1_0
  ```

### Install From a Release ZIP

When a release is available, download the attached `pano@elhan.io.zip` from
[this repository's Releases page](https://github.com/ii101ii/pano-gnome50/releases).
GitHub's automatic "Source code" archives are not installable extension ZIPs;
build those using the instructions below. If there is no attached extension ZIP,
use the source installation instead.

Run from the directory containing the downloaded ZIP:

```bash
gnome-extensions install ./pano@elhan.io.zip
```

If replacing an existing installation, back it up first, then use
`gnome-extensions install --force ./pano@elhan.io.zip` instead.

Log out and back in so GNOME Shell discovers the extension, then enable it:

```bash
gnome-extensions enable pano@elhan.io
```

This port is distributed through this repository, not the upstream Pano listing
on extensions.gnome.org.

### Build and Install From Source

Use Node.js 22 with npm. The commands below run Yarn 1.22.22 through npm, so a
global Yarn installation is not required. You also need Git, `zip`,
`glib-compile-schemas`, and `msgfmt` from GNU gettext.

On Fedora, install the build tools (and check that your Node.js version is 22):

```bash
sudo dnf install git nodejs npm zip glib2 gettext
node --version
```

After installing the runtime dependencies above, clone and build:

```bash
git clone https://github.com/ii101ii/pano-gnome50.git
cd pano-gnome50
npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile --ignore-scripts --non-interactive
npm exec --yes --package=yarn@1.22.22 -- yarn run build:package
gnome-extensions install ./dist/pano@elhan.io.zip
```

For an existing installation, back it up first and add `--force` to the install
command. Log out and back in, then run:

```bash
gnome-extensions enable pano@elhan.io
```

## Usage

### Navigation

[Navigation](https://user-images.githubusercontent.com/1043714/222934876-2e922f6c-36db-456b-826b-3b129da540b4.webm)

- `<super>` `<shift>` `v` can be use to toggle visibility of the Pano. This can be changed in Pano extension settings.
- `<ctrl>` `<super>` `<shift>` `v` can be use to toggle incognito mode.
- `left` and `right` arrow keys can be used for navigating between items. Pressing `left` key on the first item will focus search box. Also pressing `right` key will go to first/last focused item on the list.
- `up` and `down` keys can also be use to focus on search box and items
- `enter` key or clicking to an item will copy it. You can hold `shift` key for the apps like terminal to paste into it
- Typing anywhere on Pano will focus on search box and filter the results.
- `delete` key will remove the focused item from the list.
- `tab` key will cycle through item types (like `image`, `link` etc..) `shift` `tab` will reverse the direction
- `backspace` key on empty search box will remove item type filter
- `ctrl` `s` key will favorite/unfavorite the item
- `alt` key will switch between favorites/all items
- `ctrl` `1`..`9` keys will copy the item with the corresponding index
- `ctrl` `click` or `ctrl` `enter` shortcuts will copy the links and open them in default browser if `Open Links in Browser` option enabled

## Cli

You can trigger several actions using busctl.

```sh
busctl --user call org.gnome.Shell /io/elhan/Pano io.elhan.Pano clearHistory # clears pano history
busctl --user call org.gnome.Shell /io/elhan/Pano io.elhan.Pano toggle # toggles pano window
busctl --user call org.gnome.Shell /io/elhan/Pano io.elhan.Pano hide # hides pano window
busctl --user call org.gnome.Shell /io/elhan/Pano io.elhan.Pano show # shows pano window
```

## Development

### Build

This extension is written in TypeScript and compiled with Rollup. Follow
[Build and Install From Source](#build-and-install-from-source) for setup.
From the cloned source directory, build without packaging or watch for changes:

```sh
npm exec --yes --package=yarn@1.22.22 -- yarn run build
npm exec --yes --package=yarn@1.22.22 -- yarn run watch
```

See [GNOME50.md](GNOME50.md) for the isolated GNOME 50 smoke-test procedure.

## Credits and License

Pano was originally created by [Alperen Elhan](https://github.com/oae) and the
[upstream contributors](https://github.com/oae/gnome-shell-pano/graphs/contributors).
This unofficial port preserves their work and is distributed under
[GPL-2.0-or-later](LICENSE).

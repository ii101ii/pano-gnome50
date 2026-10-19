import St from 'gi://St';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as Scripting from 'resource:///org/gnome/shell/ui/scripting.js';

export const METRICS = {};

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export async function run() {
  const uuid = 'pano@elhan.io';
  const extension = Main.extensionManager.lookup(uuid);
  assert(extension, 'Pano was not discovered');
  assert(extension.stateObj?.panoWindow, `Pano failed to enable: ${extension.error ?? extension.state}`);

  const pano = extension.stateObj;
  const clipboard = St.Clipboard.get_default();
  clipboard.set_text(St.ClipboardType.CLIPBOARD, 'Pano GNOME 50 isolated smoke test');
  await Scripting.sleep(1000);
  assert(
    pano.clipboardManager.lastCopiedContent?.content.value === 'Pano GNOME 50 isolated smoke test',
    'Clipboard tracking did not capture copied text',
  );
  assert(pano.panoWindow.scrollView.getItems().length === 1, 'Copied text did not create a history item');

  pano.show();
  await Scripting.sleep(500);
  assert(pano.panoWindow.is_visible(), 'Pano window did not open');
  pano.hide();
  await Scripting.sleep(500);
  assert(!pano.panoWindow.is_visible(), 'Pano window did not close');

  await Main.extensionManager._callExtensionDisableWithRebase(uuid);
  assert(pano.panoWindow === null, 'Pano window was not cleaned up');
  await Main.extensionManager._callExtensionEnable(uuid);
  assert(pano.panoWindow, `Pano failed to re-enable: ${extension.error ?? extension.state}`);
  await Main.extensionManager._callExtensionDisableWithRebase(uuid);
  assert(!extension.error, `Pano reported an error: ${extension.error}`);
  print('PASS: Pano startup, clipboard capture, window toggle, and disable/re-enable on GNOME 50');
}

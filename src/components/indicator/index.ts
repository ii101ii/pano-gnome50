import Gio from '@girs/gio-2.0';
import type { Extension } from '@girs/gnome-shell/dist/extensions/extension';
import { SettingsMenu } from '@pano/components/indicator/settingsMenu';
import { addToStatusArea } from '@pano/utils/ui';

export default class PanoIndicator {
  private indicatorChangeSignalId: number | null = null;
  private settingsMenu: SettingsMenu | null = null;
  private extension: Extension;
  private settings: Gio.Settings;
  private onClear: () => Promise<void>;
  private onToggle: () => void;

  constructor(ext: Extension, onClear: () => Promise<void>, onToggle: () => void) {
    this.extension = ext;
    this.settings = ext.getSettings();
    this.onClear = onClear;
    this.onToggle = onToggle;
  }

  private createIndicator() {
    if (this.settings.get_boolean('show-indicator')) {
      this.settingsMenu = new SettingsMenu(this.extension, this.onClear, this.onToggle);
      addToStatusArea(this.extension, this.settingsMenu);
    }
  }

  private removeIndicator() {
    this.settingsMenu?.destroy();
    this.settingsMenu = null;
  }

  animate() {
    this.settingsMenu?.animate();
  }

  enable() {
    this.indicatorChangeSignalId = this.settings.connect('changed::show-indicator', () => {
      if (this.settings.get_boolean('show-indicator')) {
        this.createIndicator();
      } else {
        this.removeIndicator();
      }
    });
    if (this.settings.get_boolean('show-indicator')) {
      this.createIndicator();
    } else {
      this.removeIndicator();
    }
  }

  disable() {
    if (this.indicatorChangeSignalId) {
      this.settings.disconnect(this.indicatorChangeSignalId);
      this.indicatorChangeSignalId = null;
    }
    this.removeIndicator();
  }
}

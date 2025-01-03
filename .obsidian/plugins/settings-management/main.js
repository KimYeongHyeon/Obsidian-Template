/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SettingsManagement
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  enabledpluginsgroup: [],
  enabledcsssnippets: [],
  pluginsgridtype: "list"
};

// src/main.ts
var SettingsManagement = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    await this.saveSettings();
    this.settingstabId = this.app.setting.settingTabs.map((tab) => tab.id);
    this.optionsId = ["appearance", "hotkeys", "plugins", "community-plugins"];
    this.optionsmenuEl = null;
    this.addNewSvgIcons();
    await this.createSettingsOptionsMenu();
  }
  onunload() {
    this.deleteMenu();
    this.saveSettings();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async createSettingsOptionsMenu() {
    this.activeTab = this.app.setting.activeTab;
    if (this.activeTab && this.optionsId.includes(this.app.setting.activeTab.id)) {
      this.createMenu(this.app.setting.activeTab.id);
    }
    const setting = this.app.setting;
    setting.onOpen = () => {
      setting.openTabById(setting.lastTabId) || setting.openTab(setting.settingTabs[0]);
      this.activeTab = setting.activeTab;
      this.createMenu(this.activeTab.id);
    };
    setting.settingTabs.forEach(async (tab) => {
      this.registerDomEvent(tab.navEl, "click", () => {
        setting.openTabById(tab.id) || setting.openTab(tab);
        this.createMenu(tab.id);
      });
    });
  }
  createMenu(id) {
    this.deleteMenu();
    if (this.optionsId.includes(id)) {
      this.createSwitcher();
      this.createGridStyle();
      if (id === "appearance" || id === "community-plugins") {
        this.createSaveButton();
        this.createSetConfigButton();
      }
    }
  }
  deleteMenu() {
    if (this.optionsmenuEl) {
      this.optionsmenuEl.remove();
      this.optionsmenuEl = null;
      document.body.classList.remove("pm-show-enabled");
      document.body.classList.remove("pm-show-disabled");
      this.app.setting.activeTab.containerEl.classList.remove("pm-grid");
    }
  }
  addNewSvgIcons() {
    (0, import_obsidian2.addIcon)("toggle-center", '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-toggle-center"><rect width="20" height="12" x="2" y="6" rx="6" ry="6"/><circle cx="12" cy="12" r="2"/></svg>');
  }
  createSwitcher() {
    if (!this.optionsmenuEl) {
      const containerEl = this.app.setting.tabContentContainer || document.querySelector(".vertical-tab-content-container") || null;
      if (!containerEl) {
        return;
      }
      this.optionsmenuEl = containerEl.createEl("div", { attr: { class: "pm-tabs" } });
    }
    const switcherEl = this.optionsmenuEl.createEl("div", { attr: { class: "pm-tab", value: "switcher" } });
    const switcherButton = new import_obsidian2.ButtonComponent(switcherEl);
    if (document.body.classList.contains("pm-show-enabled")) {
      switcherButton.setIcon("toggle-right");
      switcherButton.setTooltip("Enabled");
    } else if (document.body.classList.contains("pm-show-disabled")) {
      switcherButton.setIcon("toggle-left");
      switcherButton.setTooltip("Disabled");
    } else {
      switcherButton.setIcon("toggle-center");
      switcherButton.setTooltip("All");
    }
    switcherButton.onClick(() => {
      if (document.body.classList.contains("pm-show-enabled")) {
        document.body.classList.remove("pm-show-enabled");
        document.body.classList.add("pm-show-disabled");
        switcherButton.setIcon("toggle-left");
        switcherButton.setTooltip("Disabled");
      } else if (document.body.classList.contains("pm-show-disabled")) {
        document.body.classList.remove("pm-show-disabled");
        switcherButton.setIcon("toggle-center");
        switcherButton.setTooltip("All");
      } else {
        document.body.classList.add("pm-show-enabled");
        switcherButton.setIcon("toggle-right");
        switcherButton.setTooltip("Enabled");
      }
    });
  }
  createGridStyle() {
    if (!this.optionsmenuEl) {
      const containerEl = this.app.setting.tabContentContainer || document.querySelector(".vertical-tab-content-container") || null;
      if (!containerEl) {
        return;
      }
      this.optionsmenuEl = containerEl.createEl("div", { attr: { class: "pm-tabs" } });
    }
    const gridStyleEl = this.optionsmenuEl.createEl("div", { attr: { class: "pm-tab", value: "grid" } });
    const gridStyleButton = new import_obsidian2.ButtonComponent(gridStyleEl);
    if (this.settings.pluginsgridtype === "grid") {
      this.app.setting.activeTab.containerEl.classList.add("pm-grid");
      gridStyleButton.setIcon("layout-grid");
      gridStyleButton.setTooltip("Grid layout");
    } else {
      this.app.setting.activeTab.containerEl.classList.remove("pm-grid");
      gridStyleButton.setIcon("menu");
      gridStyleButton.setTooltip("List layout");
    }
    gridStyleButton.onClick(async () => {
      if (this.settings.pluginsgridtype === "grid") {
        this.app.setting.activeTab.containerEl.classList.remove("pm-grid");
        gridStyleButton.setIcon("menu");
        gridStyleButton.setTooltip("List layout");
        this.settings.pluginsgridtype = "list";
      } else {
        this.app.setting.activeTab.containerEl.classList.add("pm-grid");
        gridStyleButton.setIcon("layout-grid");
        gridStyleButton.setTooltip("Grid layout");
        this.settings.pluginsgridtype = "grid";
      }
      await this.saveSettings();
    });
  }
  createSaveButton() {
    if (!this.optionsmenuEl) {
      return;
    }
    const saveEl = this.optionsmenuEl.createEl("div", { attr: { class: "pm-tab", value: "save" } });
    const saveButton = new import_obsidian2.ButtonComponent(saveEl);
    saveButton.setIcon("save");
    saveButton.setTooltip("Save current configuration.");
    saveButton.onClick(async () => {
      this.saveCurrentConfig();
      await this.saveSettings();
    });
  }
  saveCurrentConfig() {
    const activeTab = this.app.setting.lastTabId;
    switch (activeTab) {
      case "appearance":
        this.saveCssSnippetsConfig();
        break;
      case "community-plugins":
        this.saveCommunityPluginsConfig();
        break;
      default:
        break;
    }
  }
  createSetConfigButton() {
    if (!this.optionsmenuEl) {
      return;
    }
    const configList = this.optionsmenuEl.createEl("div", { attr: { class: "pm-tab", value: "config" } });
    (0, import_obsidian2.setIcon)(configList, "boxes");
    if (this.app.setting.lastTabId === "community-plugins") {
      this.registerDomEvent(configList, "click", () => {
        this.createComPluginsConfigList();
      });
    } else {
      this.registerDomEvent(configList, "click", () => {
        this.createCssSnippetsConfigList();
      });
    }
  }
  /* css snippets */
  createCssSnippetsConfigList() {
    if (!this.optionsmenuEl) {
      return;
    }
    if (this.settings.enabledcsssnippets.length === 0) {
      new import_obsidian2.Notice("No saved configuration");
      return;
    }
    this.configListEl = this.optionsmenuEl.createEl("div", { attr: { class: "pm-configs" } });
    const configCloseEl = this.configListEl.createEl("div", { attr: { class: "pm-tab pm-config pm-config-close", value: "close-icon" } });
    (0, import_obsidian2.setIcon)(configCloseEl, "x");
    this.registerDomEvent(configCloseEl, "click", () => {
      this.configListEl && this.configListEl.remove();
      this.configListEl = null;
    });
    for (let i = 0; i < this.settings.enabledcsssnippets.length; i++) {
      const configItemEl = this.configListEl.createEl("div", { attr: { class: "pm-tab pm-config", value: this.settings.enabledcsssnippets[i].id } });
      const configItemButton = new import_obsidian2.ButtonComponent(configItemEl);
      configItemButton.setIcon("puzzle");
      configItemButton.setTooltip(this.settings.enabledcsssnippets[i].name);
      configItemButton.onClick(() => {
        this.loadCssSnippetsConfig(this.settings.enabledcsssnippets[i]);
        this.configListEl && this.configListEl.remove();
        this.configListEl = null;
      });
      this.registerDomEvent(configItemEl, "contextmenu", (event) => {
        event.preventDefault();
        const menu = new import_obsidian2.Menu();
        menu.addItem((item) => {
          item.setTitle("Delete").setIcon("trash");
          item.onClick(() => {
            this.settings.enabledcsssnippets.splice(i, 1);
            configItemEl.remove();
            this.saveSettings();
          });
        });
        menu.addItem((item) => {
          item.setTitle("Modify").setIcon("pencil");
          item.onClick(() => {
            this.renameCssSnippetsConfig(i);
          });
        });
        menu.showAtMouseEvent(event);
      });
    }
  }
  loadCssSnippetsConfig(config) {
    var _a;
    const snippetsListEl = this.app.setting.tabContentContainer.querySelectorAll(".setting-item.setting-item-heading:has(.clickable-icon) ~ .setting-item.mod-toggle");
    for (let i = 0; i < snippetsListEl.length; i++) {
      const snippetEl = snippetsListEl[i];
      const snippetName = (_a = snippetEl.querySelector(".setting-item-name")) == null ? void 0 : _a.textContent;
      if (!snippetName) {
        continue;
      }
      if (config.enabledcsssnippets.includes(snippetName)) {
        const snippetToggleButton = snippetEl.querySelector(".checkbox-container");
        if (snippetToggleButton && !snippetToggleButton.classList.contains("is-enabled")) {
          snippetToggleButton.click();
        }
      } else if (!config.enabledcsssnippets.includes(snippetName)) {
        const snippetToggleButton = snippetEl.querySelector(".checkbox-container");
        if (snippetToggleButton && snippetToggleButton.classList.contains("is-enabled")) {
          snippetToggleButton.click();
        }
      } else {
        console.log(`Can't find snippet: ${snippetName}`);
      }
    }
  }
  renameCssSnippetsConfig(index) {
    const getNameModal = new import_obsidian2.Modal(this.app).setTitle("Rename css snippets config");
    getNameModal.onOpen = () => {
      let configName = "";
      new import_obsidian2.Setting(getNameModal.contentEl).setName("Config name").addText((text) => text.setPlaceholder(this.settings.enabledcsssnippets[index].name).onChange(
        (value) => {
          configName = value;
        }
      )).addButton(
        (button) => button.setButtonText("Save").onClick(() => {
          if (configName === "") {
            new import_obsidian2.Notice("Config name is empty.");
            return;
          } else {
            this.settings.enabledcsssnippets[index].name = configName;
            this.saveSettings();
            getNameModal.close();
          }
        })
      );
      getNameModal.contentEl.find("input").focus();
    };
    getNameModal.open();
  }
  async saveCssSnippetsConfig() {
    const getNameModal = new import_obsidian2.Modal(this.app).setTitle("Add new css snippets config");
    getNameModal.onOpen = () => {
      let configName = "";
      new import_obsidian2.Setting(getNameModal.contentEl).setName("Config name").addText((text) => text.onChange(
        (value) => {
          configName = value;
        }
      )).addButton(
        (button) => button.setButtonText("Save").onClick(() => {
          if (configName === "") {
            new import_obsidian2.Notice("Config name is empty.");
            return;
          } else {
            this.settings.enabledcsssnippets.push(
              this.createCurCssSnippetsConfig(this.app.setting.tabContentContainer, configName)
            );
            this.saveSettings();
            getNameModal.close();
          }
        })
      );
      getNameModal.contentEl.find("input").focus();
    };
    getNameModal.open();
    await this.saveSettings();
  }
  createCurCssSnippetsConfig(container, configName) {
    const snippetsListEl = container.querySelectorAll(".setting-item.setting-item-heading:has(.clickable-icon) ~ .setting-item.mod-toggle");
    const snippets = Array.from(snippetsListEl).map((snippetEl) => {
      var _a;
      return ((_a = snippetEl.querySelector(".setting-item-name")) == null ? void 0 : _a.textContent) || "";
    });
    return {
      id: Date.now().toString(10),
      name: configName,
      enabledcsssnippets: snippets
    };
  }
  /* community plugins */
  createComPluginsConfigList() {
    if (!this.optionsmenuEl) {
      return;
    }
    if (this.settings.enabledpluginsgroup.length === 0) {
      new import_obsidian2.Notice("No saved configuration");
      return;
    }
    this.configListEl = this.optionsmenuEl.createEl("div", { attr: { class: "pm-configs" } });
    const configCloseEl = this.configListEl.createEl("div", { attr: { class: "pm-tab pm-config pm-config-close", value: "close-icon" } });
    (0, import_obsidian2.setIcon)(configCloseEl, "x");
    this.registerDomEvent(configCloseEl, "click", () => {
      this.configListEl && this.configListEl.remove();
      this.configListEl = null;
    });
    for (let i = 0; i < this.settings.enabledpluginsgroup.length; i++) {
      const configItemEl = this.configListEl.createEl("div", { attr: { class: "pm-tab pm-config", value: this.settings.enabledpluginsgroup[i].id } });
      const configItemButton = new import_obsidian2.ButtonComponent(configItemEl);
      configItemButton.setTooltip(this.settings.enabledpluginsgroup[i].name);
      configItemButton.setIcon(this.settings.enabledpluginsgroup[i].icon);
      configItemButton.onClick(async () => {
        this.loadComPluginsConfig(this.settings.enabledpluginsgroup[i]);
        this.configListEl && this.configListEl.remove();
        this.configListEl = null;
      });
      this.registerDomEvent(configItemEl, "contextmenu", (event) => {
        event.preventDefault();
        const menu = new import_obsidian2.Menu();
        menu.addItem((item) => {
          item.setTitle("Delete").setIcon("trash");
          item.onClick(() => {
            this.settings.enabledpluginsgroup.splice(i, 1);
            this.saveSettings();
            configItemEl.remove();
            if (this.configListEl && this.configListEl.children.length === 1) {
              this.configListEl.remove();
              this.configListEl = null;
            }
          });
        });
        menu.addItem((item) => {
          item.setTitle("Modify").setIcon("pencil");
          item.onClick(() => {
            this.modifyComPluginsConfig(i);
          });
        });
        menu.showAtMouseEvent(event);
      });
    }
  }
  modifyComPluginsConfig(index) {
    const getNameModal = new import_obsidian2.Modal(this.app).setTitle("Modify plugins config");
    getNameModal.onOpen = () => {
      let configName = "";
      new import_obsidian2.Setting(getNameModal.contentEl).setName("Config name").addText((text) => text.setPlaceholder(this.settings.enabledpluginsgroup[index].name).onChange(
        (value) => {
          configName = value;
        }
      )).addButton(
        (button) => button.setButtonText("Save").onClick(() => {
          if (configName === "") {
            new import_obsidian2.Notice("Config name is empty.");
            return;
          } else {
            this.settings.enabledpluginsgroup[index].name = configName;
            this.settings.enabledpluginsgroup[index].icontype = icontype;
            this.settings.enabledpluginsgroup[index].icon = icon;
            this.saveSettings();
            getNameModal.close();
          }
        })
      );
      let icontype = this.settings.enabledpluginsgroup[index].icontype;
      let icon = this.settings.enabledpluginsgroup[index].icon;
      const iconSetting = new import_obsidian2.Setting(getNameModal.contentEl).setName("Config icon").setDesc("Accepts lucide icon.(Click the icon to refresh. Svg icon in the future.)");
      let iconnameEl;
      iconSetting.addText(
        (text) => {
          text.setValue(this.settings.enabledpluginsgroup[index].icon).onChange((value) => {
            icon = value;
            (0, import_obsidian2.setIcon)(previewIcon, "refresh-cw");
          });
          iconnameEl = text.inputEl;
        }
      );
      const previewIcon = iconSetting.controlEl.createDiv({ attr: { class: "pm-preview-icon" } });
      (0, import_obsidian2.setIcon)(previewIcon, this.settings.enabledpluginsgroup[index].icon);
      this.registerDomEvent(previewIcon, "click", () => {
        if (icontype === "lucide") {
          (0, import_obsidian2.setIcon)(previewIcon, icon);
        } else if (icontype === "svg") {
          (0, import_obsidian2.addIcon)("newconfigicon", icon);
          (0, import_obsidian2.setIcon)(previewIcon, icon);
        }
      });
      getNameModal.contentEl.find("input").focus();
    };
    getNameModal.open();
  }
  loadComPluginsConfig(config) {
    var _a, _b, _c;
    if (!this.app.setting.settingTabs[6].installedPluginsEl) {
      return;
    }
    const pluginsListEl = this.app.setting.settingTabs[6].installedPluginsEl.childNodes;
    for (let i = 0; i < pluginsListEl.length; i++) {
      const pluginEl = pluginsListEl[i];
      const pluginName = (_a = pluginEl.querySelector(".setting-item-name")) == null ? void 0 : _a.textContent;
      if (!pluginName) {
        continue;
      }
      const pluginDescription = ((_c = (_b = pluginEl.querySelector(".setting-item-description")) == null ? void 0 : _b.lastChild) == null ? void 0 : _c.textContent) || "";
      const pluginId = this.nameToId(pluginName, pluginDescription);
      if (pluginId && config.enabledplugins.includes(pluginId)) {
        const pluginToggleButton = pluginEl.querySelector(".checkbox-container");
        if (pluginToggleButton && !pluginToggleButton.classList.contains("is-enabled")) {
          pluginToggleButton.click();
        }
      } else if (pluginId && !config.enabledplugins.includes(pluginId)) {
        const pluginToggleButton = pluginEl.querySelector(".checkbox-container");
        if (pluginToggleButton && pluginToggleButton.classList.contains("is-enabled")) {
          pluginToggleButton.click();
        }
      } else {
        console.log(`Can't find plugin: ${pluginName}`);
      }
    }
  }
  nameToId(name, description) {
    return Object.keys(this.app.plugins.manifests).find((key) => this.app.plugins.manifests[key].name === name && this.app.plugins.manifests[key].description === description) || "";
  }
  saveCommunityPluginsConfig() {
    const getNameModal = new import_obsidian2.Modal(this.app).setTitle("Add new community plugins config");
    getNameModal.onOpen = () => {
      let configName = "";
      new import_obsidian2.Setting(getNameModal.contentEl).setName("Config name").addText(
        (text) => text.onChange((value) => {
          configName = value;
        })
      ).addButton(
        (button) => button.setButtonText("Save").onClick(() => {
          if (configName === "") {
            new import_obsidian2.Notice("Config name is empty.");
            return;
          } else {
            this.settings.enabledpluginsgroup.push(this.createCurComPluginsConfig(this.app.plugins.enabledPlugins, configName, icontype, icon));
            this.saveSettings();
            getNameModal.close();
          }
        })
      );
      let icontype = "lucide";
      let icon = "puzzle";
      const iconSetting = new import_obsidian2.Setting(getNameModal.contentEl).setName("Config icon").setDesc("Accepts lucide icon.(Click the icon to refresh. Svg icon in the future.)");
      let iconnameEl;
      iconSetting.addText(
        (text) => {
          text.setValue(icon).onChange((value) => {
            icon = value;
            (0, import_obsidian2.setIcon)(previewIcon, "refresh-cw");
          });
          iconnameEl = text.inputEl;
        }
      );
      const previewIcon = iconSetting.controlEl.createDiv({ attr: { class: "pm-preview-icon" } });
      (0, import_obsidian2.setIcon)(previewIcon, "puzzle");
      this.registerDomEvent(previewIcon, "click", () => {
        if (icontype === "lucide") {
          (0, import_obsidian2.setIcon)(previewIcon, icon);
        } else if (icontype === "svg") {
          (0, import_obsidian2.addIcon)("newconfigicon", icon);
          (0, import_obsidian2.setIcon)(previewIcon, icon);
        }
      });
      getNameModal.contentEl.find("input").focus();
    };
    getNameModal.open();
  }
  createCurComPluginsConfig(enabledPlugins, name, icontype, icon) {
    return {
      id: Date.now().toString(10),
      name,
      icontype,
      icon,
      enabledplugins: Array.from(enabledPlugins)
    };
  }
};


/* nosourcemap */
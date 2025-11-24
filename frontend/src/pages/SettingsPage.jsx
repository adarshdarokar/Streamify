import { Settings, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("privacy");

  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem("app_general_settings_v1");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const saveToLocal = (obj) => {
    setSettings(obj);
    localStorage.setItem("app_general_settings_v1", JSON.stringify(obj));
  };

  // Apply theme instantly
  useEffect(() => {
    if (settings.theme) {
      document.documentElement.setAttribute("data-theme", settings.theme);
    }
  }, [settings.theme]);

  return (
    <div className="px-4 sm:px-10 py-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="
    inline-flex items-center gap-2 px-4 py-1.5 mb-4 
    rounded-full 
    bg-base-100/60 backdrop-blur-xl 
    border border-white/10 
    shadow-lg shadow-black/5 
    hover:shadow-xl hover:shadow-black/10
    hover:scale-[1.03] 
    transition-all duration-300
  "
      >
        <ArrowLeft className="w-4 h-4 opacity-80" />
        <span className="font-medium text-sm opacity-90">Back</span>
      </Link>

      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-base-200 shadow-inner">
          <Settings className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-xs opacity-60">Manage your preferences</p>
        </div>
      </div>

      {/* 2 Column Layout */}
      <div className="flex gap-6">
        {/* LEFT MENU */}
        <div className="w-56 bg-base-200/60 p-4 rounded-xl border border-base-content/10">
          <MenuItem
            label="Privacy"
            active={activeSection === "privacy"}
            onClick={() => setActiveSection("privacy")}
          />
          <MenuItem
            label="Notifications"
            active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
          />
          <MenuItem
            label="Media & Calls"
            active={activeSection === "media"}
            onClick={() => setActiveSection("media")}
          />
          <MenuItem
            label="Theme"
            active={activeSection === "theme"}
            onClick={() => setActiveSection("theme")}
          />
          <MenuItem
            label="Chat"
            active={activeSection === "chat"}
            onClick={() => setActiveSection("chat")}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          {/* PRIVACY */}
          {activeSection === "privacy" && (
            <Section title="Privacy">
              <SettingRow label="Profile Visibility">
                <Select
                  value={settings.profileVisibility || "everyone"}
                  onChange={(v) =>
                    saveToLocal({ ...settings, profileVisibility: v })
                  }
                  options={[
                    ["everyone", "Everyone"],
                    ["contacts", "My Contacts"],
                    ["nobody", "Nobody"],
                  ]}
                />
              </SettingRow>

              <SettingRow label="Read Receipts">
                <Toggle
                  checked={settings.readReceipts ?? true}
                  onChange={(v) =>
                    saveToLocal({ ...settings, readReceipts: v })
                  }
                />
              </SettingRow>

              <SettingRow label="Region Format">
                <Select
                  value={settings.regionFormat || "dd/mm/yyyy"}
                  onChange={(v) =>
                    saveToLocal({ ...settings, regionFormat: v })
                  }
                  options={[
                    ["dd/mm/yyyy", "DD/MM/YYYY"],
                    ["mm/dd/yyyy", "MM/DD/YYYY"],
                    ["yyyy/mm/dd", "YYYY/MM/DD"],
                  ]}
                />
              </SettingRow>
            </Section>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <Section title="Notifications">
              <SettingRow label="Messages">
                <Toggle
                  checked={settings.messages ?? true}
                  onChange={(v) => saveToLocal({ ...settings, messages: v })}
                />
              </SettingRow>

              <SettingRow label="Calls">
                <Toggle
                  checked={settings.calls ?? true}
                  onChange={(v) => saveToLocal({ ...settings, calls: v })}
                />
              </SettingRow>
            </Section>
          )}

          {/* MEDIA & CALLS */}
          {activeSection === "media" && (
            <Section title="Media & Calls">
              <SettingRow label="Low Data Mode">
                <Toggle
                  checked={settings.lowDataMode ?? false}
                  onChange={(v) => saveToLocal({ ...settings, lowDataMode: v })}
                />
              </SettingRow>

              <SettingRow label="Auto Download Media">
                <Select
                  value={settings.autoDownloadMedia || "wifi"}
                  onChange={(v) =>
                    saveToLocal({ ...settings, autoDownloadMedia: v })
                  }
                  options={[
                    ["always", "Always"],
                    ["wifi", "Only WiFi"],
                    ["never", "Never"],
                  ]}
                />
              </SettingRow>

              <SettingRow label="Save to Gallery">
                <Toggle
                  checked={settings.saveToGallery ?? true}
                  onChange={(v) =>
                    saveToLocal({ ...settings, saveToGallery: v })
                  }
                />
              </SettingRow>

              <SettingRow label="Camera Preview">
                <Toggle
                  checked={settings.cameraMicPreview ?? true}
                  onChange={(v) =>
                    saveToLocal({ ...settings, cameraMicPreview: v })
                  }
                />
              </SettingRow>
            </Section>
          )}

          {/* THEME */}
          {activeSection === "theme" && (
            <Section title="Theme">
              <SettingRow label="Select Theme">
                <Select
                  value={settings.theme || "light"}
                  onChange={(v) => saveToLocal({ ...settings, theme: v })}
                  options={[
                    ["light", "Light"],
                    ["dark", "Dark"],
                    ["cupcake", "Cupcake"],
                    ["bumblebee", "Bumblebee"],
                    ["emerald", "Emerald"],
                    ["corporate", "Corporate"],
                    ["synthwave", "Synthwave"],
                    ["retro", "Retro"],
                    ["cyberpunk", "Cyberpunk"],
                    ["valentine", "Valentine"],
                    ["halloween", "Halloween"],
                    ["forest", "Forest"],
                    ["aqua", "Aqua"],
                  ]}
                />
              </SettingRow>
            </Section>
          )}

          {/* CHAT WALLPAPER */}
          {activeSection === "chat" && (
            <Section title="Chat Wallpaper">
              <SettingRow label="Wallpaper">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-sm file-input-bordered"
                  onChange={(e) =>
                    saveToLocal({
                      ...settings,
                      wallpaper: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </SettingRow>

              {settings.wallpaper && (
                <div className="mt-3">
                  <p className="text-sm opacity-80 mb-1">Preview:</p>
                  <img
                    src={settings.wallpaper}
                    alt="Chat Wallpaper"
                    className="rounded-lg w-56 h-40 object-cover border"
                  />
                </div>
              )}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

/* Menu Button */
const MenuItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition 
      ${active ? "bg-primary text-white" : "hover:bg-base-300"}`}
  >
    {label}
  </button>
);

/* BIGGER, WIDER PREMIUM SECTION */
const Section = ({ title, children }) => (
  <div className="bg-base-200 p-10 rounded-2xl shadow-xl border border-base-300 space-y-7 w-full min-h-[260px]">
    <h2 className="text-2xl font-bold">{title}</h2>
    <div className="space-y-6">{children}</div>
  </div>
);

/* Row */
const SettingRow = ({ label, children }) => (
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium">{label}</p>
    {children}
  </div>
);

/* Select */
const Select = ({ value, onChange, options }) => (
  <select
    className="select select-sm select-bordered"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map(([val, text]) => (
      <option key={val} value={val}>
        {text}
      </option>
    ))}
  </select>
);

/* Toggle */
const Toggle = ({ checked, onChange }) => (
  <input
    type="checkbox"
    className="toggle toggle-primary"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
  />
);

export default SettingsPage;

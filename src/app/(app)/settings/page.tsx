"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Bell,
  Edit2,
  Globe,
  Lock,
  Plus,
  Settings as SettingsIcon,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

type UserRole = "admin" | "manager" | "viewer";

interface SubUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  createdAt: string;
}

function getRoleBadge(role: UserRole) {
  if (role === "admin") return "bg-purple-50 text-purple-700 border-purple-200";
  if (role === "manager") return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
}

export default function SettingsPage() {
  const router = useRouter();
  const t = useTranslations("settings");
  const common = useTranslations("common");

  const [showAddUser, setShowAddUser] = useState(false);
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: UserRole;
  }>({
    name: "",
    email: "",
    role: "viewer",
  });
  const [subUsers, setSubUsers] = useState<SubUser[]>([
    {
      id: "1",
      name: "Mehmet Demir",
      email: "mehmet@avixa.com",
      role: "manager",
      status: "active",
      createdAt: "2026-03-15",
    },
    {
      id: "2",
      name: "Ayse Kaya",
      email: "ayse@avixa.com",
      role: "viewer",
      status: "active",
      createdAt: "2026-03-20",
    },
  ]);

  const handleSave = () => {
    setMessage(t("saved"));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      setMessage(t("fillAllFields"));
      return;
    }

    const user: SubUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setSubUsers((prev) => [...prev, user]);
    setNewUser({ name: "", email: "", role: "viewer" });
    setShowAddUser(false);
    setMessage(t("subUserAdded"));
  };

  const handleDeleteUser = (id: string) => {
    setSubUsers((prev) => prev.filter((user) => user.id !== id));
    setMessage(t("userDeleted"));
  };

  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title={t("title")}
        description={t("description")}
      />

      {message ? (
        <div className="max-w-4xl rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700">
          {message}
        </div>
      ) : null}

      <div className="max-w-4xl space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">{t("profile")}</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label={t("fullName")} defaultValue="Ahmet Yilmaz" />
              <Input label={t("company")} defaultValue="Avixa" />
            </div>
            <Input type="email" label={t("email")} defaultValue="ahmet@avixa.com" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900">{t("subUsersTitle")}</h3>
            </div>
            <Button
              onClick={() => setShowAddUser((prev) => !prev)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              {t("newUser")}
            </Button>
          </div>

          {showAddUser ? (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t("fullName")}
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder={t("fullNamePlaceholder")}
                />
                <Input
                  type="email"
                  label={t("email")}
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder={t("emailPlaceholder")}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">{t("role")}</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      role: e.target.value as UserRole,
                    }))
                  }
                  className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <option value="admin">{t("roleAdmin")}</option>
                  <option value="manager">{t("roleManager")}</option>
                  <option value="viewer">{t("roleViewer")}</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleAddUser} size="sm">
                  {t("add")}
                </Button>
                <Button
                  onClick={() => setShowAddUser(false)}
                  size="sm"
                  variant="outline"
                >
                  {common("cancel")}
                </Button>
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            {subUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getRoleBadge(
                      user.role
                    )}`}
                  >
                    {user.role === "admin" ? t("roleAdminShort") : null}
                    {user.role === "manager" ? t("roleManagerShort") : null}
                    {user.role === "viewer" ? t("roleViewerShort") : null}
                  </span>
                  <Button
                    onClick={() => setMessage(t("editComingSoon"))}
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">{t("notifications")}</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{t("orderUpdates")}</p>
                <p className="text-xs text-gray-500">{t("orderUpdatesDesc")}</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-blue-600" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{t("stockAlerts")}</p>
                <p className="text-xs text-gray-500">{t("stockAlertsDesc")}</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-blue-600" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{t("emailNotifications")}</p>
                <p className="text-xs text-gray-500">{t("emailNotificationsDesc")}</p>
              </div>
              <input type="checkbox" className="h-4 w-4 accent-blue-600" />
            </label>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">{t("system")}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">{t("language")}</label>
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select className="w-full h-9 rounded-md border border-gray-300 pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                  <option value="tr">{t("languageTr")}</option>
                  <option value="en">{t("languageEn")}</option>
                  <option value="de">{t("languageDe")}</option>
                  <option value="ru">{t("languageRu")}</option>
                  <option value="ar">{t("languageAr")}</option>
                  <option value="es">{t("languageEs")}</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">{t("timezone")}</label>
              <select className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <option value="istanbul">{t("timezoneIstanbul")}</option>
                <option value="utc">{t("timezoneUTC")}</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <Lock className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">{t("security")}</h3>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              label={t("currentPassword")}
              placeholder={t("currentPasswordPlaceholder")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="password"
                label={t("newPassword")}
                placeholder={t("newPasswordPlaceholder")}
              />
              <Input
                type="password"
                label={t("confirmPassword")}
                placeholder={t("confirmPasswordPlaceholder")}
              />
            </div>
            <Button variant="outline" size="sm">
              {t("changePassword")}
            </Button>
          </div>
        </Card>

        <div className="flex items-center gap-3 pt-2">
          <Button onClick={handleSave}>{t("saveChanges")}</Button>
          <Button onClick={() => router.push("/dashboard")} variant="outline">
            {common("cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
}

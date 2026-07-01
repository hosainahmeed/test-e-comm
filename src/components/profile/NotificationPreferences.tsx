"use client";

import React, { useState } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Package,
  Tag,
  Newspaper,
  CheckCircle,
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

export default function NotificationPreferences() {
  const { profile, updateNotificationPreferences } = useProfile();
  const notifications = profile.notifications;
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: string) => {
    updateNotificationPreferences({
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const channels = [
    {
      key: "email",
      label: "Email Notifications",
      icon: Mail,
      description: "Receive notifications via email",
    },
    {
      key: "push",
      label: "Push Notifications",
      icon: Bell,
      description: "Receive push notifications in browser",
    },
    {
      key: "sms",
      label: "SMS Notifications",
      icon: Smartphone,
      description: "Receive text messages on your phone",
    },
  ];

  const types = [
    {
      key: "orderUpdates",
      label: "Order Updates",
      icon: Package,
      description: "Get notified about order status changes",
    },
    {
      key: "promotions",
      label: "Promotions & Deals",
      icon: Tag,
      description: "Receive promotional offers and discounts",
    },
    {
      key: "newsletter",
      label: "Newsletter",
      icon: Newspaper,
      description: "Weekly newsletter with product updates",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell size={20} className="text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            Notification Channels
          </h3>
        </div>

        <div className="space-y-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const isEnabled = notifications[
              channel.key as keyof typeof notifications
            ] as boolean;

            return (
              <div
                key={channel.key}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${isEnabled ? "bg-blue-50" : "bg-gray-100"}`}
                  >
                    <Icon
                      size={18}
                      className={isEnabled ? "text-blue-600" : "text-gray-400"}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {channel.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {channel.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(channel.key)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isEnabled ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      isEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Types */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare size={20} className="text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            Notification Types
          </h3>
        </div>

        <div className="space-y-4">
          {types.map((type) => {
            const Icon = type.icon;
            const isEnabled = notifications[
              type.key as keyof typeof notifications
            ] as boolean;

            return (
              <div
                key={type.key}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${isEnabled ? "bg-blue-50" : "bg-gray-100"}`}
                  >
                    <Icon
                      size={18}
                      className={isEnabled ? "text-blue-600" : "text-gray-400"}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {type.label}
                    </p>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(type.key)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isEnabled ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      isEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Preferences
        </button>
        {saved && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Preferences saved!</span>
          </div>
        )}
      </div>
    </div>
  );
}

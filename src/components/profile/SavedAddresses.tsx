"use client";

import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Home,
  Briefcase,
  Star,
} from "lucide-react";
import { Address } from "../../types/profile";
import { useProfile } from "@/contexts/ProfileContext";

export default function SavedAddresses() {
  const { profile, updateProfile } = useProfile();
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: "Home",
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const addresses = profile.addresses || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: editingAddress ? editingAddress.id : `addr-${Date.now()}`,
      ...formData,
      isDefault: editingAddress
        ? editingAddress.isDefault
        : addresses.length === 0,
    };

    let updatedAddresses;
    if (editingAddress) {
      updatedAddresses = addresses.map((addr: any) =>
        addr.id === editingAddress.id ? newAddress : addr,
      );
    } else {
      updatedAddresses = [...addresses, newAddress];
    }

    updateProfile({ addresses: updatedAddresses } as any);
    setIsAdding(false);
    setEditingAddress(null);
    setFormData({
      label: "Home",
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    });
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phone: address.phone,
    });
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      updateProfile({
        addresses: addresses.filter((addr: any) => addr.id !== id),
      } as any);
    }
  };

  const handleSetDefault = (id: string) => {
    updateProfile({
      addresses: addresses.map((addr: any) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    } as any);
  };

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return Home;
      case "office":
        return Briefcase;
      case "warehouse":
        return Briefcase;
      default:
        return MapPin;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
        {!isAdding && (
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingAddress(null);
              setFormData({
                label: "Home",
                fullName: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                phone: "",
              });
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            <Plus size={16} />
            Add New
          </button>
        )}
      </div>

      {/* Address Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <select
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              {editingAddress ? "Update Address" : "Save Address"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingAddress(null);
              }}
              className="flex-1 px-4 py-2 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Address List */}
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No saved addresses yet</p>
          </div>
        ) : (
          addresses.map((address: any) => {
            const Icon = getIcon(address.label);
            return (
              <div
                key={address.id}
                className={`p-4 border rounded-lg ${address.isDefault ? "border-blue-200 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">
                          {address.label}
                        </h4>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.fullName}
                      </p>
                      <p className="text-sm text-gray-600">{address.street}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-gray-100 rounded-lg"
                        title="Set as default"
                      >
                        <Star size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

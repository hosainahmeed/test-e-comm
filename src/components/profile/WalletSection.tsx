"use client";

import React from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { WalletTransaction } from "../../types/profile";
import { useProfile } from "@/contexts/ProfileContext";

export default function WalletSection() {
  const { profile } = useProfile();
  const wallet = profile.wallet;

  const last5Transactions = wallet.transactions.slice(-5).reverse();

  const getTransactionIcon = (type: WalletTransaction["type"]) => {
    return type === "credit" ? ArrowUpRight : ArrowDownRight;
  };

  const getTransactionColor = (type: WalletTransaction["type"]) => {
    return type === "credit" ? "text-green-600" : "text-red-600";
  };

  const getTransactionBg = (type: WalletTransaction["type"]) => {
    return type === "credit" ? "bg-green-50" : "bg-red-50";
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet size={24} />
            <h3 className="font-semibold text-lg">Store Credit</h3>
          </div>
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
            Active
          </span>
        </div>
        <p className="text-4xl font-bold mb-2">${wallet.balance.toFixed(2)}</p>
        <p className="text-blue-100 text-sm">Available balance for purchases</p>

        {/* Quick Actions */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors">
            Add Funds
          </button>
          <button className="flex-1 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
            View History
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h3>
          <span className="text-sm text-gray-500">Last 5 transactions</span>
        </div>

        {last5Transactions.length === 0 ? (
          <div className="text-center py-8">
            <Wallet size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {last5Transactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              const colorClass = getTransactionColor(transaction.type);
              const bgClass = getTransactionBg(transaction.type);

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${bgClass}`}>
                      <Icon size={16} className={colorClass} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${colorClass}`}>
                      {transaction.type === "credit" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Balance: ${transaction.balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

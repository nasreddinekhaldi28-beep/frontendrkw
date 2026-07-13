"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

// ─── types ────────────────────────────────────────────────────────────────────

interface Stats {
  total_orders: number;
  total_revenue: number;
  avg_order_value: number;
  today: { orders: number; revenue: number };
  week: { orders: number; revenue: number };
  month: { orders: number; revenue: number };
  daily: { date: string; count: number; revenue: number }[];
  top_products: { sku: string; name: string; qty: number; revenue: number }[];
  status_breakdown: Record<string, number>;
}

interface RecentOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  total: number;
  status: string;
  created_at: string;
  items: { product_name: string; quantity: number; line_total: number; is_oto_upsell: boolean }[];
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString("en-KW", { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + " KWD";

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const shortDate = (iso: string) => iso.slice(5); // MM-DD

const STATUS_COLOR: Record<string, string> = {
  new: "bg-sky-100 text-sky-700",
  confirmed: "bg-amber-100 text-amber-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <span className="text-slate-500 text-sm font-medium">{label}</span>
        <span className={`text-xl w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </span>
      </div>
      <p className="text-2xl font-black text-slate-800">{value}</p>
      {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}

// ─── Profit Calculator ────────────────────────────────────────────────────────

function ProfitCalc({ aov }: { aov: number }) {
  const [sellPrice, setSellPrice] = useState(aov > 0 ? parseFloat(aov.toFixed(3)) : 29.9);
  const [fulfillment, setFulfillment] = useState(11);
  const [cplUsd, setCplUsd] = useState(5);
  const [usdRate, setUsdRate] = useState(0.308);
  const [confRate, setConfRate] = useState(65);
  const [delivRate, setDelivRate] = useState(60);
  const [monthlyBudgetUsd, setMonthlyBudgetUsd] = useState(100);

  const cplKwd = cplUsd * usdRate;
  const effectiveRate = (confRate / 100) * (delivRate / 100);
  const adsCostPerDelivered = effectiveRate > 0 ? cplKwd / effectiveRate : 0;
  const totalCost = adsCostPerDelivered + fulfillment;
  const profit = sellPrice - totalCost;
  const margin = sellPrice > 0 ? (profit / sellPrice) * 100 : 0;
  const roas = cplKwd > 0 ? (sellPrice * effectiveRate) / cplKwd : 0;
  const breakEvenCr =
    sellPrice - fulfillment > 0
      ? (cplKwd / ((sellPrice - fulfillment) * (delivRate / 100))) * 100
      : 0;

  const monthlyBudgetKwd = monthlyBudgetUsd * usdRate;
  const monthlyLeads = cplKwd > 0 ? monthlyBudgetKwd / cplKwd : 0;
  const monthlyDelivered = monthlyLeads * effectiveRate;
  const monthlyRevenue = monthlyDelivered * sellPrice;
  const monthlyFulfillment = monthlyDelivered * fulfillment;
  const monthlyProfit = monthlyRevenue - monthlyFulfillment - monthlyBudgetKwd;

  const inp =
    "w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="font-bold text-slate-800 text-base mb-5">📊 Profit Calculator</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <label className="block">
          <span className="text-xs font-medium text-slate-500 mb-1 block">Sell Price (KWD)</span>
          <input
            type="number"
            step="0.1"
            value={sellPrice}
            onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
            className={inp}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-slate-500 mb-1 block">
            Product + Fulfillment (KWD)
          </span>
          <input
            type="number"
            step="0.1"
            value={fulfillment}
            onChange={(e) => setFulfillment(parseFloat(e.target.value) || 0)}
            className={inp}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-slate-500 mb-1 block">
            Facebook CPL (USD)
          </span>
          <input
            type="number"
            step="0.1"
            value={cplUsd}
            onChange={(e) => setCplUsd(parseFloat(e.target.value) || 0)}
            className={inp}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-slate-500 mb-1 block">
            USD → KWD Rate
          </span>
          <input
            type="number"
            step="0.001"
            value={usdRate}
            onChange={(e) => setUsdRate(parseFloat(e.target.value) || 0)}
            className={inp}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-slate-500 mb-1 block">
            Confirmation Rate (%)
          </span>
          <input
            type="number"
            step="1"
            min="0"
            max="100"
            value={confRate}
            onChange={(e) => setConfRate(parseFloat(e.target.value) || 0)}
            className={inp}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-slate-500 mb-1 block">
            Delivery Rate (%)
          </span>
          <input
            type="number"
            step="1"
            min="0"
            max="100"
            value={delivRate}
            onChange={(e) => setDelivRate(parseFloat(e.target.value) || 0)}
            className={inp}
          />
        </label>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "CPL in KWD",
            val: `${cplKwd.toFixed(3)} KWD`,
            color: "bg-slate-50 text-slate-700",
          },
          {
            label: "Ads cost / delivered",
            val: `${adsCostPerDelivered.toFixed(3)} KWD`,
            color: "bg-slate-50 text-slate-700",
          },
          {
            label: "Profit / order",
            val: `${profit.toFixed(3)} KWD`,
            color: profit >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
          },
          {
            label: "Margin",
            val: `${margin.toFixed(1)}%`,
            color: margin >= 30 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700",
          },
          {
            label: "ROAS",
            val: `×${roas.toFixed(2)}`,
            color: roas >= 2 ? "bg-sky-50 text-sky-700" : "bg-red-50 text-red-700",
          },
          {
            label: "Break-even CR",
            val: `${breakEvenCr.toFixed(1)}%`,
            color: breakEvenCr <= confRate ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
          },
          {
            label: "Effective delivery",
            val: `${(effectiveRate * 100).toFixed(1)}%`,
            color: "bg-slate-50 text-slate-700",
          },
          {
            label: "Total cost / order",
            val: `${totalCost.toFixed(3)} KWD`,
            color: "bg-slate-50 text-slate-700",
          },
        ].map(({ label, val, color }) => (
          <div key={label} className={`rounded-xl px-4 py-3 ${color}`}>
            <p className="text-xs opacity-70 mb-0.5">{label}</p>
            <p className="font-black text-base">{val}</p>
          </div>
        ))}
      </div>

      {/* Monthly projection */}
      <div className="border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-slate-600">Monthly Ad Budget (USD)</span>
          <input
            type="number"
            step="50"
            value={monthlyBudgetUsd}
            onChange={(e) => setMonthlyBudgetUsd(parseFloat(e.target.value) || 0)}
            className="w-32 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-sky-400"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Leads generated", val: Math.round(monthlyLeads).toString() },
            { label: "Delivered orders", val: Math.round(monthlyDelivered).toString() },
            {
              label: "Monthly revenue",
              val: `${monthlyRevenue.toFixed(3)} KWD`,
            },
            {
              label: "Monthly profit",
              val: `${monthlyProfit.toFixed(3)} KWD`,
              highlight: monthlyProfit >= 0 ? "emerald" : "red",
            },
          ].map(({ label, val, highlight }) => (
            <div
              key={label}
              className={`rounded-xl px-4 py-3 ${
                highlight === "emerald"
                  ? "bg-emerald-50 text-emerald-800"
                  : highlight === "red"
                  ? "bg-red-50 text-red-800"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              <p className="text-xs opacity-60 mb-0.5">{label}</p>
              <p className="font-black text-base">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("rk_admin_token");
    router.replace("/admin");
  }, [router]);

  useEffect(() => {
    const stored = localStorage.getItem("rk_admin_token");
    if (!stored) {
      router.replace("/admin");
      return;
    }
    setToken(stored);

    const headers = { Authorization: `Bearer ${stored}` };

    Promise.all([
      fetch(`${API}/admin/stats`, { headers }).then((r) => r.json()),
      fetch(`${API}/admin/orders?page=1&limit=10`, { headers }).then((r) => r.json()),
    ])
      .then(([s, o]) => {
        setStats(s);
        setRecentOrders(o.orders ?? []);
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [router, logout]);

  if (!token || loading) {
    return (
      <div dir="ltr" className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm animate-pulse">Loading dashboard…</div>
      </div>
    );
  }

  const maxDailyCount = Math.max(...(stats?.daily.map((d) => d.count) ?? [1]), 1);

  return (
    <div dir="ltr" className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar ── */}
      <aside className="w-56 flex-shrink-0 bg-slate-900 min-h-screen flex flex-col hidden md:flex">
        <div className="px-5 py-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Rahat Kuwait</p>
              <p className="text-slate-500 text-xs mt-0.5">Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { href: "/admin/dashboard", label: "Dashboard", icon: "📊", active: true },
            { href: "/admin/orders", label: "Orders", icon: "📦", active: false },
          ].map(({ href, label, icon, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-sky-500 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-300 text-sm rounded-xl hover:bg-slate-800 transition-colors"
          >
            <span>→</span> Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 overflow-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-bold text-slate-800 text-lg">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/orders" className="text-sm text-sky-600 hover:underline font-medium">
              View all orders →
            </Link>
            <button
              onClick={logout}
              className="text-xs text-slate-400 hover:text-slate-600 md:hidden"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="px-6 py-6 space-y-6 max-w-7xl">

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Today — Orders"
              value={String(stats?.today.orders ?? 0)}
              sub={`Revenue: ${fmt(stats?.today.revenue ?? 0)}`}
              color="bg-sky-50 text-sky-600"
              icon="📅"
            />
            <StatCard
              label="This Week"
              value={String(stats?.week.orders ?? 0)}
              sub={`Revenue: ${fmt(stats?.week.revenue ?? 0)}`}
              color="bg-violet-50 text-violet-600"
              icon="📆"
            />
            <StatCard
              label="This Month"
              value={String(stats?.month.orders ?? 0)}
              sub={`Revenue: ${fmt(stats?.month.revenue ?? 0)}`}
              color="bg-amber-50 text-amber-600"
              icon="🗓️"
            />
            <StatCard
              label="All Time"
              value={String(stats?.total_orders ?? 0)}
              sub={`Revenue: ${fmt(stats?.total_revenue ?? 0)}`}
              color="bg-emerald-50 text-emerald-600"
              icon="🏆"
            />
          </div>

          {/* AOV */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Avg Order Value (AOV)"
              value={fmt(stats?.avg_order_value ?? 0)}
              color="bg-sky-50 text-sky-600"
              icon="💰"
            />
            <StatCard
              label="Total Revenue"
              value={fmt(stats?.total_revenue ?? 0)}
              color="bg-emerald-50 text-emerald-600"
              icon="💵"
            />
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-3">Order Status</p>
              <div className="space-y-2">
                {Object.entries(stats?.status_breakdown ?? {}).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                        STATUS_COLOR[status] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {status}
                    </span>
                    <span className="font-bold text-slate-700 text-sm">{count}</span>
                  </div>
                ))}
                {Object.keys(stats?.status_breakdown ?? {}).length === 0 && (
                  <p className="text-slate-400 text-xs">No orders yet</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Orders by day chart ── */}
          {(stats?.daily.length ?? 0) > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-800 text-base mb-5">
                Orders — Last 14 Days
              </h2>
              <div className="flex items-end gap-2 h-32">
                {stats!.daily.map((d) => (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.count} · {d.revenue.toFixed(2)}
                    </span>
                    <div
                      className="w-full bg-sky-500 rounded-t-md hover:bg-sky-400 transition-colors cursor-default"
                      style={{
                        height: `${Math.max(4, (d.count / maxDailyCount) * 96)}px`,
                      }}
                    />
                    <span className="text-[9px] text-slate-400 mt-1">
                      {shortDate(d.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Top products ── */}
          {(stats?.top_products.length ?? 0) > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-800 text-base mb-4">Top Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 text-xs border-b border-slate-100">
                      <th className="pb-2 font-medium">#</th>
                      <th className="pb-2 font-medium">Product</th>
                      <th className="pb-2 font-medium text-right">Units Sold</th>
                      <th className="pb-2 font-medium text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {stats!.top_products.map((p, i) => (
                      <tr key={p.sku} className="hover:bg-slate-50">
                        <td className="py-2.5 text-slate-400 font-medium">{i + 1}</td>
                        <td className="py-2.5">
                          <p className="font-medium text-slate-800 truncate max-w-xs">{p.name}</p>
                          <p className="text-slate-400 text-xs">{p.sku}</p>
                        </td>
                        <td className="py-2.5 text-right font-bold text-slate-700">{p.qty}</td>
                        <td className="py-2.5 text-right font-bold text-sky-600">
                          {fmt(p.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Profit calculator ── */}
          <ProfitCalc aov={stats?.avg_order_value ?? 0} />

          {/* ── Recent orders ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-base">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs text-sky-600 hover:underline">
                View all →
              </Link>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-slate-400 text-sm">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 text-xs border-b border-slate-100">
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Order ID</th>
                      <th className="pb-2 font-medium">Customer</th>
                      <th className="pb-2 font-medium">Phone</th>
                      <th className="pb-2 font-medium text-right">Total</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentOrders.map((o) => (
                      <>
                        <tr
                          key={o.id}
                          className="hover:bg-slate-50 cursor-pointer"
                          onClick={() =>
                            setExpandedOrder(expandedOrder === o.id ? null : o.id)
                          }
                        >
                          <td className="py-3 text-slate-500 whitespace-nowrap">
                            {fmtDate(o.created_at)}
                          </td>
                          <td className="py-3 font-mono text-xs text-slate-700">
                            {o.order_number}
                          </td>
                          <td className="py-3 font-medium text-slate-800 dir-rtl">
                            {o.customer_name}
                          </td>
                          <td className="py-3 text-slate-600 font-mono text-xs">
                            {o.customer_phone}
                          </td>
                          <td className="py-3 text-right font-bold text-slate-800">
                            {fmt(o.total)}
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                                STATUS_COLOR[o.status] ?? "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                        {expandedOrder === o.id && (
                          <tr key={`${o.id}-expanded`} className="bg-slate-50">
                            <td colSpan={6} className="py-3 px-4">
                              <div className="space-y-1">
                                {o.items.map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between text-xs text-slate-600 bg-white rounded-lg px-3 py-2 border border-slate-100"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="font-bold text-slate-700">
                                        ×{item.quantity}
                                      </span>
                                      <span dir="rtl">{item.product_name}</span>
                                      {item.is_oto_upsell && (
                                        <span className="bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                                          OTO
                                        </span>
                                      )}
                                    </span>
                                    <span className="font-bold text-slate-800">
                                      {fmt(item.line_total)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

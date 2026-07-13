"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

interface OrderItem {
  sku: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  is_oto_upsell: boolean;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  total: number;
  currency: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const STATUS_COLOR: Record<string, string> = {
  new: "bg-sky-100 text-sky-700",
  confirmed: "bg-amber-100 text-amber-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const fmt = (n: number) =>
  n.toLocaleString("en-KW", { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + " KWD";

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminOrders() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const limit = 50;

  const logout = useCallback(() => {
    localStorage.removeItem("rk_admin_token");
    router.replace("/admin");
  }, [router]);

  const fetchOrders = useCallback(
    async (tok: string, q: string, pg: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(pg),
          limit: String(limit),
          search: q,
        });
        const res = await fetch(`${API}/admin/orders?${params}`, {
          headers: { Authorization: `Bearer ${tok}` },
        });
        if (res.status === 401) { logout(); return; }
        const data = await res.json();
        setOrders(data.orders ?? []);
        setTotal(data.total ?? 0);
      } catch {
        // keep current state
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  useEffect(() => {
    const stored = localStorage.getItem("rk_admin_token");
    if (!stored) { router.replace("/admin"); return; }
    setToken(stored);
    fetchOrders(stored, "", 1);
  }, [router, fetchOrders]);

  // Debounce search
  useEffect(() => {
    if (!token) return;
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setPage(1);
      fetchOrders(token, search, 1);
    }, 400);
  }, [search, token, fetchOrders]);

  // Page change
  useEffect(() => {
    if (!token) return;
    fetchOrders(token, search, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  if (!token) {
    return (
      <div dir="ltr" className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm animate-pulse">Loading…</div>
      </div>
    );
  }

  return (
    <div dir="ltr" className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar ── */}
      <aside className="w-56 flex-shrink-0 bg-slate-900 min-h-screen flex-col hidden md:flex">
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
            { href: "/admin/dashboard", label: "Dashboard", icon: "📊", active: false },
            { href: "/admin/orders", label: "Orders", icon: "📦", active: true },
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

      {/* ── Main ── */}
      <div className="flex-1 min-w-0 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-bold text-slate-800 text-lg">Orders</h1>
            <p className="text-slate-400 text-xs mt-0.5">{total} total orders</p>
          </div>
          <Link href="/admin/dashboard" className="text-sm text-sky-600 hover:underline font-medium">
            ← Dashboard
          </Link>
        </header>

        <div className="px-6 py-6">
          {/* Search bar */}
          <div className="mb-4 flex gap-3 items-center">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, phone, or order ID…"
                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 bg-white"
              />
            </div>
            {loading && (
              <span className="text-slate-400 text-xs animate-pulse">Loading…</span>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-left text-slate-500 text-xs">
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Order ID</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Products</th>
                    <th className="px-4 py-3 font-semibold text-right">Total</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-slate-400 text-sm">
                        {loading ? "Loading orders…" : "No orders found"}
                      </td>
                    </tr>
                  )}
                  {orders.map((o) => (
                    <>
                      <tr
                        key={o.id}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setExpandedId(expandedId === o.id ? null : o.id)}
                      >
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">
                          {fmtDate(o.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                            {o.order_number}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800" dir="rtl">
                          {o.customer_name}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-600">
                          {o.customer_phone}
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs max-w-xs">
                          <span className="truncate block" dir="rtl">
                            {o.items
                              .map((i) => `${i.quantity}× ${i.product_name}`)
                              .join(" / ")}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-slate-800 whitespace-nowrap">
                          {fmt(o.total)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                              STATUS_COLOR[o.status] ?? "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                      {expandedId === o.id && (
                        <tr key={`${o.id}-exp`} className="bg-slate-50">
                          <td colSpan={7} className="px-6 py-4">
                            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                              Order Items
                            </p>
                            <div className="space-y-2">
                              {o.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-slate-200"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-white bg-slate-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                      {item.quantity}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-slate-800" dir="rtl">
                                        {item.product_name}
                                      </p>
                                      <p className="text-xs text-slate-400">{item.sku}</p>
                                    </div>
                                    {item.is_oto_upsell && (
                                      <span className="text-[10px] bg-amber-100 text-amber-600 font-bold px-1.5 py-0.5 rounded-full">
                                        OTO
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-slate-800 text-sm">
                                      {fmt(item.line_total)}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                      {fmt(item.unit_price)} / unit
                                    </p>
                                  </div>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Page {page} of {totalPages} · {total} orders
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
                  >
                    ← Prev
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

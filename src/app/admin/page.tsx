"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("rk_admin_token")) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
        setLoading(false);
        return;
      }
      const data = await res.json();
      localStorage.setItem("rk_admin_token", data.access_token);
      router.replace("/admin/dashboard");
    } catch {
      setError("تعذر الاتصال بالخادم — تحقق من الاتصال");
      setLoading(false);
    }
  }

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-slate-900 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500 mb-4 shadow-lg">
            <span className="text-2xl font-black text-white">R</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Rahat Kuwait</h1>
          <p className="text-slate-400 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700 space-y-4"
        >
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-slate-500"
              placeholder="rahatkwt"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-slate-500"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          Rahat Kuwait — Internal Admin
        </p>
      </div>
    </div>
  );
}

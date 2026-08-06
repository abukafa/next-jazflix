"use client";
import { useState, useMemo } from "react";

const remove = async (id) => {
  if (!confirm("Yakin mau hapus pengguna ini?")) return;
  const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json();
    alert(error.message || "Gagal menghapus");
    return;
  }
  window.location.reload();
};

const approve = async (id) => {
  if (!confirm("Setujui akun ini?")) return;
  const res = await fetch(`/api/users/${id}/approve`, { method: "PATCH" });
  if (!res.ok) {
    const error = await res.json();
    alert(error.message || "Gagal menyetujui");
    return;
  }
  window.location.reload();
};

const revoke = async (id) => {
  if (!confirm("Turunkan akun ini kembali menjadi guest (pending)?")) return;
  const res = await fetch(`/api/users/${id}/revoke`, { method: "PATCH" });
  if (!res.ok) {
    const error = await res.json();
    alert(error.message || "Gagal mengubah status");
    return;
  }
  window.location.reload();
};

export default function TableUsers({ users = [] }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 10;

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = users.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return s === "" || name.includes(s) || email.includes(s);
    });
    return list;
  }, [search, users]);

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (Math.min(page, totalPages) - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Admins</h2>

      {/* FILTER BAR */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm w-60"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white/5 rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-gray-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status Admin</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user) => (
              <tr
                key={user._id}
                className="border-t border-white/10 hover:bg-white/10"
              >
                <td className="px-4 py-3">{user.name || "-"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${user.role === "superadmin" ? "bg-red-900 text-red-200" : "bg-gray-700 text-gray-200"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {user.isApproved ? (
                    <span className="text-green-400">
                      <i className="fa fa-check mr-1"></i> Approved
                    </span>
                  ) : (
                    <span className="text-yellow-400">
                      <i className="fa fa-clock mr-1"></i> Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {!user.isApproved && (
                    <button
                      onClick={() => approve(user._id)}
                      className="text-green-500 text-lg mr-4 cursor-pointer"
                      title="Approve"
                    >
                      <i className="fa fa-check-circle" />
                    </button>
                  )}
                  {user.isApproved && user.role !== "superadmin" && (
                    <button
                      onClick={() => revoke(user._id)}
                      className="text-yellow-500 text-lg mr-4 cursor-pointer"
                      title="Revoke / Jadikan Pending"
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  )}
                  {user.role !== "superadmin" && (
                    <button
                      onClick={() => remove(user._id)}
                      className="text-red-500 text-lg cursor-pointer"
                      title="Delete"
                    >
                      <i className="fa fa-trash" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 mt-4 text-xs">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className="px-3 py-1 bg-black/40 border border-gray-700 rounded hover:bg-white/10"
        >
          Prev
        </button>
        <span className="text-gray-400">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className="px-3 py-1 bg-black/40 border border-gray-700 rounded hover:bg-white/10"
        >
          Next
        </button>
      </div>
    </div>
  );
}

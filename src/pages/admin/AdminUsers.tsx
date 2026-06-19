import { getUsers } from "@/api/adminApi";
import { useQuery } from "@tanstack/react-query";

const AdminUsers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: getUsers,
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-lg text-red-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  const users = data ?? [];

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                User Directory
              </h1>

              <p className="mt-2 text-zinc-400">
                Manage and monitor all registered users.
              </p>
            </div>

            <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3">
              <p className="text-sm text-zinc-400">Total Users</p>
              <p className="text-xl font-bold text-orange-500">
                {users.length}
              </p>
            </div>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid gap-4 md:hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="
                  rounded-2xl
                  border border-zinc-800
                  bg-zinc-950
                  p-5
                  transition-all
                  duration-300
                  hover:border-orange-500/30
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">
                      {user.name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400 break-all">
                      {user.email}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-orange-500/10 text-orange-500"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </div>

                <div className="mt-4 border-t border-zinc-800 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                      Verification
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.verified
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {user.verified
                        ? "✓ Verified"
                        : "✕ Not Verified"}
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-zinc-600 break-all">
                    ID: {user.id}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                    USER
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                    EMAIL
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                    ROLE
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                    STATUS
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                    ID
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="
                      border-b
                      border-zinc-800
                      transition-all
                      duration-300
                      hover:bg-zinc-800/30
                    "
                  >
                    <td className="px-4 py-5">
                      <p className="font-medium text-white">
                        {user.name}
                      </p>
                    </td>

                    <td className="px-4 py-5 text-zinc-300">
                      {user.email}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-orange-500/10 text-orange-500"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {user.role.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.verified
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {user.verified
                          ? "✓ Verified"
                          : "✕ Not Verified"}
                      </span>
                    </td>

                    <td className="max-w-[200px] truncate px-4 py-5 text-zinc-500">
                      {user.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
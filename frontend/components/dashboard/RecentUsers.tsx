import { users } from "@/data/dashboardData";


export default function RecentUsers() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Users</h2>
        <button type="submit">View all</button>
      </div>

      <div className="space-y-4">
        {users.map((user) => ( 
          <div
            key={user.id}
            className="flex items-center justify-between border-b pb-4 last:border-none gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{user.name}</p>
              <p className="text-gray-500 text-sm truncate">{user.email}</p>
            </div>

            <div className="shrink-0">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {user.status}
              </span>
            </div>

            <div className="hidden sm:block text-gray-500 text-sm shrink-0">
              {user.created}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import prisma from "../../../../../prisma.js";

const Dashboard = async () => {
  const totalCustomers = await prisma.customer.count();
  const totalGroups = await prisma.notificationGroup.count();

  const stats = [
    { name: "Total Customers", stat: totalCustomers },
    { name: "Total Groups", stat: totalGroups},
  ];

  return (
    <>
      <div className="p-5">
        <div className="mt-5 flex gap-5">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-gray-800 w-80 px-4 py-5 shadow"
            >
              <div className="truncate text-sm font-medium text-gray-500 text-gray-400">
                {item.name}
              </div>
              <div className="mt-1 text-3xl font-semibold tracking-tight text-gray-200">
                {item.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
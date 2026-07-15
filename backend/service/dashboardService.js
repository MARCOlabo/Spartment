const rooms = [
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Occupied" },
  { status: "Vacant" },
];

const tenants = [
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
  { status: "Active" },
];

const payments = [
  { amount: 25000, status: "Paid" },
  { amount: 30000, status: "Paid" },
  { amount: 35000, status: "Paid" },
  { amount: 35000, status: "Late" },
];

export async function fetchDashboardMetrics() {
  try {
    const monthlyRevenue = payments.reduce(
      (total, payment) => total + payment.amount,
      0
    );

    const occupiedRooms = rooms.filter(
      (room) => room.status === "Occupied"
    ).length;

    const occupancy = Math.round(
      (occupiedRooms / rooms.length) * 100
    );

    const activeTenants = tenants.filter(
      (tenant) => tenant.status === "Active"
    ).length;

    const latePayments = payments.filter(
      (payment) => payment.status === "Late"
    ).length;

    return {
      monthlyRevenue: `₱${monthlyRevenue.toLocaleString()}`,
      occupancy: `${occupancy}%`,
      activeTenants,
      latePayments,
    };
  } catch {
    throw new Error(
      "Failed to retrieve dashboard metrics."
    );
  }
}
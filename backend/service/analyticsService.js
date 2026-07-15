import {
  getAnalyticsData,
} from "../model/analyticsModel.js";


export async function fetchAnalyticsData() {
  try {
    const data =
      await getAnalyticsData();


    if (!data) {
      return null;
    }


    return {
      totalRevenue:
        calculateTotalRevenue(
          data.revenue
        ),

      totalTenants:
        calculateTotalTenants(
          data.tenants
        ),

      occupancyRate:
        calculateOccupancyRate(
          data.rooms
        ),

      paymentStatus:
        calculatePaymentStatus(
          data.payments
        ),

      revenueTrend:
        data.revenueTrend || [],

      recommendations:
        data.recommendations || [],
    };

  } catch (error) {
    throw new Error(
      "Failed to retrieve analytics information."
    );
  }
}



function calculateTotalRevenue(
  revenue = []
) {
  return revenue.reduce(
    (total, item) =>
      total + item.amount,
    0
  );
}



function calculateTotalTenants(
  tenants = []
) {
  return tenants.length;
}



function calculateOccupancyRate(
  rooms = []
) {
  if (rooms.length === 0) {
    return 0;
  }


  const occupied =
    rooms.filter(
      (room) =>
        room.status === "Occupied"
    ).length;


  return (
    (occupied / rooms.length) *
    100
  );
}



function calculatePaymentStatus(
  payments = []
) {

  return {
    paid:
      payments.filter(
        (payment) =>
          payment.status === "Paid"
      ).length,


    pending:
      payments.filter(
        (payment) =>
          payment.status === "Pending"
      ).length,


    overdue:
      payments.filter(
        (payment) =>
          payment.status === "Overdue"
      ).length,
  };
}
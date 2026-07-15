import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  fetchDashboardMetrics,
} from "../service/dashboardService.js";

describe("Dashboard Service", () => {
  beforeEach(() => {});

  it("should calculate the monthly revenue successfully", async () => {
    // Act
    const result = await fetchDashboardMetrics();

    // Assert
    expect(result.monthlyRevenue).toBe("₱125,000");
  });

  it("should calculate the occupancy rate successfully", async () => {
    // Act
    const result = await fetchDashboardMetrics();

    // Assert
    expect(result.occupancy).toBe("95%");
  });

  it("should calculate the total active tenants successfully", async () => {
    // Act
    const result = await fetchDashboardMetrics();

    // Assert
    expect(result.activeTenants).toBe(32);
  });

  it("should calculate the total late payments successfully", async () => {
    // Act
    const result = await fetchDashboardMetrics();

    // Assert
    expect(result.latePayments).toBe(1);
  });

  it("should return all dashboard metrics successfully", async () => {
    // Act
    const result = await fetchDashboardMetrics();

    // Assert
    expect(result).toEqual({
      monthlyRevenue: "₱125,000",
      occupancy: "95%",
      activeTenants: 32,
      latePayments: 1,
    });
  });
});
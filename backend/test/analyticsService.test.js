import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";


vi.mock(
  "../model/analyticsModel.js",
  () => ({
    getAnalyticsData:
      vi.fn(),
  })
);


import {
  getAnalyticsData,
} from "../model/analyticsModel.js";


import {
  fetchAnalyticsData,
} from "../service/analyticsService.js";


describe(
  "Analytics Service",
  () => {


beforeEach(() => {
  vi.clearAllMocks();
});


const mockAnalytics = {

  revenue: [
    {
      amount: 50000,
    },
    {
      amount: 30000,
    },
  ],


  tenants: [
    {
      id:1,
    },
    {
      id:2,
    },
  ],


  rooms:[
    {
      status:"Occupied",
    },
    {
      status:"Vacant",
    },
  ],


  payments:[
    {
      status:"Paid",
    },
    {
      status:"Pending",
    },
    {
      status:"Overdue",
    },
  ],


  revenueTrend:[],

  recommendations:[],
};



it(
"should calculate analytics successfully",
async()=>{


// Arrange

getAnalyticsData.mockResolvedValue(
  mockAnalytics
);


// Act

const result =
 await fetchAnalyticsData();


// Assert

expect(
 result.totalRevenue
)
.toBe(80000);


expect(
 result.totalTenants
)
.toBe(2);


expect(
 result.occupancyRate
)
.toBe(50);


expect(
 result.paymentStatus
)
.toEqual({
  paid:1,
  pending:1,
  overdue:1,
});


});



it(
"should return null when no analytics data exists",
async()=>{


getAnalyticsData.mockResolvedValue(
 null
);


const result =
 await fetchAnalyticsData();


expect(result)
.toBeNull();


});



it(
"should throw error when analytics retrieval fails",
async()=>{


getAnalyticsData.mockRejectedValue(
 new Error(
  "Database Error"
 )
);


await expect(
 fetchAnalyticsData()
)
.rejects.toThrow(
 "Failed to retrieve analytics information."
);


});


});
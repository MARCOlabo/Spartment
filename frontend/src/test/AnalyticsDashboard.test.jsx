import {
 beforeEach,
 describe,
 expect,
 it,
 vi,
} from "vitest";


import {
 render,
 screen,
 waitFor,
} from "@testing-library/react";


vi.mock(
 "../api/analyticsApi",
 ()=>({
  getAnalytics: vi.fn(),
 })
);



import {
 getAnalytics,
} from "../api/analyticsApi";


import AnalyticsDashboard from "../pages/AnalyticsDashboard";



describe("Analytics Dashboard",()=>{


beforeEach(()=>{

vi.clearAllMocks();

});



const mockAnalytics = {


totalRevenue:80000,


totalTenants:32,


occupancyRate:95,


paymentStatus:{
 paid:20,
 pending:5,
 overdue:2,
},


revenueTrend:[
 {
  month:"January",
  amount:50000,
 }
],


};



it("should retrieve analytics successfully",async()=>{


// Arrange

getAnalytics.mockResolvedValue(
 mockAnalytics
);


// Act

render(
 <AnalyticsDashboard />
);


// Assert

await waitFor(()=>{


expect(
 getAnalytics
)
.toHaveBeenCalledTimes(1);


});


});



it("should display analytics information correctly",async()=>{


// Arrange

getAnalytics.mockResolvedValue(
 mockAnalytics
);


// Act

render(
 <AnalyticsDashboard />
);


// Assert

await waitFor(()=>{


expect(
 screen.getByText(
  "Analytics Dashboard"
 )
)
.toBeInTheDocument();



expect(
 screen.getByText(
  "₱80000"
 )
)
.toBeInTheDocument();



expect(
 screen.getByText(
  "95%"
 )
)
.toBeInTheDocument();



});


});



it("should display error message when analytics retrieval fails",async()=>{


// Arrange

getAnalytics.mockRejectedValue(
 new Error(
  "Database Error"
 )
);


// Act

render(
 <AnalyticsDashboard />
);


// Assert

await waitFor(()=>{


expect(
 screen.getByText(
  "Something went wrong."
 )
)
.toBeInTheDocument();


});


});



it("should display empty state when analytics data is unavailable",async()=>{


// Arrange

getAnalytics.mockResolvedValue(
 null
);


// Act

render(
 <AnalyticsDashboard />
);


// Assert

await waitFor(()=>{


expect(
 screen.getByText(
  "No records found."
 )
)
.toBeInTheDocument();


});


});



});
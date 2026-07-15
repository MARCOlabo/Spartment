import {
  describe,
  expect,
  it,
} from "vitest";


import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";


import {
  http,
  HttpResponse,
} from "msw";


import {
  server,
} from "../mocks/server.js";


import BillingDashboard
from "../pages/BillingDashboard.jsx";



describe(
  "Billing Dashboard",
  () => {


    it(
      "should display current billing information",
      async () => {

        render(
          <BillingDashboard />
        );


        await waitFor(() => {

          expect(
            screen.getByText(
              "May 2026"
            )
          )
          .toBeInTheDocument();


          expect(
            screen.getByText(
              "₱1070"
            )
          )
          .toBeInTheDocument();


          expect(
            screen.getByTestId(
              "current-bill-status"
            )
          )
          .toHaveTextContent(
            "Pending"
          );


        });


      }
    );



    it(
      "should display billing history",
      async () => {

        render(
          <BillingDashboard />
        );


        await waitFor(() => {

          expect(
            screen.getByText(
              "April 2026"
            )
          )
          .toBeInTheDocument();


          expect(
            screen.getByText(
              "₱950"
            )
          )
          .toBeInTheDocument();


          expect(
            screen.getByText(
              "March 2026"
            )
          )
          .toBeInTheDocument();


          expect(
            screen.getByText(
              "₱900"
            )
          )
          .toBeInTheDocument();


        });


      }
    );



    it(
      "should display payment status",
      async () => {

        render(
          <BillingDashboard />
        );


        await waitFor(() => {


          expect(
            screen.getByTestId(
              "payment-status"
            )
          )
          .toHaveTextContent(
            "Pending"
          );


          expect(
            screen.getByText(
              "Balance: ₱1070"
            )
          )
          .toBeInTheDocument();


        });


      }
    );



    it(
      "should display error message when billing API fails",
      async () => {


        server.use(

          http.get(
            "http://localhost:5000/billing",
            () => {

              return HttpResponse.error();

            }
          )

        );


        render(
          <BillingDashboard />
        );


        await waitFor(() => {


          expect(
            screen.getByText(
              "Failed to retrieve billing information."
            )
          )
          .toBeInTheDocument();


        });


      }
    );


  }
);
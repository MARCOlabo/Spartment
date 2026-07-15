import {
  useEffect,
  useState,
} from "react";

import {
  getBillingData,
} from "../api/billingApi";


export default function BillingDashboard() {

  const [
    billing,
    setBilling,
  ] = useState(null);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    async function loadBilling() {

      try {

        const data =
          await getBillingData();

        setBilling(data);

      } catch(error) {

        setError(
          error.message
        );

      }

    }


    loadBilling();

  }, []);



  if(error) {

    return (
      <p>
        {error}
      </p>
    );

  }



  if(!billing) {

    return (
      <p>
        Loading...
      </p>
    );

  }



  return (

    <div>

      <h1>
        Billing Dashboard
      </h1>


      <section>

        <h2>
          Current Bill
        </h2>


        <p>
          {billing.currentBill.billingMonth}
        </p>


        <p>
          ₱{billing.currentBill.amount}
        </p>


        <p data-testid="current-bill-status">
          {billing.currentBill.status}
        </p>


      </section>



      <section>

        <h2>
          Billing History
        </h2>


        {
          billing.billingHistory.map(
            (item) => (

              <div
                key={item.month}
              >

                <p>
                  {item.month}
                </p>


                <p>
                  ₱{item.amount}
                </p>


                <p>
                  {item.status}
                </p>


              </div>

            )
          )
        }


      </section>



      <section>

        <h2>
          Payment Status
        </h2>


        <p data-testid="payment-status">
          {billing.paymentStatus.status}
        </p>


        <p>
          Balance:
          {" "}
          ₱{billing.paymentStatus.balance}
        </p>


      </section>


    </div>

  );

}
import {
  useEffect,
  useState,
} from "react";


import {
  getAnalytics,
} from "../api/analyticsApi";


import AnalyticsSummaryCard from "../components/AnalyticsSummaryCard";

import OccupancyCard from "../components/OccupancyCard";

import PaymentStatusCard from "../components/PaymentStatusCard";

import RevenueTrendCard from "../components/RevenueTrendCard";

import TenantAnalyticsCard from "../components/TenantAnalyticsCard";


import Loading from "../components/Loading";

import ErrorMessage from "../components/ErrorMessage";

import EmptyState from "../components/EmptyState";



export default function AnalyticsDashboard() {


const [
  analytics,
  setAnalytics,
] = useState(null);



const [
  loading,
  setLoading,
] = useState(true);



const [
  error,
  setError,
] = useState("");



useEffect(()=>{


async function loadAnalytics(){

try {


const data =
 await getAnalytics();


setAnalytics(data);



}catch(error){


setError(
 error.message
);



}finally{


setLoading(false);


}


}


loadAnalytics();


},[]);



if(loading){

return <Loading />;

}



if(error){

return <ErrorMessage />;

}



if(!analytics){

return <EmptyState />;

}



return (

<div>


<h1>
 Analytics Dashboard
</h1>



<AnalyticsSummaryCard

title="Total Revenue"

value={
 `₱${analytics.totalRevenue}`
}

subtitle="Overall Revenue"

/>



<TenantAnalyticsCard

totalTenants={
 analytics.totalTenants
}

/>



<OccupancyCard

occupancyRate={
 analytics.occupancyRate
}

/>



<PaymentStatusCard

paymentStatus={
 analytics.paymentStatus
}

/>



<RevenueTrendCard

revenueTrend={
 analytics.revenueTrend
}

/>



</div>

);


}
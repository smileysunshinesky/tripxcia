
import {
  HomeIcon,
} from "@heroicons/react/24/solid";
import { BadgePercent, CarTaxiFront, CheckCircle, Hotel, Plane, Quote, ReceiptText, Settings, Settings2, ShoppingBag, Store, User, UserCog2, UserIcon, UserPlus, UserPlus2, UserRoundCog, Users, Wallet } from "lucide-react";

import { lazy } from "react";
const Home = lazy(() => import("@/pages/dashboard/home"));
const AddClient = lazy(() => import("./pages/dashboard/Clients/AddClient"));
const ClientList = lazy(() => import("./pages/dashboard/Clients/ClientList"));
const AddVendor = lazy(() => import("./pages/dashboard/Vendors/AddVendor"));
const VendorList = lazy(() => import("./pages/dashboard/Vendors/VendorList"));
const GenarateQuery = lazy(() => import("./pages/dashboard/Query/GenarateQuery"));
const QueryList = lazy(() => import("./pages/dashboard/Query/QueryList"));
const GenarateQueryConfirm = lazy(() => import("./pages/dashboard/Query/GenarateAfterConfirm"));
const FlightQuota = lazy(() => import("./pages/dashboard/Quota/FlightQuota"));
const CabQuota = lazy(() => import("./pages/dashboard/Quota/CabQuota"));
const HotelQuota = lazy(() => import("./pages/dashboard/Quota/HotelQuota"));
const ConfirmedBooking = lazy(() => import("./pages/dashboard/ConfirmedBooking"));
const Payments = lazy(() => import("./pages/dashboard/Payment"));
const Billings = lazy(() => import("./pages/dashboard/Billings"));
const Role = lazy(() => import("./pages/dashboard/Role"));
const Sales = lazy(() => import("./pages/dashboard/Sales"));

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
  
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <User {...icon} />,
        name: "Clients",
        hasDropdown:true,
        dropdown:[
          {
            icon: <UserPlus2 {...icon} />,
            name: "Add Client",
            path: "/add-client",
            element: <AddClient />,
          },
          {
            icon: <Users {...icon} />,
            name: "clients",
            path: "/clients",
            element: <ClientList />,
          },
        ]

      },
      {
        icon: <Store {...icon} />,
        name: "Vendors",
        hasDropdown:true,
        dropdown:[
           
      {
        icon: <Store {...icon} />,
        name: "add-vendor",
        path: "/add-vendor",
        element: <AddVendor />,
      },
      {
        icon: <ShoppingBag {...icon} />,
        name: "vendors",
        path: "/vendors",
        element: <VendorList />,
      },
      
        ]


      },
     
      {
        icon: <Settings {...icon} />,
        name: "Manage Query",
        hasDropdown:true,
        dropdown:[
          {
            icon: <Settings {...icon} />,
            name: "genarate-query",
            path: "/genarate-query",
            element: <GenarateQuery />,
          },
          {
            icon: <Settings2 {...icon} />,
            name: "query-list",
            path: "/query-list",
            element: <QueryList />,
          },
        ]
      },
      
      {
        icon: <Quote {...icon} />,
        name: "Manage Quotation",
        hasDropdown:true,
        dropdown:[
          {
            icon: <Plane {...icon} />,
            name: "quota-flight",
            path: "/quota-flight",
            element: <FlightQuota />,
          },
          {
            icon: <CarTaxiFront {...icon} />,
            name: "quota-cab",
            path: "/quota-cab",
            element: <CabQuota />,
          },
         
          {
            icon: <Hotel {...icon} />,
            name: "quota-hotel",
            path: "/quota-hotel",
            element: <HotelQuota />,
          },
        ]

      },
      {
        icon: <Quote {...icon} />,
        name: "query-confirm",
        path: "/query-confirm/:id",
        element: <GenarateQueryConfirm />,
        hidden:true
      },
 
      {
        icon: <CheckCircle {...icon} />,
        name: "confirmed booking",
        path: "/confirmed-booking",
        element: <ConfirmedBooking />,
      },
      {
        icon: <Wallet {...icon} />,
        name: "payments",
        path: "/payments",
        element: <Payments />,
      },
      {
        icon: <ReceiptText {...icon} />,
        name: "billings",
        path: "/billings",
        element: <Billings />,
      },
      {
        icon: <UserRoundCog {...icon} />,
        name: "roles",
        path: "/roles",
        element: <Role />,
      },
      {
        icon: <BadgePercent {...icon} />,
        name: "sales",
        path: "/sales",
        element: <Sales />,
      },
     
     
     
    ],
    
  }
  ,

];

export default routes;

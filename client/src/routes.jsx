import {
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { BadgePercent, CarTaxiFront, CheckCircle, Hotel, Plane, Quote, ReceiptText, Settings, Settings2, ShoppingBag, Store, User, UserCog2, UserIcon, UserPlus, UserPlus2, UserRoundCog, Users, Wallet } from "lucide-react";
import AddClient from "./pages/dashboard/Clients/AddClient";
import ClientList from "./pages/dashboard/Clients/ClientList";
import AddVendor from "./pages/dashboard/Vendors/AddVendor";
import VendorList from "./pages/dashboard/Vendors/VendorList";
import GenarateQuery from "./pages/dashboard/Query/GenarateQuery";
import QueryList from "./pages/dashboard/Query/QueryList";
import FlightQuota from "./pages/dashboard/Quota/FlightQuota";
import CabQuota from "./pages/dashboard/Quota/CabQuota";
import HotelQuota from "./pages/dashboard/Quota/HotelQuota";
import ConfirmedBooking from "./pages/dashboard/ConfirmedBooking";
import Payments from "./pages/dashboard/Payment";
import Billings from "./pages/dashboard/Billings";
import Role from "./pages/dashboard/Role";
import Sales from "./pages/dashboard/Sales";
import path from "path";
import GenarateQueryConfirm from "./pages/dashboard/Query/GenarateAfterConfirm";

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

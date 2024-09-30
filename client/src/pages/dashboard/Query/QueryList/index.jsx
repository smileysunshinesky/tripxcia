import React, { useEffect, useState } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useGlobalData } from '@/hooks/GlobalData';
import { Select, Stack } from '@chakra-ui/react';
import { Edit, Eye, Receipt, Ticket } from 'lucide-react';
import EditQuery from '@/components/EditQuery';
import Swal from 'sweetalert2';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import toast from 'react-hot-toast';
import makeRequest from '@/data/api';
import { getAllqueries } from '@/data/apis';
import { useDispatch } from "react-redux";
import { LogoutUser } from "@/redux/actions/authActions";
import { setCurrentQuery } from '@/redux/actions/queryActions';

export default function QueryList() {
  const [selectedRow, setSelectedRow] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queries, setqueries] = useState([]);

  const token = localStorage.getItem('token');

  const fetchAllQueries = async () => {
    try {
      await makeRequest({
        url: getAllqueries,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }

      })
        .then((response) => {
          setqueries(response.result)
        }
        )
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            toast.error('Token expired');
          } else {
            return navigate('/auth/signIn')
          }
        })


    } catch (error) {
      toast.error('Error fetching flight query')
      return navigate('/auth/signIn')

    }

  }

  useEffect(() => {
    if (token) {
      fetchAllQueries()
    } else {
      try {
        localStorage.setItem('redirectCount', 0);
        dispatch(LogoutUser());
      } catch (error) {
          console.error("Error during logout: ", error);
      }
    }
  }, [token]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {isOpen ? (
        <EditQuery 
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
          }}
        />
      ) : (
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Query List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["SL", "ID", "Client Name", "Staff", "Service", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {queries.length > 0 ? <tbody>
              {queries
                // .filter(a => a.stepFirst === 1)
                .map((row, index) => {
                  const className = `py-3 px-5 ${index === queries.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;
                  const type = row.serviceType;

                  return (
                    <tr key={index} >
                      <td className={className}>
                        <div className="flex items-center gap-4">


                          {index + 1}
                        </div>

                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">


                          {row._id}
                        </div>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {row.client}
                        </Typography>

                      </td>
                      <td className={className}>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {row.serviceType}
                        </Typography>
                      </td>


                      <td className={className}>
                        <Edit className='cursor-pointer hover:scale-105 transition-all' onClick={() => {
                          setSelectedRow({
                            client: row.client,
                            service: row.serviceType,
                            passengerNumber: row.PassengerNumber,
                            status: row.status,
                            FlightNumber: row.flightNumber,
                            airlineNames: row.airlineName,
                            staff: row.staff,
                            id: row._id,
                            departureFrom: row.departureFrom,
                            departureDate: row.DepartureDate,
                            returnDate: row.returnDate,
                            bookingDate: row.bookingDate,
                            arrivalTime: row.arrivalTime,
                            departureTime: row.departureTime,
                            ourCost: row.ourCost,
                            prf: row.prf,
                            stepFirst: row.stepFirst,
                            arrivalTo: row.arrivalTo,
                            refundable: row.refundable,
                            fareType: row.fareType,
                            flightType: row.flightType,
                            duplicate: row.duplicate,
                            returnFlight: row.returnFlight ?? {},
                            _id: row._id,
                            oneWayOrRoundway: row.OneWayOrRoundTrip,
                            via: row.via,
                            hotelName: row.hotelName,
                            address: row.address,
                            contact: row.contact,
                            email: row.email,
                            domesticOrInternational: row.DomesticOrInternational,
                            checkInDate: row.checkInDate,
                            checkOutDate: row.checkOutDate,
                            noOfNights: row.noOfNights,
                            mealPlan: row.mealPlan,
                            hotelCategory: row.hotelCategory,
                            roomOcuppency: row.roomOcuppency,
                            noOfRooms: row.noOfRooms,
                            noOfGuests: row.noOfGuests,
                            noOfAdults: row.noOfAdults,
                            noOfChildren6: row.noOfChildren6,
                            noOfChildren12: row.noOfChildren12,
                            cabBookingType:row.cabBookingType,
                            tripStartDateTime:row.tripStartDateTime,
                            tripEndDateTime:row.tripEndDateTime,
                            cabType:row.cabType,
                            totalPassenger:row.totalPassenger,
                            city:row.city,
                            cabExtraPerHours:row.cabExtraPerHours,
                            cabExtraKMS:row.cabExtraKMS,
                            cabParkingetc:row.cabParkingetc,
                            cabPerKmsrate:row.cabPerKmsrate,
                            cabTollPermit:row.cabTollPermit,
                          });
                          setIsOpen(true);
                          dispatch(setCurrentQuery({
                            client: row.client,
                            service: row.serviceType,
                            passengerNumber: row.PassengerNumber,
                            status: row.status,
                            FlightNumber: row.flightNumber,
                            airlineNames: row.airlineName,
                            staff: row.staff,
                            id: row._id,
                            departureFrom: row.departureFrom,
                            departureDate: row.DepartureDate,
                            returnDate: row.returnDate,
                            bookingDate: row.bookingDate,
                            arrivalTime: row.arrivalTime,
                            departureTime: row.departureTime,
                            ourCost: row.ourCost,
                            prf: row.prf,
                            stepFirst: row.stepFirst,
                            arrivalTo: row.arrivalTo,
                            refundable: row.refundable,
                            fareType: row.fareType,
                            flightType: row.flightType,
                            duplicate: row.duplicate,
                            returnFlight: row.returnFlight ?? {},
                            _id: row._id,
                            oneWayOrRoundway: row.OneWayOrRoundTrip,
                            via: row.via,
                            hotelName: row.hotelName,
                            address: row.address,
                            contact: row.contact,
                            email: row.email,
                            domesticOrInternational: row.DomesticOrInternational,
                            checkInDate: row.checkInDate,
                            checkOutDate: row.checkOutDate,
                            noOfNights: row.noOfNights,
                            mealPlan: row.mealPlan,
                            hotelCategory: row.hotelCategory,
                            roomOcuppency: row.roomOcuppency,
                            noOfRooms: row.noOfRooms,
                            noOfGuests: row.noOfGuests,
                            noOfAdults: row.noOfAdults,
                            noOfChildren6: row.noOfChildren6,
                            noOfChildren12: row.noOfChildren12,
                            cabBookingType:row.cabBookingType,
                            tripStartDateTime:row.tripStartDateTime,
                            tripEndDateTime:row.tripEndDateTime,
                            cabType:row.cabType,
                            totalPassenger:row.totalPassenger,
                            city:row.city,
                            cabExtraPerHours:row.cabExtraPerHours,
                            cabExtraKMS:row.cabExtraKMS,
                            cabParkingetc:row.cabParkingetc,
                            cabPerKmsrate:row.cabPerKmsrate,
                            cabTollPermit:row.cabTollPermit,
                          }));
                        }} />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody> : <tbody>
              <tr>
                <td colSpan="8">
                  <Typography color="blue-gray" className="text-center">
                    No data found
                  </Typography>
                </td>
              </tr>
            </tbody>}

          </table>
        </CardBody>
      </Card>
      )
      }

    </div>
  )
}

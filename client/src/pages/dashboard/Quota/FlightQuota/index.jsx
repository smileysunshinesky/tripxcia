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
import { Eye, Receipt, Ticket } from 'lucide-react';
import TableFlightQuery from '@/components/TableFlightQuery';
import Swal from 'sweetalert2';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import makeRequest from '@/data/api';
import { GetFlightQueries } from '@/data/apis';
import toast from 'react-hot-toast';
import { LogoutUser } from "@/redux/actions/authActions";

export default function FlightQuota() {
  const [FlightQuery, setFlightQuery] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const fetchFlightQuery = async () => {
    try {
      await makeRequest({
        url: GetFlightQueries,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }

      })
        .then((response) => {
          setFlightQuery(response.result)
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
    }

  };
  useEffect(() => {
    if (token) {
      fetchFlightQuery()
    } else {
      try {
        localStorage.setItem('redirectCount', 0);
        dispatch(LogoutUser());
      } catch (error) {
          console.error("Error during logout: ", error);
      }
    }
  }, [token]);

  // const [data,setdata]=useState(FlightQuery);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <TableFlightQuery viewbtn={"yes"} isOpen={isOpen} data={selectedRow} returnData={selectedRow?.returnFlight ? selectedRow?.returnFlight : ''} isT={true} duplicate={selectedRow?.duplicate ?? null} onClose={() => {
        setIsOpen(false)
      }} handleSave={() => { }} />
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Flight Query List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["SL", "ID", "Client Name", "Staff", "Service", "Status", "Flight Number", "Airline Name", "Action"].map((el) => (
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
            {FlightQuery.length > 0 ? <tbody>
              {FlightQuery
                .filter(a => a.flightType !== '' && a?.stepFirst !== 1)
                .map((row, index) => {
                  const className = `py-3 px-5 ${index === FlightQuery.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={index}>
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
                        <Select onChange={(e) => {
                          if (e.target.value === '1') {
                            Swal.fire({
                              title: 'Are you sure?',
                              text: "You want to confirm this flight",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonText: 'Yes, confirm it!',
                              cancelButtonText: 'No, keep it',
                              confirmButtonColor: '#4caf50',
                              cancelButtonColor: '#f44336'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                navigate(`/dashboard/query-confirm/${row._id}`)
                              } else if (result.dismiss === Swal.DismissReason.cancel) {
                                return
                              }
                            })

                          }
                          else {
                            return
                          }
                        }} value={row.status} disabled={row.status === 1}>
                          <option value="0">Pending</option>
                          <option value="1">Confirmed</option>
                        </Select>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {row.flightNumber}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {row.airlineName}
                        </Typography>
                      </td>
                      <td className={className}>
                        {row.status === 1 ?
                          (
                            <Stack direction="row" spacing={4}>
                              <Ticket onClick={() => {
                                navigate(`/ticket/${row._id}`)
                              }} style={{ cursor: 'pointer' }} />

                              <Receipt style={{ cursor: 'pointer' }} onClick={() => {
                                navigate(`/invoice/${row._id}`)
                              }} />

                            </Stack>
                          )
                          :
                          (
                            <Eye style={{ cursor: 'pointer' }} onClick={() => {
                              console.log("returnFlight",row.returnFlight);
                              setSelectedRow({
                                client: row.client,
                                serviceType: row.serviceType,
                                status: row.status,
                                FlightNumber: row.flightNumber,
                                airlineNames: row.airlineName,
                                staff: row.staff,
                                id: row._id,
                                departureFrom: row.departureFrom,
                                ourCost: row.ourCost,
                                prf: row.prf,
                                arrivalTo: row.arrivalTo,
                                refundable: row.refundable,
                                fareType: row.fareType,
                                flightType: row.flightType,
                                duplicate: row.duplicate,
                                returnFlight: row.returnFlight ?? {},
                                _id: row._id,
                                OneWayOrRoundTrip: row.OneWayOrRoundTrip,
                                via: row.via,
                              });
                              setIsOpen(true);

                            }} />
                          )
                        }
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

    </div>
  )
}

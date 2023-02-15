import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { Fragment, useState, useRef } from "react";
import axios from "axios";
import "flowbite";
import { useRouter } from "next/router";
import { AuthContext, isTokenValid } from "../components/request";
import { PuffLoader } from "react-spinners";
import Select from "react-select";
import { DateTime } from "luxon";

// MUI Table Component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function Home() {
  const dt = DateTime.local().setZone("UTC+6");

  const router = useRouter();
  const { token, setToken } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [allType, setAllType] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [tableData, setTableData] = useState(null);
  const [from, setFrom] = useState(dt.minus({ hours: 1 }));
  const [to, setTo] = useState(dt);

  // Table Functions
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Table Column
  const columns = [
    {
      id: "createdAt",
      label: "Date",
      minWidth: 100,
      align: "center",
      format: (value) => value.split("T")[0],
    },
    {
      id: "createdAt",
      label: "Time",
      minWidth: 100,
      align: "center",
      format: (value) =>
        new Date(value).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
    },
    {
      id: "title",
      label: "Title",
      minWidth: 100,
      align: "center",
      format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      id: "value",
      label: "Value",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(2),
    },
  ];

  const fetchDeviceData = () => {
    axios
      .post(
        `api/data/machine/${selectedMachineId}/filter`,
        { from, to, type: "table" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDeviceData(res.data);
        setAllType([...new Set(res.data.map((x) => x.title))]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchDeviceList = () => {
    axios
      .get("api/assign/own", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDeviceList(res.data);
        setSelectedMachineId(res.data[0].fkMachineId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setFormToDate = (e) => {
    const filterVal = e.target.value;
    const now = DateTime.local();

    if (filterVal === "1hour") {
      setFrom(now.minus({ hours: 1 }));
      setTo(now);
    } else if (filterVal === "6hour") {
      setFrom(now.minus({ hours: 6 }));
      setTo(now);
    } else if (filterVal === "today") {
      const today = now.startOf("day");
      setFrom(today);
      setTo(now);
    } else if (filterVal === "yesterday") {
      const yesterday = now.minus({ days: 1 }).startOf("day");
      setFrom(yesterday);
      setTo(now.startOf("day"));
    } else if (filterVal === "7day") {
      const lastWeek = now.minus({ days: 7 }).startOf("day");
      setFrom(lastWeek);
      setTo(now);
    } else {
      const lastMonth = now.minus({ days: 30 }).startOf("day");
      setFrom(lastMonth);
      setTo(now);
    }
  };

  useEffect(() => {
    if (deviceData) {
      selectedType.length !== 0
        ? setTableData(
            deviceData
              .filter((item) => selectedType.includes(item.title))
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          )
        : setTableData(deviceData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    } else setTableData(null);
  }, [selectedType, deviceData]);

  useEffect(() => {
    if (selectedMachineId) fetchDeviceData();
  }, [selectedMachineId, from, to]);

  // Redirect If Not Authenticated
  useEffect(() => {
    if (!isTokenValid(token)) {
      router.push("login");
    } else {
      fetchDeviceList();
      setCheckingAuth(false);
    }
  }, []);

  // This is for view a loading screen while it searching for Token
  if (checkingAuth) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <PuffLoader color="#36d7b7" />
      </div>
    );
  }

  function handleSelectChange(selectedOptions) {
    setSelectedType(selectedOptions.map((x) => x.value));
    // setTableData(
    //   deviceData.filter((item) => selectedOptions.map((x) => x.value).includes(item.title))
    // );
  }

  return (
    <>
      <Head>
        <title>LogByte - Table</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto max-w-6xl flex items-center">
          <div className="w-full grid grid-cols-12 gap-4 lg:gap-6 px-3 py-6">
            <div className="col-span-12 sm:col-span-4">
              <Sidebar />
            </div>
            <div className="col-span-12 sm:col-span-8">
              <div className="flex flex-col shadow border border-slate-300 rounded-xl p-6">
                <form className="mx-auto mb-6 w-full">
                  {/* Select Device */}
                  <select
                    id="machine"
                    onChange={(e) => setSelectedMachineId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {deviceList.map((item, index) => {
                      return (
                        <option key={index} value={item.fkMachineId}>
                          {item.machineMac}
                        </option>
                      );
                    })}
                  </select>

                  {/* Filter on Different Time Duration */}
                  <select
                    id="filter"
                    onChange={(e) => setFormToDate(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue={"1hour"}>Last 1 Hour</option>
                    <option value="6hour">Last 6 Hour</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="7day">Last 7 Day</option>
                    <option value="30day">Last 30 Day</option>
                  </select>

                  {/* From To Date Selection Section */}
                  <div className="flex justify-center">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 mr-4 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="datetime-local"
                      value={from.toISO().slice(0, -13)}
                      onChange={(e) => setFrom(DateTime.fromISO(e.target.value))}
                      name="from"
                      id="from"
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="datetime-local"
                      value={to.toISO().slice(0, -13)}
                      onChange={(e) => setTo(DateTime.fromISO(e.target.value))}
                      name="to"
                      id="to"
                    />
                  </div>

                  {/* Multiple Data Selection */}
                  <Select
                    options={allType?.map((option) => ({
                      value: option,
                      label: option.charAt(0).toUpperCase() + option.slice(1),
                    }))}
                    isMulti
                    onChange={handleSelectChange}
                  />
                </form>

                {/* Data Table With Pagination Sorting */}
                <div className="border">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column, index) => (
                            <TableCell
                              key={index}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData
                          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column, index) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={index} align={column.align}>
                                      {column.format ? column.format(value) : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={tableData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

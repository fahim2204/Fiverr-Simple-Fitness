import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { Fragment, useState, useRef } from "react";
import { Line, Bar, Pie, Bubble } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Select } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext, isTokenValid } from "../components/request";
import { PuffLoader } from "react-spinners";
import { DateTime } from "luxon";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {
  const dt = DateTime.local().setZone("UTC+6");

  const router = useRouter();
  const { token, setToken } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [graphLabels, setGraphLabels] = useState([]);
  const [from, setFrom] = useState(dt.minus({ hours: 1 }));
  const [to, setTo] = useState(dt);

  const fetchDeviceData = () => {
    axios
      .post(
        `api/data/machine/${selectedMachineId}/filter`,
        { from, to },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setGraphLabels(Object.keys(res.data));
        // console.log("MachineData>>",res.data);
        // console.log("AllSensor", Object.keys(res.data));
        setDeviceData(res.data);
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
        // console.log(res.data);
        setDeviceList(res.data);
        setSelectedMachineId(res.data[0].fkMachineId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedMachineId) fetchDeviceData();
  }, [selectedMachineId, from, to]);

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

  const optionsLine = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "Line Chart",
    },
    time:{
      // useUTC: false,
      // timezone: 'Asia/Calcutta',
      // timezoneOffset: -5 * 60
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "",
      },
      offset: 15,
    },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat:
          "<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>",
      },
    },

    series: graphLabels.map((item) => {
      return {
        name: item.charAt(0).toUpperCase() + item.slice(1),
        data: deviceData[item],
      };
    }),
  };
  const optionsArea = {
    chart: {
      zoomType: "x",
      type: "area",
    },
    title: {
      text: "Area Chart",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        minute: "%l :%P",
        hour: "%l %P",
        day: "%e. %b",
        week: "%e. %b",
        month: "%b '%y",
        year: "%Y",
      },
    },
    yAxis: {
      title: {
        text: "Number of Fruits",
      },
      offset: 15,
    },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat:
          "<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>",
      },
    },

    series: graphLabels.map((item) => {
      return {
        name: item.charAt(0).toUpperCase() + item.slice(1),
        data: deviceData[item],
      };
    }),
  };

  return (
    <>
      <Head>
        <title>LogByte - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto max-w-6xl flex items-center">
          <div className="w-full grid grid-cols-12 gap-4 lg:gap-6 px-3 py-6">
            <div className="col-span-12 sm:col-span-4 md:col-span-3">
              <Sidebar />
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-9">
              <div className="flex flex-col shadow border border-slate-300 rounded-xl p-3 md:p-6 ">
                <div className="mx-auto mb-6 w-full">
                  {/* Select Device */}
                  <div className="block sm:flex justify-center gap-4 md:w-3/4 mx-auto">
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
                      defaultValue={"1hour"}
                      onChange={(e) => setFormToDate(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="1hour">Last 1 Hour</option>
                      <option value="6hour">Last 6 Hour</option>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="7day">Last 7 Day</option>
                      <option value="30day">Last 30 Day</option>
                    </select>
                  </div>

                  {/* From To Date Selection Section */}
                  <div className="block sm:flex justify-center gap-4 md:w-3/4 mx-auto">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="datetime-local"
                      value={from.toISO().slice(0, -13)}
                      onChange={(e) =>
                        setFrom(DateTime.fromISO(e.target.value))
                      }
                      name="from"
                      id="from"
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="datetime-local"
                      value={to.toISO().slice(0, -13)}
                      onChange={(e) => setTo(DateTime.fromISO(e.target.value))}
                      name="to"
                      id="to"
                    />
                  </div>
                </div>

                {!Array.isArray(deviceData) ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="border rounded-sm shadow-lg py-2">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsLine}
                      />
                    </div>
                    <div className="border rounded-sm shadow-lg py-2">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsArea}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-center font-semibold text-slate-600">
                      Sorry! There is no data available.
                    </p>
                    <p className="text-center text-xs font-semibold text-slate-600">
                      -- Please Change Inputs --
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

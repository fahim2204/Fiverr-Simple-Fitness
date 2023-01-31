import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { Fragment, useState, useRef } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Select } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext, isTokenValid } from "../components/request";
import { PuffLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();
  const { token, setToken } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [from, setFrom] = useState(new Date(Date.now() - 864e5 * 3))
  const [to, setTo] = useState(new Date())

  const fetchDeviceData = () => {
    axios
      .post(`api/data/machine/${selectedMachineId}/filter`, { from, to }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Object.keys(res.data)>> ', res.data.temp.label);

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
    if (!isTokenValid(token)) {
      router.push("login");
    } else {
      fetchDeviceList();
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    if (selectedMachineId) fetchDeviceData();
  }, [selectedMachineId]);

  // This is for view a loading screen while it searching for Token
  if (checkingAuth) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <PuffLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>LogByte - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="sm:max-w-6xl mx-auto mt-8 px-6">
          <div className="grid grid-cols-12 gap-12 mb-5">
            <div className="col-span-5 sm:col-span-4 md:col-span-3">
              <Sidebar />
            </div>
            <div className="col-span-7 sm:col-span-8 md:col-span-9">
              <div className="flex flex-col shadow rounded-xl p-6">
                <div className="mx-auto mb-6">
                  {/* Select Device */}
                  <select
                    id="machine"
                    onChange={(e) => setSelectedMachineId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {deviceList.map((item, index) => {
                      return (
                        <option key={index} value={item.fkMachineId}>
                          {item.machineMac}
                        </option>
                      );
                    })}
                  </select>

                  <input type="datetime-local" name="from" id="from" />
                  <input type="datetime-local" name="to" id="to" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Line
                      height={80}
                      width={"100%"}
                      data={{
                        labels: [new Date(from),
                          new Date(from).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
                          new Date(from+864e5 * 3).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
                          new Date(from).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
                        ],
                        datasets: Object.entries(deviceData).map(([label, { val }]) => ({ label: label.charAt(0).toUpperCase() + label.slice(1), data: val })),
                      }}
                    />
                  </div>
                  <div>
                    <Bar
                      height={80}
                      width={"100%"}
                      data={{
                        labels: deviceData?.resistance?.label.map((item) => `${new Date(item).getHours()}:${new Date(item).getMinutes()}`),
                        datasets: Object.entries(deviceData).map(([label, { val }]) => ({ label: label.charAt(0).toUpperCase() + label.slice(1), data: val })),
                      }}
                    />
                  </div>
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

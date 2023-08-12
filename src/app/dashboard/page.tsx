"use client";
import "./dashboard.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pie from '../components/charts/Pie';
import Loader from '../components/common/loader';
import { getAggregatedActivities, getFilteredData } from "../database";
import Bar from "../components/charts/Bar";
import { KeyValuePair } from "../utils/charts";
import DateFilterValues from "../utils/DateFilterValues";
import Activity from "../models/Activity";
import moment from "moment";
import { ColorUtil } from "../utils/colors";

export default function Dashboard() {
    const router = useRouter();

    const [currentWeekStats, setCurrentWeekStats] = useState<KeyValuePair[]|undefined>(undefined);
    const [lastWeekStats, setLastWeekStats] = useState<KeyValuePair[]|undefined>(undefined);
    const [leaderBoardStats, setLeaderBoardStats] = useState<KeyValuePair[]|undefined>(undefined);
    const [tableData, setTableData] = useState<Activity[]|undefined>(undefined);

    useEffect( () => {
        prepareStats(); 
    }, []);

    async function prepareStats(){
        let lastWeekDateRange = DateFilterValues.LastWeek;
        let lastWeek = await getAggregatedActivities([{column: "timestamp", condition: ">=", value: lastWeekDateRange.Start}, {column: "timestamp", condition: "<=", value: lastWeekDateRange.End}]);
        setLastWeekStats(lastWeek);
        let currentWeekDateRange = DateFilterValues.ThisWeek;
        let currentWeek = await getAggregatedActivities([{column: "timestamp", condition: ">=", value: currentWeekDateRange.Start}, {column: "timestamp", condition: "<=", value: currentWeekDateRange.End}]);
        setCurrentWeekStats(currentWeek);
        let lastMonthDateRange = DateFilterValues.LastMonth;
        let lastMonth = await getAggregatedActivities([{column: "timestamp", condition: ">=", value: lastMonthDateRange.Start}, {column: "timestamp", condition: "<=", value: lastMonthDateRange.End}]);
        setLeaderBoardStats(lastMonth);
        await loadTableData();
    }

    async function loadTableData() {
        let data = await getFilteredData<Activity>("activities", [], [{name:"timestamp", order:"desc"}]);
        setTableData(data);
    }

    return (
        <div>
            <button onClick={() => router.push('/add-activity')}
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Add an activity</button>
            <div className="stats-cont">
                <div className="last-week-stat chart-card-style">
                    {lastWeekStats === undefined ? <Loader title="Loading Last Week Activities Trends"/> :
                        lastWeekStats.length > 0 ? <Pie data={lastWeekStats} label="Activities Count" title="Last Week Activities" legend={false}/> : <div>No activities</div>}
                </div>
                <div className="current-week-stat chart-card-style">
                    {currentWeekStats === undefined ? <Loader title="Loading Current Week Activities Trends"/> :
                        currentWeekStats.length > 0 ? <Pie data={currentWeekStats} label="Activities Count"  title="Current Week Activities" legend={false}/> : <div>No activities</div>}
                </div>
                <div className="last-month-leader-board-stat chart-card-style">
                    {leaderBoardStats === undefined ? <Loader title="Loading Last Month Leader Board Trends"/> :
                        leaderBoardStats.length > 0 ? <Bar data={leaderBoardStats} label="Activities Count"  title="Last Month Leader Board Trends" legend={false}/> : <div>No activities</div>}
                </div>
            </div>
            <div className="relative overflow-x-auto text-center shadow-md sm:rounded-lg mx-[10px]">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                    <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Activity Time</th>
                        </tr>
                    </thead>
                    {tableData !== undefined &&
                    <tbody>
                    {tableData.map(d => 
                        <tr className="text-blue-500 border-b border-blue-400" key={d.id}>
                            <th scope="row" className="px-6 py-4 font-medium" style={{color:ColorUtil.getColor(d.name)}}>
                                {d.name}
                            </th>
                            <td className="px-6 py-4">
                                <a href={d.link} target="_blank" className="font-medium text-blue-500 underline">{d.type}</a>
                            </td>
                            <td className="px-6 py-4">
                                {d.description}
                            </td>
                            <td className="px-6 py-4 font-smaller">
                                {moment(d.timestamp).format("DD MMM YYYY h:mm A")}
                            </td>
                        </tr>)}
                    </tbody>}
                </table>
                {tableData === undefined && <div className="table-loader-cont"><Loader title="Loading Activities Table"/></div>}
            </div>
        </div>
    )
}
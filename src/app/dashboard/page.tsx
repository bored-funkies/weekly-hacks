"use client";
import "./dashboard.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pie from '../components/charts/Pie';
import Loader from '../components/common/loader';
import { getAggregatedActivities } from "../database";
import Bar from "../components/charts/Bar";
import { KeyValuePair } from "../utils/charts";
import DateFilterValues from "../utils/DateFilterValues";

export default function Dashboard() {
    const router = useRouter();

    const [currentWeekStats, setCurrentWeekStats] = useState<KeyValuePair[]|undefined>([]);
    const [lastWeekStats, setLastWeekStats] = useState<KeyValuePair[]|undefined>([]);
    const [leaderBoardStats, setLeaderBoardStats] = useState<KeyValuePair[]|undefined>([]);

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
        </div>
    )
}
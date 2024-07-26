import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
    ResponsiveContainer,
    LineChart,
    PieChart,
    Cell,
    Pie
} from "recharts";
import { data } from "../DataList/DataList";

const PdtCharts = () => {
    const [tabularData, setTabularData] = useState("barChart");
    const COLORS = ["blue", "green"];
    const turnoverData = data.map((item) => item.turnover);
    const profitData = data.map((item) => item.profit);

    const TotalProfit = () => {
        let total = 0;
        for (let profits of profitData) total = total + profits;
        return total;
    };
    const TotalTurnover = () => {
        let total = 0;
        for (let turnovers of turnoverData) total = total + turnovers;
        return total;
    };
    const turnover = TotalTurnover();
    const profit = TotalProfit();

    const ComponyData = [
        { name: "Turnover", totalVal: turnover },
        { name: "Profit", totalVal: profit },
    ];
    const ChartFormate = [
        { value: "barChart", label: "BAR Chart" },
        { value: "lineChart", label: "Line Chart" },
        { value: "pieChart", label: "Pie Chart" },
    ]

    return (
        <div className="container">
            <div className='d-flex mt-4 justify-content-end'>
                <select onChange={(e) => setTabularData(e.target.value)}>
                    {ChartFormate.map((data, i) => {
                        return <option key={i} value={data.value}>{data.label}</option>
                    })}
                </select>
            </div>
            {tabularData === "barChart" &&
                <div className="mt-2">
                    <h4 className="text-center my-2 text-danger">Bar Chart Information</h4>
                    <h5 className="text-center mt-2">Company Performance (IN CR)</h5>
                    <ResponsiveContainer aspect={3} width="100%">
                        <BarChart width={500} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="profit" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="turnover" fill="blue" />
                            <Bar dataKey="profit" fill="green" />
                        </BarChart>
                    </ResponsiveContainer>
                    <h6 className="text-center">- Data Showing IN YEAR -</h6>
                </div>}
            {tabularData === "lineChart" &&
                <div className="mt-2">
                    <h4 className="text-center my-2 text-danger">Line Chart Information</h4>
                    <h5 className="text-center mt-2">Company Performance (IN CR)</h5>
                    <ResponsiveContainer aspect={3} width="100%">
                        <LineChart
                            layout="vertical"
                            width={500}
                            height={300}
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis dataKey="turnover" />
                            <XAxis dataKey="amt" />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="turnover" stroke="#8884d8" />
                            <Line dataKey="amt" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                    <h6 className="text-center">- Data Showing IN YEAR -</h6>
                </div>}

            {tabularData === "pieChart" && <div className="mt-2">
                <h4 className="text-center my-2 text-danger">PIE Chart Information</h4>
                <h5 className="text-center mt-2">Company Turnover and Profit (IN CR)</h5>
                <ResponsiveContainer aspect={3} width="100%">
                    <PieChart>
                        <Pie
                            data={ComponyData}
                            labelLine={false}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="totalVal"
                        >
                            {ComponyData.map((entry, i) => (
                                <Cell
                                    key={i}
                                    fill={COLORS[i % COLORS.length]}
                                    style={{ outline: "none" }}
                                />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <h6 className="text-center">- Data Showing IN YEAR -</h6>
            </div>}
        </div >)
}

export default PdtCharts;
import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer, LineChart } from "recharts";

const LineChartInfo = ({ studentsInfo }) => {
    return (
        <React.Fragment>
            <h4 className="text-center my-2 text-danger">Line Chart Information</h4>
            <ResponsiveContainer aspect={3} width="100%">
                <LineChart
                    layout="vertical"
                    width={500}
                    height={300}
                    data={studentsInfo}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Student_Name" />
                    <YAxis dataKey="Mathematics" />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="Mathematics" stroke="blue" />
                    <Line dataKey="Physics" stroke="green" />
                    <Line dataKey="Physics" stroke="gray" />
                    <Line dataKey="Physics" stroke="red" />
                    <Line dataKey="Physics" stroke="yellow" />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export default LineChartInfo
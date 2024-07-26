import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarChartInfo = ({ studentsInfo }) => {
    return (
        <React.Fragment>
            <h4 className="text-center my-2 text-danger">Bar Chart Information</h4>
            <ResponsiveContainer aspect={3} width="100%">
                <BarChart width={500} height={300} data={studentsInfo}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Student_Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Mathematics" fill="blue" />
                    <Bar dataKey="Physics" fill="green" />
                    <Bar dataKey="English" fill="gray" />
                    <Bar dataKey="Hindi" fill="red" />
                    <Bar dataKey="Computer" fill="yellow" />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>)
}
export default BarChartInfo;

import React from "react";
import { Tooltip, Legend, ResponsiveContainer, PieChart, Cell, Pie } from "recharts";

const PieChartInfo = ({ studentsInfo }) => {
    const COLORS = ["blue", "green", "gray", "red", "yellow"];
    const data = Array.isArray(studentsInfo) ? studentsInfo : [];
    return (
        <React.Fragment>
            <h4 className="text-center my-2 text-danger">PIE Chart Information</h4>
            <ResponsiveContainer aspect={3} width="100%">
                <PieChart>
                    <Pie
                        data={data}
                        labelLine={false}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="Total"
                    >
                        {data.map((entry, i) => (
                            <Cell
                                key={i}
                                fill={COLORS[i % COLORS.length]}
                                style={{ outline: "none" }}
                                name={entry.Student_Name}
                            />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export default PieChartInfo;
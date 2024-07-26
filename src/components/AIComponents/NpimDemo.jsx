import axios from "axios";
import React, { useState } from "react";

const NpimDemo = () => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");
    const [role, setRole] = useState("");
    const [addedRows, setaAddedRows] = useState([]);

    const AddRows = () => {
        if (loginId && password && region && role) {
            const addRowObj = {
                loginId: loginId,
                password: password,
                role: role,
                region: region,
            }
            setaAddedRows([...addedRows, addRowObj]);
            setLoginId("");
            setPassword("");
            setRegion("");
            setRole("");
        } else {
            alert("Please Enter Row Values");
        }
    }
    const SaveLoginMaster = () => {
        const HOST_URL = "https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIMADMIN/insert/into/login/obj";
        axios.post(HOST_URL, addedRows).then(res => res).then(response => {
            if (response.data.code === "1000") {
                alert(`${response.data.value} Successfuly`);
            } else {
                alert(response.data.value);
            }
        })
    }
    return (
        <React.Fragment>
            <div className="mx-3 mt-5">
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Login ID</th>
                            <th>Password</th>
                            <th>Region</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addedRows.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.loginId}</td>
                                    <td>{data.password}</td>
                                    <td>{data.region}</td>
                                    <td>{data.role}</td>
                                </tr>)
                        })}
                        <tr>
                            <th><input type="text" value={loginId} placeholder="Login ID" className="w-100" onChange={(e) => setLoginId(e.target.value)} /></th>
                            <th><input type="password" value={password} placeholder="Password" className="w-100" onChange={(e) => setPassword(e.target.value)} /></th>
                            <th><input type="text" value={region} placeholder="Region" className="w-100" onChange={(e) => setRegion(e.target.value)} /></th>
                            <th><input type="text" value={role} placeholder="Role" className="w-100" onChange={(e) => setRole(e.target.value)} /></th>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <div className="d-flex justify-content-end">
                        <button className="mx-2" onClick={AddRows}>Add</button>
                        {addedRows.length > 0 && <button onClick={SaveLoginMaster}>Save</button>}
                    </div>
                </div>
            </div>
        </React.Fragment>)
}
export default NpimDemo;
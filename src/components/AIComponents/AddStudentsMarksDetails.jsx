import React, { useState } from "react";
import SideBaar from "./Sidebaar";
import { toast } from 'react-toastify';
import { setting } from "../../API/EndPoint";
import { APIInsertStdInfo } from "../../API/CommonCall";

const AddStudentsMarksDetails = () => {
    const [studentName, setStudentName] = useState("");
    const [mathematics, setMathematics] = useState("");
    const [physics, setPhysics] = useState("");
    const [english, setEnglish] = useState("");
    const [hindi, setHindi] = useState("");
    const [computer, setComputer] = useState("");
    const [loading, setLoading] = useState(false);

    const ClrInputField = () => {
        setStudentName("");
        setMathematics("");
        setPhysics("");
        setEnglish("");
        setHindi("");
        setComputer("");
    }

    const SubmitStidentMarks = () => {
        const marksPayload = {
            "Student_Name": studentName,
            "Mathematics": parseInt(mathematics),
            "Physics": parseInt(physics),
            "English": parseInt(english),
            "Hindi": parseInt(hindi),
            "Computer": parseInt(computer)
        }
        if (!studentName) return toast.error("Please Enter Student Name", { theme: "colored" });
        if (!mathematics) return toast.error("Please Enter Mathematis Marks", { theme: "colored" });
        if (!physics) return toast.error("Please Enter Physics Marks", { theme: "colored" });
        if (!english) return toast.error("Please Enter English Marks", { theme: "colored" });
        if (!hindi) return toast.error("Please Enter Hindi Marks", { theme: "colored" });
        if (!computer) return toast.error("Please Enter Computer Marks", { theme: "colored" });
        if (mathematics && physics && english && hindi && computer) {
            setLoading(true);
            APIInsertStdInfo(setting.INSERT_STD_INFO, marksPayload)
                .then(res => res).then(response => {
                    if (response.data.status === true) {
                        ClrInputField();
                        toast.success(response.data.message, { theme: "colored" });
                    } else if (response.data.status === false) {
                        toast.error("Data Not Inserted", { theme: "colored" });
                    }
                    setLoading(false);
                }).catch(error => {
                    toast.error("Internal Server Error", { theme: "colored" });
                    setLoading(false);
                });
        }
    }
    return (
        <React.Fragment>
            <SideBaar />
            <div className="main">
                <h6 className="text-center my-3">ADD STUDENTS MARKS DETAILS</h6>
                <div className="row g-3 mt-2 p-2">
                    <div className="col-md-12">
                        <label className="form-label">Student Name</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Student Name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 text-light bg-dark">
                        <label className="form-label mt-1">Enter Student Subject Wise Marks</label>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Mathematics</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Mathematics"
                            value={mathematics}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val > 100) {
                                    toast.warn("Marks should not grater than 100", { theme: "colored" });
                                } else {
                                    setMathematics(val);
                                }
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Physics</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Physics"
                            value={physics}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val > 100) {
                                    toast.warn("Marks should not grater than 100", { theme: "colored" });
                                } else {
                                    setPhysics(val);
                                }
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">English</label>
                        <input type="text"
                            className="form-control"
                            placeholder="English"
                            value={english}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val > 100) {
                                    toast.warn("Marks should not grater than 100", { theme: "colored" });
                                } else {
                                    setEnglish(val);
                                }
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Hindi</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Hindi"
                            value={hindi}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val > 100) {
                                    toast.warn("Marks should not grater than 100", { theme: "colored" });
                                } else {
                                    setHindi(val);
                                }
                            }}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Computer</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Computer"
                            value={computer}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val > 100) {
                                    toast.warn("Marks should not grater than 100", { theme: "colored" });
                                } else {
                                    setComputer(val);
                                }
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type="button" onClick={SubmitStidentMarks}>
                            {loading === true ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" /><span>Wait...</span></span> : <span>SUBMIT</span>}
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>)
}

export default AddStudentsMarksDetails;

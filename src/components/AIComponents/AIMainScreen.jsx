import React, { useState } from "react";
import SideBaar from "./Sidebaar";
import "../style/AIMainScreen.css"
import Tippy from '@tippyjs/react';
import { CiPaperplane } from "react-icons/ci";
import { toast } from 'react-toastify';
import { BsPersonCircle, BsFillMicFill, BsFillVolumeUpFill, BsFillMicMuteFill } from "react-icons/bs";
import VoiceLoader from "../common/VoiceLoader";
import { useSpeechSynthesis } from 'react-speech-kit';
import { ChartFormate, StudentsHeaders } from "../DataList/StudentsHeaders";
import BarChartInfo from "../ChartsComponents/BarChartsInfo";
import PieChartInfo from "../ChartsComponents/PieChartInfo";
import { setting } from "../../API/EndPoint";
import { APIQuarySolve } from "../../API/CommonCall";

const AIMainScreen = () => {
    const [autoSuggest, setAutoSuggest] = useState("");
    const [aiResponse, setAiResponse] = useState([]);
    const [voiceLoading, setVoiceLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { speak, cancel } = useSpeechSynthesis();
    const [tabularData, setTabularData] = useState("");

    const GetResponseByAI = (autoSuggest) => {
        setLoading(true);
        const AiPayload = { text: autoSuggest }
        APIQuarySolve(setting.QUARY_SOLVE, AiPayload)
            .then(res => res).then(response => {
                if (response.data.status === true) {
                    const aiRes = {
                        question: autoSuggest,
                        ans: response.data.data,
                    }
                    setAiResponse([...aiResponse, aiRes]);
                    setAutoSuggest("");
                } else if (response.data.status === false) {
                    toast.warn(response.data.message, { theme: "colored" })
                }
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                toast.error("Internal Server Error", { theme: "colored" });
            });
    }
    const handleKeyPress = (event) => {
        if (event.key.toUpperCase() === 'ENTER') {
            GetResponseByAI(autoSuggest);
        }
    }

    const startListening = () => {
        setVoiceLoading(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = async (event) => {
            const transcript = await event.results[0][0].transcript;
            setAutoSuggest(transcript);
        };
        recognition.start();
        setTimeout(() => { setVoiceLoading(false) }, 10000);
    };

    return (
        <div>
            <SideBaar />
            <div className="main">
                {voiceLoading === true && <VoiceLoader />}
                {loading === true && <VoiceLoader />}
                {aiResponse.length > 0 &&
                    <div style={{ marginBottom: "10%" }}>
                        {aiResponse.map((res, i) => {
                            const { question, ans } = res;
                            return (
                                <div key={i}>
                                    <div className="my-4">
                                        <div className="d-flex">
                                            <BsPersonCircle size={23} color="gray" />
                                            <h6 className="mx-3"><b>You</b></h6>
                                        </div>
                                        <h6 style={{ marginLeft: "4%" }}>{question}</h6>
                                    </div>
                                    <div className="d-flex">
                                        <BsPersonCircle size={23} color="green" />
                                        <h6 className="mx-2"><b>ChatBot</b></h6>
                                        <Tippy content={<span>Click To Speak</span>}>
                                            <button onClick={() => speak({ text: "hello" })} style={{ border: "none", backgroundColor: "#fff", marginTop: "-1%" }}>
                                                <BsFillVolumeUpFill size={19} />
                                            </button>
                                        </Tippy>
                                        <Tippy content={<span>Stop Voice</span>}>
                                            <button onClick={() => cancel()} style={{ border: "none", backgroundColor: "#fff", marginTop: "-1%" }}>
                                                <BsFillMicMuteFill size={20} />
                                            </button>
                                        </Tippy>
                                    </div>
                                    <div className="table-responsive mt-2" style={{ marginLeft: "4%" }}>
                                        {ans.length > 0 &&
                                            <table key={i} className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        {StudentsHeaders.map((item, i) => {
                                                            return <th key={i}>{item}</th>
                                                        })}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ans.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{item.Id}</td>
                                                                <td>{item.Student_Name}</td>
                                                                <td>{item.Mathematics}</td>
                                                                <td>{item.Physics}</td>
                                                                <td>{item.English}</td>
                                                                <td>{item.Hindi}</td>
                                                                <td>{item.Computer}</td>
                                                                <td>{item.Total}</td>
                                                                <td>{item.Percentage}%</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                    {ans.length > 0 && <div className='d-flex justify-content-end'>
                                        <select onChange={(e) => setTabularData(e.target.value)}>
                                            {ChartFormate.map((data, i) => {
                                                return <option key={i} value={data.value}>{data.label}</option>
                                            })}
                                        </select>
                                    </div>}
                                    {tabularData === "barChart" && ans.length > 0 && <BarChartInfo studentsInfo={ans} />}
                                    {tabularData === "pieChart" && Array.isArray(ans) && <PieChartInfo studentsInfo={ans} />}
                                    {Array.isArray(ans) === false && <div className="d-flex">
                                        <h6 style={{ marginLeft: "4%" }}>Name: <b>{ans.student_Name}</b>, Total Marks: <b>{ans.total}</b></h6>
                                    </div>}
                                </div>)
                        })}
                    </div>}
                <div className="search_area">
                    <input className="AI_Input" type="text" placeholder={voiceLoading === true ? "Speak..." : "Type your query here..."} value={autoSuggest}
                        onChange={(e) => setAutoSuggest(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <div>
                        <BsFillMicFill className="mx-1 iconsStyle" size={25} onClick={startListening} />
                        <CiPaperplane className={autoSuggest ? "iconsStyle" : "iconsStyle_disabled"} size={27} onClick={() => GetResponseByAI(autoSuggest)} />
                    </div>
                </div>
            </div>
        </div>)
}
export default AIMainScreen;
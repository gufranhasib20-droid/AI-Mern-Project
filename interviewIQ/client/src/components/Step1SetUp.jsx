import React, { useState } from "react";
import { motion } from "motion/react";
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice"; 


function Step1SetUp({ onStart }) {

    const {userData}=useSelector((state)=>state.user);
    const dispatch =useDispatch();

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");

    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);


    const handleUploadResume = async () => {

        if (!resumeFile || analyzing) return;

        setAnalyzing(true);

        const formdata = new FormData();

        formdata.append("resume", resumeFile);

        try {

            const result = await axios.post(
                ServerUrl + "/api/interview/resume",
                formdata,
                {
                    withCredentials: true,
                }
            );

            console.log(result.data);

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");

            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {

            console.log(error);

            setAnalyzing(false);
        }
    };



  const handleStart = async () => {
    setLoading(true)
    try {
        const result = await axios.post(ServerUrl + "/api/interview/generate-questions", 
            { role, experience, mode, resumeText, projects, skills }, 
            { withCredentials: true }
        )
        console.log(result.data)
        if (userData) {
            dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
        }
        setLoading(false)
        onStart(result.data)
    } catch (error) {
        console.log("Server said:", error.response?.data); // <-- this is the actual validation message
        console.log("Status:", error.response?.status);
        setLoading(false)
    }
}







    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10"
        >


            <div className="w-full max-w-5xl min-h-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">


                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-green-50 p-10 flex flex-col justify-center"
                >

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Start Your AI Interview
                    </h1>

                    <p className="text-sm text-gray-600 leading-relaxed mb-10">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills and confidence.
                    </p>



                    <div className="space-y-4">

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm"
                        >

                            <FaUserTie className="text-green-600" />

                            <span className="text-sm font-medium text-gray-700">
                                Choose Role &amp; Experience
                            </span>

                        </motion.div>


                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm"
                        >

                            <FaMicrophoneAlt className="text-green-600" />

                            <span className="text-sm font-medium text-gray-700">
                                Smart Voice Interview
                            </span>

                        </motion.div>


                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm"
                        >

                            <FaChartLine className="text-green-600" />

                            <span className="text-sm font-medium text-gray-700">
                                Performance Analytics
                            </span>

                        </motion.div>

                    </div>

                </motion.div>



                <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="p-10 flex flex-col justify-center bg-white overflow-y-auto"
                >

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Interview SetUp
                    </h2>


                    <div className="space-y-4">


                        <div className="relative">

                            <FaUserTie className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                            <input
                                type="text"
                                placeholder="Enter role"
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value)
                                }
                                className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            />

                        </div>



                        <div className="relative">

                            <FaBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                            <input
                                type="text"
                                placeholder="Experience (e.g. 2 years)"
                                value={experience}
                                onChange={(e) =>
                                    setExperience(e.target.value)
                                }
                                className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            />

                        </div>



                        <select
                            value={mode}
                            onChange={(e) =>
                                setMode(e.target.value)
                            }
                            className="w-full px-3.5 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        >

                            <option value="Technical">
                                Technical Interview
                            </option>

                            <option value="HR">
                                HR Interview
                            </option>

                        </select>



                        {!analysisDone && (

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-green-500 hover:bg-green-50 transition">

                                <FaFileUpload className="text-green-600 text-2xl mx-auto mb-2" />

                                <p className="text-sm text-gray-600 mb-2">

                                    {resumeFile
                                        ? resumeFile.name
                                        : "Upload your resume"}

                                </p>


                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setResumeFile(e.target.files[0])
                                    }
                                    className="text-xs w-full"
                                />



                                {resumeFile && (

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume();
                                        }}
                                        disabled={analyzing}
                                        className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                                    >

                                        {analyzing
                                            ? "Analyzing..."
                                            : "Analyze Resume"}

                                    </motion.button>

                                )}

                            </div>

                        )}



                        {analysisDone && (

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4"
                            >

                                <h3 className="text-base font-semibold text-gray-800">
                                    Resume Analysis Result
                                </h3>



                                {projects.length > 0 && (

                                    <div>

                                        <p className="font-semibold text-gray-700 mb-1.5 text-sm">
                                            Projects:
                                        </p>

                                        <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">

                                            {projects.map((project, index) => (

                                                <li key={index}>
                                                    {project}
                                                </li>

                                            ))}

                                        </ul>

                                    </div>

                                )}



                                {skills.length > 0 && (

                                    <div>

                                        <p className="font-semibold text-gray-700 mb-2 text-sm">
                                            Skills:
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {skills.map((skill, index) => (

                                                <span
                                                    key={index}
                                                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                                                >
                                                    {skill}
                                                </span>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </motion.div>

                        )}


                        <button
                        disabled={loading || analyzing}
                        onClick={handleStart}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-semibold transition disabled:opacity-50 shadow-sm"
                        >
                            {analyzing
                            ? "Analyzing Resume..."
                            : loading
                            ? "Starting Interview..."
                            : "Start Interview"}
                         </button>

                    </div>

                </motion.div>

            </div>

        </motion.div>
    );
}

export default Step1SetUp;
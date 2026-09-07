import React from 'react'
import { FaArrowLeft, FaDownload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'


function ScoreRing({ score, max = 10, size = 160, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;
  let percentage = score / max; 

  
  if (percentage > 1) percentage = 1; 
  if (percentage < 0) percentage = 0; 

  const dashOffset = circumference - percentage * circumference;

  return (
   
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="none"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#10b981"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}


function TrendTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const scoreValue = payload[0].value;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow px-3 py-2">
      <p className="text-xs font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-emerald-600">score : {scoreValue}</p>
    </div>
  );
}


function Step3Report({ report }) {
  const navigate = useNavigate();

  
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }

 
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  
  const questionScoreData = questionWiseScore.map((question, index) => ({
    name: `Q${index + 1}`,
    score: question.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  
  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const hasQuestions = questionWiseScore.length > 0;

 
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(16, 185, 129); // emerald green
    doc.text("Interview Analytics Report", 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80); // dark grey
    doc.text(`Overall Score: ${finalScore}/10`, 14, 30);
    doc.text(performanceText, 14, 36);
    doc.text(shortTagline, 14, 42);

    autoTable(doc, {
      startY: 50, // start a bit below the text above
      head: [["Skill", "Score (out of 10)"]],
      body: skills.map((skill) => [skill.label, skill.value]),
      theme: "grid",
      headStyles: { fillColor: [16, 185, 129] },
    });

    
    const nextTableStartY = doc.lastAutoTable.finalY + 10;

    autoTable(doc, {
      startY: nextTableStartY,
      head: [["#", "Question", "Score", "AI Feedback"]],
      body: questionWiseScore.map((question, index) => [
        index + 1,
        question.question || `Question ${index + 1}`,
        `${question.score || 0}/10`,
        question.feedback || "No feedback available.",
      ]),
      theme: "striped",
      headStyles: { fillColor: [16, 185, 129] },
      styles: { fontSize: 9, cellWidth: 'wrap' },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 55 },  
        2: { cellWidth: 18 },  
        3: { cellWidth: 'auto' }, 
      },
    });

    doc.save("interview-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)} // go back to the previous page
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
            >
              <FaArrowLeft size={16} className="text-gray-600" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Interview Analytics Dashboard
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                AI-powered performance insights
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow transition-colors w-full sm:w-auto"
          >
            <FaDownload size={14} />
            Download PDF
          </button>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="space-y-6 lg:col-span-1">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-center text-gray-500 text-sm mb-4">
                Overall Performance
              </p>

              <div className="relative flex items-center justify-center mx-auto w-40 h-40">
                <ScoreRing score={finalScore} size={160} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-500">
                    {finalScore}/10
                  </span>
                </div>
              </div>

              <p className="text-center text-gray-400 text-xs mt-2">Out of 10</p>
              <p className="text-center font-semibold text-gray-800 mt-4">
                {performanceText}
              </p>
              <p className="text-center text-gray-400 text-sm mt-1">
                {shortTagline}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Skill Evaluation
              </h2>

              <div className="space-y-5">
                {skills.map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-gray-600">{skill.label}</span>
                      <span className="text-sm font-semibold text-emerald-500">
                        {skill.value}
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${(skill.value / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Performance Trend
              </h2>

             
              <div className="w-full h-[220px] sm:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={questionScoreData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 10]}
                      ticks={[0, 3, 6, 10]}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={false}
                    />
                    <Tooltip content={<TrendTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Question Breakdown
              </h2>

              {hasQuestions ? (
                <div className="space-y-4">
                  {questionWiseScore.map((question, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-400">
                          Question {index + 1}
                        </p>
                        <span className="text-xs font-semibold text-emerald-500">
                          {question.score || 0}/10
                        </span>
                      </div>

                      <p className="text-sm font-medium text-gray-800 mb-3 break-words">
                        {question.question || "Question text unavailable."}
                      </p>

                      <p className="text-xs font-semibold text-emerald-500 mb-1">
                        AI Feedback
                      </p>
                      <p className="text-sm text-gray-500 break-words">
                        {question.feedback || "No feedback available for this question."}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No questions answered yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report
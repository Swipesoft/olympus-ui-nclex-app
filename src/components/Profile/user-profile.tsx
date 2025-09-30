"use client";
import Link from "next/link"; 
import { useState, useEffect, useRef } from "react";
import { User, TrendingUp, Target, Award } from "lucide-react";
import { QuizResult, PerformanceSummary } from "@/lib/adapters/sessionAdapter";
import { ScoreTrend } from "@/lib/adapters/sessionAdapter";

// eslint-disable-next-line @typescript-eslint/no-unused-vars 
interface QuizResult0 {
  id: string;
  title: string;
  score: number;
  total: number;
  date: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PerformanceSummary0 {
  averageScore: number;
  questionsAttempted: number;
  questionsRemaining: number;
}

// Mock data
//const recentResults: QuizResult[] = [
 // { id: 1, title: "JavaScript Basics", score: 18, total: 20, date: "2023-05-15" },
  //{ id: 2, title: "React Fundamentals", score: 15, total: 20, date: "2023-05-18" },
  //{ id: 3, title: "CSS Layouts", score: 17, total: 20, date: "2023-05-20" },
  //{ id: 4, title: "TypeScript Intro", score: 19, total: 20, date: "2023-05-22" },
  //{ id: 5, title: "Node.js Basics", score: 16, total: 20, date: "2023-05-25" },
//];
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
const scoreTrend0: ScoreTrend[]= [
  { quiz: "Science", score: 30 },
  { quiz: "Math", score: 70 },
  { quiz: "Logic", score: 85 },
  { quiz: "History", score: 65 },
  { quiz: "English", score: 78 },
  { quiz: "Physics", score: 82 },
  { quiz: "Chemistry", score: 90 },
  { quiz: "Biology", score: 88 },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const performanceSummaryo: PerformanceSummary = {
  averageScore: 0,
  questionsAttempted: 0,
  questionsRemaining: 368
};

type UserProfileProps = {
  fullName?: string;
  recentResults: QuizResult[] | [];
  performanceSummary: PerformanceSummary;
  scoreTrend: ScoreTrend[] | [];
} 

export default function UserProfile({
  fullName = "dear NCLEX Olympian",
  recentResults,
  performanceSummary,
  scoreTrend
}: UserProfileProps) {
  const [chartDimensions, setChartDimensions] = useState({ width: 280, height: 120 });
  const chartContainerRef = useRef<HTMLDivElement>(null);
  console.log("📊 Profile Recent Results:", recentResults);
  // Update chart dimensions based on container width
  useEffect(() => {
    const updateChartDimensions = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        // Use different heights based on screen size (mobile vs desktop)
        const isMobile = window.innerWidth < 768;
        const height = isMobile ? 120 : Math.max(150, containerWidth * 0.3);
        setChartDimensions({
          width: containerWidth,
          height: height
        });
      }
    };
    updateChartDimensions();
    window.addEventListener('resize', updateChartDimensions);
    return () => window.removeEventListener('resize', updateChartDimensions);
  }, []);

  // Chart settings based on current dimensions
  const padding = 30;
  const maxY = 100;
  const maxX = scoreTrend.length - 1;

  // Generate path for the line
  const generatePath = () => {
    return scoreTrend.map((item, index) => {
      const x = padding + (index / maxX) * (chartDimensions.width - padding * 2);
      const y = chartDimensions.height - padding - (item.score / maxY) * (chartDimensions.height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Generate area under the line
  const generateArea = () => {
    const pathPoints = scoreTrend.map((item, index) => {
      const x = padding + (index / maxX) * (chartDimensions.width - padding * 2);
      const y = chartDimensions.height - padding - (item.score / maxY) * (chartDimensions.height - padding * 2);
      return `${x} ${y}`;
    }).join(' L ');
    
    const firstX = padding;
    const lastX = padding + (maxX / maxX) * (chartDimensions.width - padding * 2);
    const bottomY = chartDimensions.height - padding;
    
    return `M ${firstX} ${bottomY} L ${pathPoints} L ${lastX} ${bottomY} Z`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 font-serif">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 bg-white shadow-sm">
        <Link href="/" className="flex items-center space-x-2"> 
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">O</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Olympus</h1>
        </div>
        </Link>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <User className="text-gray-600" />
        </button>
      </header>

      <main className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {fullName}!</h2>
              <p className="mb-4 opacity-90 text-sm md:text-base">Ready for your next challenge?</p>
              <Link href="/qbank"> 
              <button className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors text-sm md:text-base">
                Start New Quiz
              </button>
              </Link>
            </div>
            <div className="bg-indigo-400 p-3 rounded-full">
              <Target className="text-white" size={24} />
            </div>
          </div>
        </section>

        
        {/* Score Trend Graph */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Score Trend</h2>
            <TrendingUp className="text-indigo-600" />
          </div>
          
          {/* Chart Container */}
          <div ref={chartContainerRef} className="w-full">
            <svg 
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
              className="h-32 md:h-64 w-full"
            >
              {/* Gradient definition */}
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <g key={percent}>
                  <line
                    x1={padding}
                    y1={chartDimensions.height - padding - (percent / maxY) * (chartDimensions.height - padding * 2)}
                    x2={chartDimensions.width - padding}
                    y2={chartDimensions.height - padding - (percent / maxY) * (chartDimensions.height - padding * 2)}
                    stroke="#e2e8f0"
                    strokeWidth="0.5"
                  />
                  <text
                    x={padding - 10}
                    y={chartDimensions.height - padding - (percent / maxY) * (chartDimensions.height - padding * 2) + 3}
                    fontSize="8"
                    fill="#94a3b8"
                    textAnchor="end"
                  >
                    {percent}%
                  </text>
                </g>
              ))}
              
              {/* Area under the line */}
              <path
                d={generateArea()}
                fill="url(#scoreGradient)"
              />
              
              {/* Line */}
              <path
                d={generatePath()}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              
              {/* Data points */}
              {scoreTrend.map((item, index) => {
                const x = padding + (index / maxX) * (chartDimensions.width - padding * 2);
                const y = chartDimensions.height - padding - (item.score / maxY) * (chartDimensions.height - padding * 2);
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#8b5cf6"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y - 10}
                      fontSize="10"
                      fill="#8b5cf6"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {item.score}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        {/* Performance Summary - Now visible on both mobile and desktop */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Performance Summary</h2>
          
          {/* Mobile: Vertical layout | Desktop: Horizontal layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="text-indigo-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-xl font-bold text-gray-800">{performanceSummary.averageScore}%</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Questions Attempted</p>
              <p className="text-xl font-bold text-gray-800">{performanceSummary.questionsAttempted}</p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="text-amber-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Questions Remaining</p>
              <p className="text-xl font-bold text-gray-800">+{performanceSummary.questionsRemaining}</p>
            </div>
          </div>
        </section>
        
        {/* Recent Results */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Recent Results</h2>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentResults.map((result) => (
              <Link 
                key={result.id} 
                href={`/review/${result.id}`} // dynamic route
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-gray-800">{result.title}</h3>
                  <span className="text-sm font-semibold text-gray-600">
                    {result.score}/{result.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(result.score / result.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{result.date}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="pb-8"></div>
      </main>
    </div>
  );
}
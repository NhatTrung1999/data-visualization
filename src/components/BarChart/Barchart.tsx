import React from 'react';

type BarData = {
    label: string;
    value: number;
};

type BarChartProps = {
    data: BarData[];
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const chartHeight = 200;
    const barWidth = 40;
    const barSpacing = 30;
    const chartWidth = data.length * (barWidth + barSpacing);

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border w-full overflow-x-auto">
            <svg width={chartWidth} height={chartHeight + 50}>
                {/* Grid lines */}
                {[0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const y = chartHeight * ratio;
                    return (
                        <line
                            key={i}
                            x1={0}
                            y1={y}
                            x2={chartWidth}
                            y2={y}
                            stroke="#e5e7eb"
                            strokeDasharray="4"
                        />
                    );
                })}

                {/* Bars */}
                {data.map((item, index) => {
                    const barHeight = (item.value / maxValue) * chartHeight;
                    const x = index * (barWidth + barSpacing);

                    return (
                        <g key={index} transform={`translate(${x}, 0)`}>
                            <rect
                                x={0}
                                y={chartHeight - barHeight}
                                width={barWidth}
                                height={barHeight}
                                fill="url(#barGradient)"
                                rx={6}
                            />
                            <text
                                x={barWidth / 2}
                                y={chartHeight + 18}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#374151"
                            >
                                {item.label}
                            </text>
                            <text
                                x={barWidth / 2}
                                y={chartHeight - barHeight - 8}
                                textAnchor="middle"
                                fontSize="11"
                                fill="#1f2937"
                                fontWeight={600}
                            >
                                {item.value}
                            </text>
                        </g>
                    );
                })}

                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default BarChart;

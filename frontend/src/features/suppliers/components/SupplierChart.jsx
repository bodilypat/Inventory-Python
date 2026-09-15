/* **********************************************************/
/* File: src/features/suppliers/components/SupplierChart.jsx */ 
/* **********************************************************/
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SupplierChart = ({ suppliers }) => {
    const statusCounts = suppliers.reduce((acc, supplier) => {
        acc[supplier.status] = (acc[supplier.status] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: "Number of Suppliers",
                data: Object.values(statusCounts),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Supplier Status Distribution",
            },
        },
    };

    return (
        <div className="supplier-chart">
            <Bar data={data} options={options} />
        </div>
    );
}

export default SupplierChart;



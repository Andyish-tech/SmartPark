import React, { useState } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {
    faChartPie,
    faFileExport,
    faFileExcel,
    faSearch,
    faCalendarAlt,
    faGem,
    faInbox
} from '@fortawesome/free-solid-svg-icons';

const Reports = () => {
    const [month, setMonth] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFilter = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.get(`/reports/payroll?month=${month}`);
            setData(response.data);
        } catch (err) { alert('Analysis Error'); }
        finally { setLoading(false); }
    };

    const handleExportExcel = async () => {
        if (data.length === 0) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Executive Audit');

        // Column Definitions
        worksheet.columns = [
            { header: 'PERSONNEL ASSET', key: 'name', width: 35 },
            { header: 'STRATEGIC POSITION', key: 'pos', width: 25 },
            { header: 'BUSINESS UNIT', key: 'dept', width: 20 },
            { header: 'GROSS ASSET (RWF)', key: 'gross', width: 22 },
            { header: 'LIABILITY FACTOR (RWF)', key: 'ded', width: 22 },
            { header: 'NET DISBURSEMENT (RWF)', key: 'net', width: 25 }
        ];

        // 1. Formal Branding Header
        const headerRow = worksheet.insertRow(1, ["SMARTPARK EPMS - ELITE SERIES v2.9"]);
        const subHeaderRow = worksheet.insertRow(2, ["EXECUTIVE STRATEGIC PAYROLL AUDIT PORTFOLIO"]);
        const fiscalRow = worksheet.insertRow(3, [`FISCAL PERIOD: ${month}`]);
        const timeRow = worksheet.insertRow(4, [`GENERATED: ${new Date().toLocaleString()}`]);
        worksheet.insertRow(5, []); // Spacer

        // Style the Branding Header (Charcoal theme)
        [headerRow, subHeaderRow, fiscalRow, timeRow].forEach((row, i) => {
            row.eachCell(cell => {
                cell.font = { name: 'Arial', size: i === 0 ? 14 : 9, bold: true, color: { argb: 'FFFFFFFF' } };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF36454F' } };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
            worksheet.mergeCells(row.number, 1, row.number, 6);
        });

        // 2. Data Table Header Styling (Emerald theme)
        const tableHeader = worksheet.getRow(6);
        tableHeader.values = ["PERSONNEL ASSET", "STRATEGIC POSITION", "BUSINESS UNIT", "GROSS ASSET (RWF)", "LIABILITY (RWF)", "NET VALUE (RWF)"];
        tableHeader.eachCell(cell => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF50C878' } };
            cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // 3. Populate Data with defensive numerical sanitization
        data.forEach(item => {
            const row = worksheet.addRow([
                `${item.firstName} ${item.lastName}`,
                item.position,
                item.departmentName,
                Number(item.grossSalary) || 0,
                Number(item.totalDeduction) || 0,
                Number(item.netSalary) || 0
            ]);
            row.eachCell(cell => {
                cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
                cell.font = { size: 10 };
                if (typeof cell.value === 'number') {
                    cell.numFmt = '#,##0';
                    cell.alignment = { horizontal: 'right' };
                }
            });
        });

        // 4. Financial Summary Footer (Aligned with columns)
        const totalNet = data.reduce((acc, curr) => acc + (Number(curr.netSalary) || 0), 0);
        const totalGross = data.reduce((acc, curr) => acc + (Number(curr.grossSalary) || 0), 0);
        const totalDeductions = data.reduce((acc, curr) => acc + (Number(curr.totalDeduction) || 0), 0);

        worksheet.addRow([]); // Spacer
        const summaryTitle = worksheet.addRow(["EXECUTIVE FINANCIAL PORTFOLIO SUMMARY"]);
        worksheet.mergeCells(summaryTitle.number, 1, summaryTitle.number, 6);
        summaryTitle.eachCell(cell => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF36454F' } };
            cell.alignment = { horizontal: 'center' };
        });

        // Aligned Totals
        const grossSum = worksheet.addRow(["", "", "TOTAL AGGREGATE GROSS VALUE", totalGross, "", ""]);
        const dedSum = worksheet.addRow(["", "", "TOTAL AGGREGATE LIABILITIES", "", totalDeductions, ""]);
        const netSum = worksheet.addRow(["", "", "TOTAL NET DISBURSEMENT", "", "", totalNet]);

        [grossSum, dedSum, netSum].forEach(row => {
            row.eachCell((cell, colNumber) => {
                if (colNumber === 3) {
                    cell.font = { bold: true, size: 10 };
                    cell.alignment = { horizontal: 'right' };
                }
                if (typeof cell.value === 'number') {
                    cell.numFmt = '#,##0';
                    cell.font = { bold: true, color: { argb: 'FF50C878' }, size: 11 };
                    cell.alignment = { horizontal: 'right' };
                }
            });
        });

        // 5. Final Dispatch
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `SmartPark_Elite_Audit_${month}.xlsx`);
    };

    return (
        <div className="max-w-5xl mx-auto py-6">
            <div className="mb-12 flex justify-between items-end border-b-2 border-charcoal/5 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-charcoal uppercase tracking-tighter">Executive <span className="text-emerald italic">Analytics</span></h1>
                    <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mt-2">Strategic Payroll Audit Portfolio</p>
                </div>
                <div className="flex gap-4">
                    <button
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald hover:text-charcoal transition-colors flex items-center gap-2 px-4 py-2 bg-emerald/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={handleExportExcel}
                        disabled={data.length === 0}
                    >
                        <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
                    </button>
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald hover:text-charcoal transition-colors flex items-center gap-2 px-4 py-2 bg-emerald/5 rounded-lg" onClick={() => window.print()}>
                        <FontAwesomeIcon icon={faFileExport} /> Export Statement
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[36px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 mb-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 w-full relative">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 mb-3 ml-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-emerald" /> Fiscal Period Selection
                    </label>
                    <input
                        type="month"
                        className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-[20px] outline-none font-black text-charcoal transition text-lg"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleFilter}
                    disabled={!month || loading}
                    className="w-full md:w-auto self-end bg-charcoal text-white px-14 py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-emerald disabled:bg-gray-200 transition-all duration-500 shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3"
                >
                    <FontAwesomeIcon icon={loading ? faChartPie : faSearch} className={loading ? "animate-spin" : ""} />
                    {loading ? 'Synthesizing...' : 'Generate Audit'}
                </button>
            </div>

            {data.length > 0 ? (
                <div className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-charcoal/5 overflow-hidden print:border-none print:shadow-none">
                    <div className="p-10 bg-charcoal text-white flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                                <FontAwesomeIcon icon={faChartPie} className="text-emerald" /> Payroll Summary Report
                            </h2>
                            <p className="opacity-40 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Period Ending: <span className="text-emerald">{month}</span></p>
                        </div>
                        <div className="text-right relative z-10">
                            <div className="text-3xl font-black italic tracking-tighter">Elite <span className="text-emerald">Series</span></div>
                            <div className="text-[10px] opacity-30 uppercase font-black tracking-widest mt-1">Internal Strategic Audit</div>
                        </div>
                    </div>

                    <div className="p-10">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 rounded-2xl">
                                <tr>
                                    <th className="p-6 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Personnel Assets</th>
                                    <th className="p-6 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Strategic Post</th>
                                    <th className="p-6 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Business Unit</th>
                                    <th className="p-6 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px] text-right">Gross Asset</th>
                                    <th className="p-6 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px] text-right">Liability</th>
                                    <th className="p-6 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px] text-right">Net Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 border-t border-gray-50">
                                {data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-softlime/5 transition-colors group">
                                        <td className="p-6 font-black text-charcoal">{row.firstName} {row.lastName}</td>
                                        <td className="p-6 text-charcoal/60 text-xs font-bold uppercase tracking-wider italic">{row.position}</td>
                                        <td className="p-6">
                                            <span className="bg-emerald/5 text-emerald px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald/10">{row.departmentName}</span>
                                        </td>
                                        <td className="p-6 font-bold text-charcoal/40 text-right text-xs tracking-tighter">RWF {parseFloat(row.grossSalary).toLocaleString()}</td>
                                        <td className="p-6 text-red-400 font-bold text-right text-xs tracking-tighter italic">- RWF {parseFloat(row.totalDeduction).toLocaleString()}</td>
                                        <td className="p-6 font-black text-charcoal text-right text-xl tracking-tighter">RWF {parseFloat(row.netSalary).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-12 bg-gray-50 border-t border-charcoal/5 flex justify-between items-center px-16">
                        <div className="flex flex-col">
                            <span className="font-black text-charcoal/30 uppercase tracking-[0.4em] text-[10px]">Aggregate Portfolio Disbursement</span>
                            <span className="text-5xl font-black text-charcoal mt-2 italic tracking-tighter underline decoration-emerald decoration-8 underline-offset-8">
                                RWF {data.reduce((acc, curr) => acc + parseFloat(curr.netSalary), 0).toLocaleString()}
                            </span>
                        </div>
                        <div className="w-20 h-20 bg-emerald text-white rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-emerald/40 rotate-12">
                            <FontAwesomeIcon icon={faGem} />
                        </div>
                    </div>
                </div>
            ) : month && !loading && (
                <div className="bg-white border-2 border-dashed border-charcoal/10 p-24 rounded-[40px] text-center">
                    <FontAwesomeIcon icon={faInbox} className="text-6xl mb-8 text-charcoal/10" />
                    <p className="text-charcoal/30 font-black uppercase tracking-[0.3em] text-xs">No strategic financial data discovered for this period</p>
                </div>
            )}
        </div>
    );
};

export default Reports;

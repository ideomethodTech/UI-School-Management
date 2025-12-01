// src/app/dashboard/fee-status/page.js
"use client";

import React from 'react';
import { DollarSign, CheckCircle, AlertCircle, Clock, Download } from 'lucide-react';

// Mock fee data
const feeData = {
    childName: 'Emily Johnson',
    class: 'Grade 9A',
    studentId: 'STU12345',
    totalAnnualFee: 75000,
    paidAmount: 50000,
    pendingAmount: 25000,
    terms: [
        {
            id: 1,
            name: 'Term 1 (Apr-Jun)',
            amount: 25000,
            dueDate: 'Apr 30, 2025',
            paidDate: 'Apr 15, 2025',
            status: 'paid',
            receiptNo: 'REC-2025-001'
        },
        {
            id: 2,
            name: 'Term 2 (Jul-Sep)',
            amount: 25000,
            dueDate: 'Jul 31, 2025',
            paidDate: 'Jul 20, 2025',
            status: 'paid',
            receiptNo: 'REC-2025-002'
        },
        {
            id: 3,
            name: 'Term 3 (Oct-Dec)',
            amount: 25000,
            dueDate: 'Oct 31, 2025',
            paidDate: null,
            status: 'due',
            receiptNo: null
        }
    ],
    paymentHistory: [
        { id: 1, date: 'Jul 20, 2025', amount: 25000, term: 'Term 2', method: 'Online Banking', receiptNo: 'REC-2025-002' },
        { id: 2, date: 'Apr 15, 2025', amount: 25000, term: 'Term 1', method: 'Credit Card', receiptNo: 'REC-2025-001' },
    ]
};

export default function FeeStatusPage() {
    const { childName, class: className, studentId, totalAnnualFee, paidAmount, pendingAmount, terms, paymentHistory } = feeData;
    const paidPercentage = (paidAmount / totalAnnualFee) * 100;

    return (
        <div className='space-y-6'>
            <div>
                <h1 className='text-2xl font-bold text-gray-800'>Fee Status</h1>
                <p className='text-gray-600 mt-1'>{childName} - {className} (ID: {studentId})</p>
            </div>

            {/* Fee Summary Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='card p-6 border-l-4 border-blue-500'>
                    <div className='flex items-center gap-3 mb-2'>
                        <DollarSign size={20} className='text-blue-600' />
                        <p className='text-sm text-gray-500'>Total Annual Fee</p>
                    </div>
                    <p className='text-3xl font-bold text-gray-800'>₹{totalAnnualFee.toLocaleString()}</p>
                </div>

                <div className='card p-6 border-l-4 border-green-500'>
                    <div className='flex items-center gap-3 mb-2'>
                        <CheckCircle size={20} className='text-green-600' />
                        <p className='text-sm text-gray-500'>Paid Amount</p>
                    </div>
                    <p className='text-3xl font-bold text-green-600'>₹{paidAmount.toLocaleString()}</p>
                </div>

                <div className='card p-6 border-l-4 border-red-500'>
                    <div className='flex items-center gap-3 mb-2'>
                        <AlertCircle size={20} className='text-red-600' />
                        <p className='text-sm text-gray-500'>Pending Amount</p>
                    </div>
                    <p className='text-3xl font-bold text-red-600'>₹{pendingAmount.toLocaleString()}</p>
                </div>
            </div>

            {/* Payment Progress */}
            <div className='card p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4'>Payment Progress</h2>
                <div className='mb-3'>
                    <div className='flex justify-between text-sm text-gray-600 mb-2'>
                        <span>Paid: {paidPercentage.toFixed(0)}%</span>
                        <span>₹{paidAmount.toLocaleString()} of ₹{totalAnnualFee.toLocaleString()}</span>
                    </div>
                    <div className='h-4 bg-gray-100 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500'
                            style={{ width: `${paidPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Term-wise Fee Details */}
            <div className='card p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4'>Term-wise Fee Details</h2>
                <div className='space-y-4'>
                    {terms.map(term => (
                        <div key={term.id} className='flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors'>
                            <div className='flex items-center gap-4'>
                                <div className={`p-3 rounded-full ${term.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {term.status === 'paid' ? <CheckCircle size={24} /> : <Clock size={24} />}
                                </div>
                                <div>
                                    <h3 className='font-medium text-gray-800'>{term.name}</h3>
                                    <p className='text-sm text-gray-500'>
                                        Due Date: {term.dueDate}
                                        {term.paidDate && ` • Paid on: ${term.paidDate}`}
                                    </p>
                                    {term.receiptNo && (
                                        <p className='text-xs text-gray-400 mt-1'>Receipt: {term.receiptNo}</p>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='text-right'>
                                    <p className='text-xl font-bold text-gray-800'>₹{term.amount.toLocaleString()}</p>
                                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${term.status === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {term.status === 'paid' ? 'Paid' : 'Due'}
                                    </span>
                                </div>
                                {term.status === 'paid' && (
                                    <button className='p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors'>
                                        <Download size={18} />
                                    </button>
                                )}
                                {term.status === 'due' && (
                                    <button className='px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors'>
                                        Pay Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment History */}
            <div className='card p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4'>Payment History</h2>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Term</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Method</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Receipt</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {paymentHistory.map(payment => (
                                <tr key={payment.id} className='hover:bg-gray-50 transition-colors'>
                                    <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-600'>{payment.date}</td>
                                    <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-medium'>{payment.term}</td>
                                    <td className='px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600'>₹{payment.amount.toLocaleString()}</td>
                                    <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-600'>{payment.method}</td>
                                    <td className='px-4 py-4 whitespace-nowrap text-xs text-gray-500'>{payment.receiptNo}</td>
                                    <td className='px-4 py-4 whitespace-nowrap text-sm'>
                                        <button className='text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1'>
                                            <Download size={16} />
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

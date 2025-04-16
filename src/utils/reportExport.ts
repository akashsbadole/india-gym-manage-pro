
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

// Helper function to convert date to formatted string
const formatDate = (date: string | Date): string => {
  if (!date) return '';
  return format(new Date(date), 'dd MMM yyyy');
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Type for table data
export type TableData = {
  headers: string[];
  rows: (string | number | null)[][];
};

/**
 * Exports data to CSV format and triggers download
 */
export const exportToCSV = (data: TableData, filename: string): void => {
  const { headers, rows } = data;
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      // Handle strings that might contain commas by wrapping in quotes
      if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
        return `"${cell.replace(/"/g, '""')}"`;
      }
      return cell === null ? '' : String(cell);
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Exports data to PDF format and triggers download
 */
export const exportToPDF = (data: TableData, filename: string, title: string): void => {
  const { headers, rows } = data;
  
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 14, 30);
  
  // Create the table
  (doc as any).autoTable({
    head: [headers],
    body: rows,
    startY: 35,
    theme: 'grid',
    headStyles: { fillColor: [51, 51, 51], textColor: 255 },
    styles: { fontSize: 10 },
    columnStyles: { 
      // Adjust column styles as needed based on the data
      0: { cellWidth: 'auto' } 
    },
  });
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
};

/**
 * Helper to prepare payment data for export
 */
export const preparePaymentExport = (payments: any[]): TableData => {
  return {
    headers: ['Member ID', 'Member Name', 'Amount', 'Date', 'Method', 'Status', 'Reference'],
    rows: payments.map(payment => [
      payment.memberId,
      payment.memberName,
      payment.amount,
      formatDate(payment.date),
      payment.method.replace('_', ' '),
      payment.status,
      payment.reference || ''
    ])
  };
};

/**
 * Helper to prepare attendance data for export
 */
export const prepareAttendanceExport = (attendance: any[]): TableData => {
  return {
    headers: ['Member ID', 'Member Name', 'Check-in Time', 'Check-out Time', 'Duration'],
    rows: attendance.map(record => [
      record.memberId,
      record.memberName,
      format(new Date(record.checkInTime), 'PPP p'),
      record.checkOutTime ? format(new Date(record.checkOutTime), 'PPP p') : 'In Progress',
      record.duration
    ])
  };
};

/**
 * Helper to prepare member data for export
 */
export const prepareMembersExport = (members: any[]): TableData => {
  return {
    headers: ['Member ID', 'Name', 'Email', 'Phone', 'Join Date', 'Status'],
    rows: members.map(member => [
      member.id,
      member.name,
      member.email || '',
      member.phone,
      formatDate(member.joinDate),
      member.active ? 'Active' : 'Inactive'
    ])
  };
};

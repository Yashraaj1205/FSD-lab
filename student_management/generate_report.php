<?php
require_once 'config/db.php';
// Assuming the user will run composer install later. 
// For now, we point to the autoloader that WOULD exist.
require_once __DIR__ . '/../html2pdf/vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;

$roll_no = isset($_GET['roll_no']) ? $_GET['roll_no'] : '';

if (!$roll_no) {
    die("Roll No required.");
}

$stmt = $conn->prepare("SELECT * FROM students WHERE roll_no = ?");
$stmt->bind_param("s", $roll_no);
$stmt->execute();
$student = $stmt->get_result()->fetch_assoc();

if (!$student) {
    die("Student not found.");
}

try {
    // Premium PDF Template
    $content = "
    <style>
        .report-box { border: 2px solid #4f46e5; padding: 20px; font-family: Arial, sans-serif; }
        .header { text-align: center; color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; margin-bottom: 20px; }
        .info { margin-bottom: 10px; font-size: 14px; }
        .label { font-weight: bold; width: 150px; display: inline-block; color: #666; }
        .footer { margin-top: 50px; text-align: right; font-style: italic; color: #999; }
    </style>
    <page backtop='10mm' backbottom='10mm' backleft='15mm' backright='15mm'>
        <div class='report-box'>
            <div class='header'>
                <h1>STUDENT REGISTRATION RECORD</h1>
                <p>Academic Year 2025-2026</p>
            </div>
            
            <div class='info'><span class='label'>Roll Number:</span> " . htmlspecialchars($student['roll_no']) . "</div>
            <div class='info'><span class='label'>First Name:</span> " . htmlspecialchars($student['first_name']) . "</div>
            <div class='info'><span class='label'>Last Name:</span> " . htmlspecialchars($student['last_name']) . "</div>
            <div class='info'><span class='label'>Contact:</span> " . htmlspecialchars($student['contact_number']) . "</div>
            <div class='info'><span class='label'>Joined Date:</span> " . htmlspecialchars($student['created_at']) . "</div>

            <div class='footer'>
                <p>This is a computer-generated document.</p>
                <barcode type='EAN13' value='45" . str_pad($student['id'], 10, '0', STR_PAD_LEFT) . "' style='width: 30mm; height: 6mm;'></barcode>
            </div>
        </div>
    </page>";

    $html2pdf = new Html2Pdf('P', 'A4', 'en');
    $html2pdf->writeHTML($content);
    $html2pdf->output('Student_Report_' . $student['roll_no'] . '.pdf');

} catch (Html2PdfException $e) {
    echo "Error generating PDF: " . $e->getMessage();
}
?>

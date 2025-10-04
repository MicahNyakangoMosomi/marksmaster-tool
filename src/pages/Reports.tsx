import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2pdf from "html2pdf.js";

interface SubjectMark {
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  gender: string;
  average: number;
  grade: string;
  subjects: SubjectMark[];
}

interface ClassData {
  id: number;
  name: string;
  grade: string;
  students: Student[];
}

const classesData: ClassData[] = [
  {
    id: 1,
    name: "Class 9A",
    grade: "9",
    students: [
      { 
        id: 1, 
        name: "John Doe", 
        rollNumber: "2024001", 
        gender: "Male",
        average: 85, 
        grade: "A",
        subjects: [
          { subject: "Mathematics", marks: 88, maxMarks: 100, grade: "A" },
          { subject: "Science", marks: 82, maxMarks: 100, grade: "A" },
          { subject: "English", marks: 85, maxMarks: 100, grade: "A" },
          { subject: "History", marks: 90, maxMarks: 100, grade: "A+" },
          { subject: "Geography", marks: 80, maxMarks: 100, grade: "B+" },
        ]
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        rollNumber: "2024002", 
        gender: "Female",
        average: 92, 
        grade: "A+",
        subjects: [
          { subject: "Mathematics", marks: 95, maxMarks: 100, grade: "A+" },
          { subject: "Science", marks: 90, maxMarks: 100, grade: "A+" },
          { subject: "English", marks: 92, maxMarks: 100, grade: "A+" },
          { subject: "History", marks: 88, maxMarks: 100, grade: "A" },
          { subject: "Geography", marks: 95, maxMarks: 100, grade: "A+" },
        ]
      },
      { 
        id: 3, 
        name: "Mike Johnson", 
        rollNumber: "2024003", 
        gender: "Male",
        average: 78, 
        grade: "B+",
        subjects: [
          { subject: "Mathematics", marks: 75, maxMarks: 100, grade: "B+" },
          { subject: "Science", marks: 80, maxMarks: 100, grade: "A" },
          { subject: "English", marks: 78, maxMarks: 100, grade: "B+" },
          { subject: "History", marks: 82, maxMarks: 100, grade: "A" },
          { subject: "Geography", marks: 75, maxMarks: 100, grade: "B+" },
        ]
      },
    ],
  },
  {
    id: 2,
    name: "Class 10B",
    grade: "10",
    students: [
      { 
        id: 4, 
        name: "Sarah Williams", 
        rollNumber: "2024004", 
        gender: "Female",
        average: 88, 
        grade: "A",
        subjects: [
          { subject: "Mathematics", marks: 90, maxMarks: 100, grade: "A+" },
          { subject: "Science", marks: 85, maxMarks: 100, grade: "A" },
          { subject: "English", marks: 88, maxMarks: 100, grade: "A" },
          { subject: "History", marks: 92, maxMarks: 100, grade: "A+" },
          { subject: "Geography", marks: 85, maxMarks: 100, grade: "A" },
        ]
      },
      { 
        id: 5, 
        name: "Tom Brown", 
        rollNumber: "2024005", 
        gender: "Male",
        average: 95, 
        grade: "A+",
        subjects: [
          { subject: "Mathematics", marks: 98, maxMarks: 100, grade: "A+" },
          { subject: "Science", marks: 95, maxMarks: 100, grade: "A+" },
          { subject: "English", marks: 92, maxMarks: 100, grade: "A+" },
          { subject: "History", marks: 95, maxMarks: 100, grade: "A+" },
          { subject: "Geography", marks: 95, maxMarks: 100, grade: "A+" },
        ]
      },
      { 
        id: 6, 
        name: "Emily Davis", 
        rollNumber: "2024006", 
        gender: "Female",
        average: 82, 
        grade: "A",
        subjects: [
          { subject: "Mathematics", marks: 80, maxMarks: 100, grade: "A" },
          { subject: "Science", marks: 85, maxMarks: 100, grade: "A" },
          { subject: "English", marks: 82, maxMarks: 100, grade: "A" },
          { subject: "History", marks: 80, maxMarks: 100, grade: "A" },
          { subject: "Geography", marks: 83, maxMarks: 100, grade: "A" },
        ]
      },
    ],
  },
];

const Reports = () => {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [printAllMode, setPrintAllMode] = useState(false);

  const handleViewReport = (student: Student) => {
    setSelectedStudent(student);
  };

  const handlePrintStudent = () => {
    window.print();
  };

  const handleDownloadStudent = () => {
    if (!selectedStudent) return;
    
    const element = document.querySelector('.printable-report') as HTMLElement;
    if (!element) return;

    const opt = {
      margin: 10,
      filename: `${selectedStudent.name.replace(/\s+/g, "_")}_Report.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handlePrintAll = () => {
    setPrintAllMode(true);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDownloadAll = () => {
    if (!selectedClass) return;
    
    setPrintAllMode(true);
    
    setTimeout(() => {
      const element = document.querySelector('.printable-all-reports') as HTMLElement;
      if (!element) {
        setPrintAllMode(false);
        return;
      }

      const opt = {
        margin: 10,
        filename: `${selectedClass.name.replace(/\s+/g, "_")}_All_Reports.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        setPrintAllMode(false);
      });
    }, 500);
  };

  // Print All Mode View
  if (printAllMode && selectedClass) {
    return (
      <div>
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-all-reports, .printable-all-reports * {
              visibility: visible;
            }
            .printable-all-reports {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
            .page-break {
              page-break-after: always;
              break-after: page;
            }
            @page {
              size: A4;
              margin: 1cm;
            }
          }
        `}</style>
        
        <div className="container mx-auto px-4 py-6 no-print">
          <Button
            variant="ghost"
            onClick={() => setPrintAllMode(false)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Class
          </Button>
          <Button onClick={() => window.print()} className="mb-4 ml-4">
            <Printer className="mr-2 h-4 w-4" />
            Print All
          </Button>
        </div>

        <div className="printable-all-reports">
          {selectedClass.students.map((student, index) => {
            const chartData = student.subjects.map(subject => ({
              name: subject.subject,
              marks: subject.marks,
              maxMarks: subject.maxMarks,
            }));

            return (
              <div key={student.id} className={index < selectedClass.students.length - 1 ? "page-break" : ""}>
                <Card className="p-6 mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Student Report Card</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pb-4 border-b">
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-semibold text-sm">{student.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Roll Number</p>
                      <p className="font-semibold text-sm">{student.rollNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p className="font-semibold text-sm">{student.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Class</p>
                      <p className="font-semibold text-sm">{selectedClass.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Overall Average</p>
                      <p className="text-lg font-bold text-primary">{student.average}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Overall Grade</p>
                      <p className="text-lg font-bold text-primary">{student.grade}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Subject Performance</h3>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="py-2">Subject</TableHead>
                              <TableHead className="text-center py-2">Marks</TableHead>
                              <TableHead className="text-center py-2">Grade</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {student.subjects.map((subject, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="py-2 font-medium text-sm">{subject.subject}</TableCell>
                                <TableCell className="text-center py-2 text-sm">
                                  {subject.marks}/{subject.maxMarks}
                                </TableCell>
                                <TableCell className="text-center py-2">
                                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                                    {subject.grade}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Performance Graph</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: '12px' }} />
                          <Bar dataKey="marks" fill="hsl(var(--primary))" name="Marks" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (selectedStudent && selectedClass) {
    const chartData = selectedStudent.subjects.map(subject => ({
      name: subject.subject,
      marks: subject.marks,
      maxMarks: subject.maxMarks,
    }));

    return (
      <div className="container mx-auto px-4 py-6">
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-report, .printable-report * {
              visibility: visible;
            }
            .printable-report {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            .no-print {
              display: none !important;
            }
            @page {
              size: A4;
              margin: 1cm;
            }
          }
        `}</style>
        
        <div className="mb-4 no-print">
          <Button
            variant="ghost"
            onClick={() => setSelectedStudent(null)}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Button>
        </div>

        <Card className="p-6 printable-report">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-foreground">Student Report Card</h2>
            <div className="flex gap-2 no-print">
              <Button onClick={handlePrintStudent} size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button onClick={handleDownloadStudent} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          {/* Student Details - Compact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pb-4 border-b">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="font-semibold text-sm">{selectedStudent.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Roll Number</p>
              <p className="font-semibold text-sm">{selectedStudent.rollNumber}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gender</p>
              <p className="font-semibold text-sm">{selectedStudent.gender}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Class</p>
              <p className="font-semibold text-sm">{selectedClass.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Overall Average</p>
              <p className="text-lg font-bold text-primary">{selectedStudent.average}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Overall Grade</p>
              <p className="text-lg font-bold text-primary">{selectedStudent.grade}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Subject Performance Table */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Subject Performance</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="py-2">Subject</TableHead>
                      <TableHead className="text-center py-2">Marks</TableHead>
                      <TableHead className="text-center py-2">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell className="py-2 font-medium text-sm">{subject.subject}</TableCell>
                        <TableCell className="text-center py-2 text-sm">
                          {subject.marks}/{subject.maxMarks}
                        </TableCell>
                        <TableCell className="text-center py-2">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                            {subject.grade}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Performance Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Performance Graph</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="marks" fill="hsl(var(--primary))" name="Marks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (selectedClass) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedClass(null)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Button>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {selectedClass.name} - Student Reports
          </h2>
          <p className="text-muted-foreground">
            {selectedClass.students.length} students
          </p>
        </div>

        <Card className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClass.students.map((student) => (
                  <TableRow 
                    key={student.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleViewReport(student)}
                  >
                    <TableCell className="font-medium">
                      {student.rollNumber}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.average}%</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                        {student.grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewReport(student);
                        }}
                      >
                        View Report
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button onClick={handlePrintAll}>
              <Printer className="mr-2 h-4 w-4" />
              Print All Reports
            </Button>
            <Button onClick={handleDownloadAll}>
              <Download className="mr-2 h-4 w-4" />
              Download All Reports
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Student Reports</h2>
        <p className="text-muted-foreground">
          Select a class to view and generate student reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classesData.map((classData) => (
          <Card
            key={classData.id}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
            onClick={() => setSelectedClass(classData)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {classData.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Grade {classData.grade}
                </p>
                <p className="text-sm text-foreground">
                  {classData.students.length} Students
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;

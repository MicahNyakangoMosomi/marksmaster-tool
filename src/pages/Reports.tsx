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

  const handleViewReport = (student: Student) => {
    setSelectedStudent(student);
  };

  const handlePrintStudent = () => {
    window.print();
  };

  const handleDownloadStudent = () => {
    if (!selectedStudent) return;
    
    let reportContent = `
Student Report
==============
Name: ${selectedStudent.name}
Roll Number: ${selectedStudent.rollNumber}
Gender: ${selectedStudent.gender}
Class: ${selectedClass?.name}
Overall Average: ${selectedStudent.average}%
Overall Grade: ${selectedStudent.grade}

Subject-wise Performance:
------------------------
`;
    
    selectedStudent.subjects.forEach(subject => {
      reportContent += `
${subject.subject}: ${subject.marks}/${subject.maxMarks} - Grade: ${subject.grade}`;
    });

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedStudent.name.replace(/\s+/g, "_")}_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintAll = () => {
    window.print();
  };

  const handleDownloadAll = () => {
    if (!selectedClass) return;
    
    let allReports = `${selectedClass.name} - All Student Reports\n${"=".repeat(50)}\n\n`;
    
    selectedClass.students.forEach((student, index) => {
      allReports += `
Student ${index + 1}
--------------
Name: ${student.name}
Roll Number: ${student.rollNumber}
Average: ${student.average}%
Grade: ${student.grade}

`;
    });

    const blob = new Blob([allReports], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedClass.name.replace(/\s+/g, "_")}_All_Reports.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (selectedStudent && selectedClass) {
    const chartData = selectedStudent.subjects.map(subject => ({
      name: subject.subject,
      marks: subject.marks,
      maxMarks: subject.maxMarks,
    }));

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedStudent(null)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Button>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Student Report Card
          </h2>
        </div>

        <div className="space-y-6">
          {/* Student Details Card */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{selectedStudent.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Roll Number</p>
                <p className="font-semibold">{selectedStudent.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-semibold">{selectedStudent.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class</p>
                <p className="font-semibold">{selectedClass.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Overall Average</p>
                <p className="text-2xl font-bold text-primary">{selectedStudent.average}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-2xl font-bold text-primary">{selectedStudent.grade}</p>
              </div>
            </div>
          </Card>

          {/* Subject Performance Table */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Subject-wise Performance</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Marks Obtained</TableHead>
                    <TableHead className="text-center">Maximum Marks</TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudent.subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{subject.subject}</TableCell>
                      <TableCell className="text-center">{subject.marks}</TableCell>
                      <TableCell className="text-center">{subject.maxMarks}</TableCell>
                      <TableCell className="text-center">
                        {((subject.marks / subject.maxMarks) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                          {subject.grade}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Performance Chart */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Performance Graph</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" fill="hsl(var(--primary))" name="Marks Obtained" />
                <Bar dataKey="maxMarks" fill="hsl(var(--muted))" name="Maximum Marks" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button onClick={handlePrintStudent}>
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
            <Button onClick={handleDownloadStudent}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
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

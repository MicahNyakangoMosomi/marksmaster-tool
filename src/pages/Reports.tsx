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

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  average: number;
  grade: string;
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
      { id: 1, name: "John Doe", rollNumber: "2024001", average: 85, grade: "A" },
      { id: 2, name: "Jane Smith", rollNumber: "2024002", average: 92, grade: "A+" },
      { id: 3, name: "Mike Johnson", rollNumber: "2024003", average: 78, grade: "B+" },
    ],
  },
  {
    id: 2,
    name: "Class 10B",
    grade: "10",
    students: [
      { id: 4, name: "Sarah Williams", rollNumber: "2024004", average: 88, grade: "A" },
      { id: 5, name: "Tom Brown", rollNumber: "2024005", average: 95, grade: "A+" },
      { id: 6, name: "Emily Davis", rollNumber: "2024006", average: 82, grade: "A-" },
    ],
  },
];

const Reports = () => {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  const handlePrintStudent = (student: Student) => {
    window.print();
  };

  const handleDownloadStudent = (student: Student) => {
    const reportContent = `
Student Report
--------------
Name: ${student.name}
Roll Number: ${student.rollNumber}
Average: ${student.average}%
Grade: ${student.grade}
Class: ${selectedClass?.name}
    `;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${student.name.replace(/\s+/g, "_")}_Report.txt`;
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
                  <TableHead>Average</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClass.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.rollNumber}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.average}%</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                        {student.grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrintStudent(student)}
                        >
                          <Printer className="mr-1 h-3 w-3" />
                          Print
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadStudent(student)}
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
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

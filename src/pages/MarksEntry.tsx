import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
}

interface ClassData {
  id: number;
  name: string;
  grade: string;
  studentCount: number;
  subjects: string[];
  students: Student[];
}

interface ExamDetails {
  year: string;
  term: string;
  examType: string;
}

interface StudentMarks {
  [subjectName: string]: string;
}

const classesData: ClassData[] = [
  {
    id: 1,
    name: "Class 9A",
    grade: "9",
    studentCount: 2,
    subjects: ["Mathematics", "English", "Science", "History", "Geography"],
    students: [
      { id: 1, name: "John Doe", rollNumber: "2024001" },
      { id: 2, name: "Jane Smith", rollNumber: "2024002" },
    ],
  },
  {
    id: 2,
    name: "Class 10B",
    grade: "10",
    studentCount: 2,
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
    students: [
      { id: 3, name: "Mike Johnson", rollNumber: "2024003" },
      { id: 4, name: "Sarah Williams", rollNumber: "2024004" },
    ],
  },
];

const MarksEntry = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [showExamDialog, setShowExamDialog] = useState(false);
  const [examDetails, setExamDetails] = useState<ExamDetails | null>(null);
  const [tempExamDetails, setTempExamDetails] = useState<ExamDetails>({
    year: "",
    term: "",
    examType: "",
  });

  // Initialize marks state
  const [marks, setMarks] = useState<Record<number, StudentMarks>>({});

  const handleClassClick = (classData: ClassData) => {
    setSelectedClass(classData);
    setShowExamDialog(true);
    setTempExamDetails({ year: "", term: "", examType: "" });
  };

  const handleExamDetailsSubmit = () => {
    if (!tempExamDetails.year || !tempExamDetails.term || !tempExamDetails.examType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all exam details.",
        variant: "destructive",
      });
      return;
    }

    setExamDetails(tempExamDetails);
    setShowExamDialog(false);

    // Initialize marks for the selected class
    if (selectedClass) {
      const initialMarks: Record<number, StudentMarks> = {};
      selectedClass.students.forEach((student) => {
        initialMarks[student.id] = {};
        selectedClass.subjects.forEach((subject) => {
          initialMarks[student.id][subject] = "";
        });
      });
      setMarks(initialMarks);
    }

    toast({
      title: "Exam Details Set",
      description: "You can now enter marks for students.",
    });
  };

  const handleMarkChange = (studentId: number, subject: string, value: string) => {
    setMarks({
      ...marks,
      [studentId]: {
        ...marks[studentId],
        [subject]: value,
      },
    });
  };

  const handleSaveMarks = () => {
    toast({
      title: "Marks Saved",
      description: `Marks for ${selectedClass?.name} (${examDetails?.term} - ${examDetails?.examType}) have been saved successfully.`,
    });
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setExamDetails(null);
    setMarks({});
  };

  // View: Marks entry table (after class and exam details are selected)
  if (selectedClass && examDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToClasses}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Marks Entry - {selectedClass.name}
              </h2>
              <p className="text-muted-foreground">
                Year: {examDetails.year} • Term: {examDetails.term} • Exam: {examDetails.examType}
              </p>
            </div>
            <Button onClick={handleSaveMarks} size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save All Marks
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px] sticky left-0 bg-background z-10">
                      Roll No.
                    </TableHead>
                    <TableHead className="w-[200px] sticky left-[120px] bg-background z-10">
                      Student Name
                    </TableHead>
                    {selectedClass.subjects.map((subject) => (
                      <TableHead key={subject} className="text-center min-w-[120px]">
                        {subject}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedClass.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium sticky left-0 bg-background">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell className="sticky left-[120px] bg-background">
                        {student.name}
                      </TableCell>
                      {selectedClass.subjects.map((subject) => (
                        <TableCell key={`${student.id}-${subject}`} className="p-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0-100"
                            value={marks[student.id]?.[subject] || ""}
                            onChange={(e) =>
                              handleMarkChange(student.id, subject, e.target.value)
                            }
                            className="w-full text-center"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {selectedClass.students.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No students in this class.
            </div>
          )}
        </Card>
      </div>
    );
  }

  // View: Class selection
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Marks Entry</h2>
        <p className="text-muted-foreground">
          Select a class to enter student marks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classesData.map((classData) => (
          <Card
            key={classData.id}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
            onClick={() => handleClassClick(classData)}
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
                  {classData.studentCount} Students
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {classData.subjects.length} Subjects
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      {/* Exam Details Dialog */}
      <Dialog open={showExamDialog} onOpenChange={setShowExamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Exam Details</DialogTitle>
            <DialogDescription>
              Please provide the exam details for {selectedClass?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="year">Academic Year</Label>
              <Input
                id="year"
                placeholder="e.g., 2024-2025"
                value={tempExamDetails.year}
                onChange={(e) =>
                  setTempExamDetails({ ...tempExamDetails, year: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="term">Term</Label>
              <Select
                value={tempExamDetails.term}
                onValueChange={(value) =>
                  setTempExamDetails({ ...tempExamDetails, term: value })
                }
              >
                <SelectTrigger id="term">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="term1">Term 1</SelectItem>
                  <SelectItem value="term2">Term 2</SelectItem>
                  <SelectItem value="term3">Term 3</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="examType">Exam Type</Label>
              <Select
                value={tempExamDetails.examType}
                onValueChange={(value) =>
                  setTempExamDetails({ ...tempExamDetails, examType: value })
                }
              >
                <SelectTrigger id="examType">
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit-test">Unit Test</SelectItem>
                  <SelectItem value="midterm">Mid-Term Exam</SelectItem>
                  <SelectItem value="final">Final Exam</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowExamDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExamDetailsSubmit}>
              Continue to Marks Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarksEntry;

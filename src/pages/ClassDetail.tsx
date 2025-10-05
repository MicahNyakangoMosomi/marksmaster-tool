import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Users, BookOpen, FileBarChart, Trash2 } from "lucide-react";
import { AddStudentToClassDialog } from "@/components/AddStudentToClassDialog";
import { AddSubjectToClassDialog } from "@/components/AddSubjectToClassDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const initialClassesData: ClassData[] = [
  {
    id: 1,
    name: "Class 9A",
    grade: "9",
    studentCount: 2,
    subjects: ["Mathematics", "English", "Science"],
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
    subjects: ["Mathematics", "Physics", "Chemistry"],
    students: [
      { id: 3, name: "Mike Johnson", rollNumber: "2024003" },
      { id: 4, name: "Sarah Williams", rollNumber: "2024004" },
    ],
  },
];

const ClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<ClassData | undefined>(
    initialClassesData.find((c) => c.id === Number(classId))
  );
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [showExamDetailsDialog, setShowExamDetailsDialog] = useState(false);
  const [showReportView, setShowReportView] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);
  const [deleteSubject, setDeleteSubject] = useState<string | null>(null);
  const [examDetails, setExamDetails] = useState({
    year: "",
    term: "",
    examType: "",
  });

  // Mock performance data (in real app, this would come from marks entry)
  const getStudentPerformance = () => {
    if (!classData) return [];
    
    return classData.students.map((student) => ({
      ...student,
      marks: classData.subjects.reduce((acc, subject) => {
        acc[subject] = Math.floor(Math.random() * 30) + 70; // Mock marks 70-100
        return acc;
      }, {} as Record<string, number>),
    }));
  };

  const calculateSubjectAverage = (subject: string) => {
    const performance = getStudentPerformance();
    const total = performance.reduce((sum, student) => sum + student.marks[subject], 0);
    return (total / performance.length).toFixed(2);
  };

  const handleViewReport = () => {
    setShowExamDetailsDialog(true);
  };

  const handleExamDetailsSubmit = () => {
    if (!examDetails.year || !examDetails.term || !examDetails.examType) {
      return;
    }
    setShowReportView(true);
    setShowExamDetailsDialog(false);
  };

  if (!classData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Class not found</h2>
          <Button onClick={() => navigate("/class")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Button>
        </div>
      </div>
    );
  }

  const handleAddStudent = (studentData: { name: string; rollNumber: string }) => {
    const newStudent: Student = {
      id: classData.students.length + 1,
      name: studentData.name,
      rollNumber: studentData.rollNumber,
    };
    setClassData({
      ...classData,
      students: [...classData.students, newStudent],
      studentCount: classData.studentCount + 1,
    });
  };

  const handleAddSubject = (subject: string) => {
    if (!classData) return;
    
    setClassData({
      ...classData,
      subjects: [...classData.subjects, subject],
    });
  };

  const handleDeleteStudent = () => {
    if (!classData || !deleteStudentId) return;
    
    setClassData({
      ...classData,
      students: classData.students.filter((s) => s.id !== deleteStudentId),
      studentCount: classData.studentCount - 1,
    });
    toast.success("Student removed from class");
    setDeleteStudentId(null);
  };

  const handleDeleteSubject = () => {
    if (!classData || !deleteSubject) return;
    
    setClassData({
      ...classData,
      subjects: classData.subjects.filter((s) => s !== deleteSubject),
    });
    toast.success("Subject removed from class");
    setDeleteSubject(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/class")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classes
        </Button>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {classData.name}
        </h2>
        <p className="text-muted-foreground">
          Grade {classData.grade} • {classData.studentCount} Students
        </p>
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full max-w-[600px] grid-cols-3">
          <TabsTrigger value="students">
            <Users className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="subjects">
            <BookOpen className="mr-2 h-4 w-4" />
            Subjects
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileBarChart className="mr-2 h-4 w-4" />
            Report View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                Class Students
              </h3>
              <Button onClick={() => setIsAddStudentOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classData.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleteStudentId(student.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                Class Subjects
              </h3>
              <Button onClick={() => setIsAddSubjectOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classData.subjects.map((subject) => (
                <Card key={subject} className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">
                        {subject}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteSubject(subject)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          <Card className="p-6">
            {!showReportView ? (
              <div className="text-center py-12">
                <FileBarChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Class Performance Report
                </h3>
                <p className="text-muted-foreground mb-6">
                  View detailed performance analytics for all students
                </p>
                <Button onClick={handleViewReport}>
                  Generate Report
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Class Performance Report
                  </h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Year: {examDetails.year}</span>
                    <span>•</span>
                    <span>Term: {examDetails.term}</span>
                    <span>•</span>
                    <span>Exam: {examDetails.examType}</span>
                  </div>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Roll No.</TableHead>
                        <TableHead className="font-semibold">Student Name</TableHead>
                        {classData.subjects.map((subject) => (
                          <TableHead key={subject} className="font-semibold text-center">
                            {subject}
                          </TableHead>
                        ))}
                        <TableHead className="font-semibold text-center">Total</TableHead>
                        <TableHead className="font-semibold text-center">Average</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getStudentPerformance().map((student) => {
                        const total = Object.values(student.marks).reduce((a, b) => a + b, 0);
                        const average = (total / classData.subjects.length).toFixed(2);
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              {student.rollNumber}
                            </TableCell>
                            <TableCell>{student.name}</TableCell>
                            {classData.subjects.map((subject) => (
                              <TableCell key={subject} className="text-center">
                                {student.marks[subject]}
                              </TableCell>
                            ))}
                            <TableCell className="text-center font-medium">
                              {total}
                            </TableCell>
                            <TableCell className="text-center font-medium">
                              {average}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-muted/50 font-semibold">
                        <TableCell colSpan={2}>Subject Average</TableCell>
                        {classData.subjects.map((subject) => (
                          <TableCell key={subject} className="text-center">
                            {calculateSubjectAverage(subject)}
                          </TableCell>
                        ))}
                        <TableCell colSpan={2}></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowReportView(false);
                      setExamDetails({ year: "", term: "", examType: "" });
                    }}
                  >
                    Generate New Report
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

      </Tabs>

      <Dialog open={showExamDetailsDialog} onOpenChange={setShowExamDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Exam Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="year">Academic Year</Label>
              <Input
                id="year"
                placeholder="e.g., 2024-2025"
                value={examDetails.year}
                onChange={(e) =>
                  setExamDetails({ ...examDetails, year: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Select
                value={examDetails.term}
                onValueChange={(value) =>
                  setExamDetails({ ...examDetails, term: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                  <SelectItem value="Term 3">Term 3</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select
                value={examDetails.examType}
                onValueChange={(value) =>
                  setExamDetails({ ...examDetails, examType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unit Test">Unit Test</SelectItem>
                  <SelectItem value="Mid-Term">Mid-Term Exam</SelectItem>
                  <SelectItem value="Final">Final Exam</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                  <SelectItem value="Practical">Practical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleExamDetailsSubmit}
              disabled={!examDetails.year || !examDetails.term || !examDetails.examType}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddStudentToClassDialog
        open={isAddStudentOpen}
        onOpenChange={setIsAddStudentOpen}
        classData={{ id: classData.id, name: classData.name }}
        onAddStudent={handleAddStudent}
      />

      <AddSubjectToClassDialog
        open={isAddSubjectOpen}
        onOpenChange={setIsAddSubjectOpen}
        classData={{
          id: classData.id,
          name: classData.name,
          subjects: classData.subjects,
        }}
        onAddSubject={handleAddSubject}
      />

      <AlertDialog open={deleteStudentId !== null} onOpenChange={() => setDeleteStudentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this student from the class? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteStudent} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteSubject !== null} onOpenChange={() => setDeleteSubject(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Subject</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this subject from the class? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSubject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClassDetail;

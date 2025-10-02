import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Users, BookOpen, FileText, Save } from "lucide-react";
import { AddStudentToClassDialog } from "@/components/AddStudentToClassDialog";
import { AddSubjectToClassDialog } from "@/components/AddSubjectToClassDialog";
import { useToast } from "@/hooks/use-toast";
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

interface Student {
  id: number;
  name: string;
  rollNumber: string;
}

interface StudentMarks {
  [subjectName: string]: string;
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
  const { toast } = useToast();
  const [classData, setClassData] = useState<ClassData | undefined>(
    initialClassesData.find((c) => c.id === Number(classId))
  );
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  
  // Initialize marks state with empty values for each student and subject
  const [marks, setMarks] = useState<Record<number, StudentMarks>>(() => {
    const initialMarks: Record<number, StudentMarks> = {};
    classData?.students.forEach((student) => {
      initialMarks[student.id] = {};
      classData.subjects.forEach((subject) => {
        initialMarks[student.id][subject] = "";
      });
    });
    return initialMarks;
  });

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
    
    // Add subject to class data
    const updatedClassData = {
      ...classData,
      subjects: [...classData.subjects, subject],
    };
    setClassData(updatedClassData);
    
    // Initialize marks for the new subject for all students
    const updatedMarks = { ...marks };
    classData.students.forEach((student) => {
      updatedMarks[student.id] = {
        ...updatedMarks[student.id],
        [subject]: "",
      };
    });
    setMarks(updatedMarks);
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
      description: "Student marks have been saved successfully.",
    });
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
          <TabsTrigger value="marks">
            <FileText className="mr-2 h-4 w-4" />
            Marks Entry
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classData.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
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
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">
                      {subject}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="marks">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                Enter Student Marks
              </h3>
              <Button onClick={handleSaveMarks}>
                <Save className="mr-2 h-4 w-4" />
                Save All Marks
              </Button>
            </div>

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
                      {classData.subjects.map((subject) => (
                        <TableHead key={subject} className="text-center min-w-[120px]">
                          {subject}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classData.students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium sticky left-0 bg-background">
                          {student.rollNumber}
                        </TableCell>
                        <TableCell className="sticky left-[120px] bg-background">
                          {student.name}
                        </TableCell>
                        {classData.subjects.map((subject) => (
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

            {classData.students.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No students in this class. Add students to enter marks.
              </div>
            )}
            
            {classData.subjects.length === 0 && classData.students.length > 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No subjects added. Add subjects to enter marks.
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

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
    </div>
  );
};

export default ClassDetail;

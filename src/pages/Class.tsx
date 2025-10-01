import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, BookOpen } from "lucide-react";
import { AddClassDialog } from "@/components/AddClassDialog";
import { AddStudentToClassDialog } from "@/components/AddStudentToClassDialog";
import { AddSubjectToClassDialog } from "@/components/AddSubjectToClassDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClassData {
  id: number;
  name: string;
  grade: string;
  studentCount: number;
  subjects: string[];
}

const initialClasses: ClassData[] = [
  { id: 1, name: "Class 9A", grade: "9", studentCount: 28, subjects: ["Mathematics", "English", "Science"] },
  { id: 2, name: "Class 10B", grade: "10", studentCount: 25, subjects: ["Mathematics", "Physics", "Chemistry"] },
];

const Class = () => {
  const [classes, setClasses] = useState<ClassData[]>(initialClasses);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  const handleAddClass = (newClass: Omit<ClassData, "id">) => {
    setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
  };

  const handleAddStudent = () => {
    if (selectedClass) {
      setClasses(classes.map(c => 
        c.id === selectedClass.id 
          ? { ...c, studentCount: c.studentCount + 1 }
          : c
      ));
    }
  };

  const handleAddSubject = (subject: string) => {
    if (selectedClass) {
      setClasses(classes.map(c => 
        c.id === selectedClass.id 
          ? { ...c, subjects: [...c.subjects, subject] }
          : c
      ));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Class Management</h2>
        <p className="text-muted-foreground">Manage classes, students, and subjects.</p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-foreground">All Classes</h3>
          <Button onClick={() => setIsAddClassOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classData) => (
                <TableRow key={classData.id}>
                  <TableCell className="font-medium">{classData.name}</TableCell>
                  <TableCell>{classData.grade}</TableCell>
                  <TableCell>{classData.studentCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {classData.subjects.slice(0, 2).map((subject) => (
                        <span key={subject} className="text-xs bg-secondary px-2 py-1 rounded">
                          {subject}
                        </span>
                      ))}
                      {classData.subjects.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{classData.subjects.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedClass(classData);
                          setIsAddStudentOpen(true);
                        }}
                      >
                        <Users className="mr-1 h-3 w-3" />
                        Add Student
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedClass(classData);
                          setIsAddSubjectOpen(true);
                        }}
                      >
                        <BookOpen className="mr-1 h-3 w-3" />
                        Add Subject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AddClassDialog 
        open={isAddClassOpen}
        onOpenChange={setIsAddClassOpen}
        onAddClass={handleAddClass}
      />

      <AddStudentToClassDialog
        open={isAddStudentOpen}
        onOpenChange={setIsAddStudentOpen}
        classData={selectedClass}
        onAddStudent={handleAddStudent}
      />

      <AddSubjectToClassDialog
        open={isAddSubjectOpen}
        onOpenChange={setIsAddSubjectOpen}
        classData={selectedClass}
        onAddSubject={handleAddSubject}
      />
    </div>
  );
};

export default Class;

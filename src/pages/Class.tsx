import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, BookOpen, ChevronRight } from "lucide-react";
import { AddClassDialog } from "@/components/AddClassDialog";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleAddClass = (newClass: Omit<ClassData, "id">) => {
    setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
  };

  const handleClassClick = (classId: number) => {
    navigate(`/class/${classId}`);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classData) => (
            <Card
              key={classData.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
              onClick={() => handleClassClick(classData.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-1">
                    {classData.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">Grade {classData.grade}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">
                    {classData.studentCount} Students
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    {classData.subjects.slice(0, 3).map((subject) => (
                      <span
                        key={subject}
                        className="text-xs bg-secondary px-2 py-1 rounded"
                      >
                        {subject}
                      </span>
                    ))}
                    {classData.subjects.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{classData.subjects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <AddClassDialog 
        open={isAddClassOpen}
        onOpenChange={setIsAddClassOpen}
        onAddClass={handleAddClass}
      />
    </div>
  );
};

export default Class;

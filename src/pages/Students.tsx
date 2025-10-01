import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddStudentDialog } from "@/components/AddStudentDialog";

// Mock data
const mockStudents = [
  { id: 1, name: "John Smith", grade: "10A", rollNumber: "2024001", averageScore: 85 },
  { id: 2, name: "Emma Johnson", grade: "10A", rollNumber: "2024002", averageScore: 92 },
  { id: 3, name: "Michael Brown", grade: "10B", rollNumber: "2024003", averageScore: 78 },
  { id: 4, name: "Sarah Davis", grade: "11A", rollNumber: "2024004", averageScore: 88 },
  { id: 5, name: "James Wilson", grade: "11A", rollNumber: "2024005", averageScore: 91 },
  { id: 6, name: "Emily Taylor", grade: "9A", rollNumber: "2024006", averageScore: 86 },
  { id: 7, name: "Daniel Martinez", grade: "9B", rollNumber: "2024007", averageScore: 82 },
  { id: 8, name: "Olivia Anderson", grade: "10A", rollNumber: "2024008", averageScore: 95 },
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.includes(searchQuery) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = (newStudent: any) => {
    setStudents([...students, { id: students.length + 1, ...newStudent }]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">School Management</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/students">Students</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/marks">Enter Marks</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Student Management</h2>
          <p className="text-muted-foreground">View and manage all student records.</p>
        </div>

        <Card className="p-6">
          {/* Search and Add */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, roll number, or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>

          {/* Students Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${student.averageScore >= 80 ? 'text-accent' : 'text-muted-foreground'}`}>
                        {student.averageScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/marks?student=${student.id}`}>Enter Marks</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>

      <AddStudentDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onAddStudent={handleAddStudent}
      />
    </div>
  );
};

export default Students;

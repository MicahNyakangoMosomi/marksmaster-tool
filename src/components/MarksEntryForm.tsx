import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  rollNumber?: string;
}

interface MarksEntryFormProps {
  students?: Student[];
  subjects?: string[];
  onSubmit?: (data: any) => void;
}

const defaultSubjects = [
  "Mathematics",
  "English",
  "Science",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Physical Education",
];

const defaultStudents = [
  { id: 1, name: "John Smith", grade: "10A" },
  { id: 2, name: "Emma Johnson", grade: "10A" },
  { id: 3, name: "Michael Brown", grade: "10B" },
  { id: 4, name: "Sarah Davis", grade: "11A" },
  { id: 5, name: "James Wilson", grade: "11A" },
  { id: 6, name: "Emily Taylor", grade: "9A" },
  { id: 7, name: "Daniel Martinez", grade: "9B" },
  { id: 8, name: "Olivia Anderson", grade: "10A" },
];

export const MarksEntryForm = ({ 
  students = defaultStudents, 
  subjects = defaultSubjects,
  onSubmit = () => {} 
}: MarksEntryFormProps) => {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    subject: "",
    testType: "",
    marks: "",
    maxMarks: "100",
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      studentId: "",
      studentName: "",
      subject: "",
      testType: "",
      marks: "",
      maxMarks: "100",
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleStudentChange = (studentId: string) => {
    const student = students.find(s => s.id.toString() === studentId);
    setFormData({
      ...formData,
      studentId,
      studentName: student?.name || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="student">Select Student</Label>
          <Select value={formData.studentId} onValueChange={handleStudentChange}>
            <SelectTrigger id="student">
              <SelectValue placeholder="Choose a student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select
            value={formData.subject}
            onValueChange={(value) => setFormData({ ...formData, subject: value })}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="testType">Test Type</Label>
          <Select
            value={formData.testType}
            onValueChange={(value) => setFormData({ ...formData, testType: value })}
          >
            <SelectTrigger id="testType">
              <SelectValue placeholder="Select test type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="midterm">Midterm Exam</SelectItem>
              <SelectItem value="final">Final Exam</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="project">Project</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="marks">Marks Obtained</Label>
            <Input
              id="marks"
              type="number"
              min="0"
              max={formData.maxMarks}
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
              placeholder="0"
              required
            />
          </div>
          <div>
            <Label htmlFor="maxMarks">Maximum Marks</Label>
            <Input
              id="maxMarks"
              type="number"
              min="1"
              value={formData.maxMarks}
              onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Marks
      </Button>
    </form>
  );
};

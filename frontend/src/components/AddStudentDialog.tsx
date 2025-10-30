import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStudent: (student: any) => void;
}

export const AddStudentDialog = ({ open, onOpenChange, onAddStudent }: AddStudentDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    rollNumber: "",
    grade: "",
    averageScore: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent(formData);
    setFormData({ name: "", gender: "", rollNumber: "", grade: "", averageScore: 0 });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter student name"
              required
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              placeholder="e.g., 2024009"
              required
            />
          </div>
          <div>
            <Label htmlFor="grade">Grade</Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => setFormData({ ...formData, grade: value })}
            >
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9A">9A</SelectItem>
                <SelectItem value="9B">9B</SelectItem>
                <SelectItem value="10A">10A</SelectItem>
                <SelectItem value="10B">10B</SelectItem>
                <SelectItem value="11A">11A</SelectItem>
                <SelectItem value="11B">11B</SelectItem>
                <SelectItem value="12A">12A</SelectItem>
                <SelectItem value="12B">12B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Add Student</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

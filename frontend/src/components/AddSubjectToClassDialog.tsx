import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddSubjectToClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: { id: number; name: string; subjects: string[] } | null;
  onAddSubject: (subject: string) => void;
}

const availableSubjects = [
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
  "Art",
  "Music",
];

export const AddSubjectToClassDialog = ({ 
  open, 
  onOpenChange, 
  classData,
  onAddSubject 
}: AddSubjectToClassDialogProps) => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubject) {
      onAddSubject(selectedSubject);
      setSelectedSubject("");
      onOpenChange(false);
    }
  };

  const filteredSubjects = availableSubjects.filter(
    subject => !classData?.subjects.includes(subject)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subject to {classData?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject">Select Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                {filteredSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Add Subject</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

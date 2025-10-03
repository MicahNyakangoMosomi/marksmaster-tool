import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GradeRule {
  id: number;
  grade: string;
  minMarks: number;
  maxMarks: number;
  remarks: string;
}

const Grading = () => {
  const { toast } = useToast();
  
  const [gradeRules, setGradeRules] = useState<GradeRule[]>([
    { id: 1, grade: "A+", minMarks: 90, maxMarks: 100, remarks: "Excellent" },
    { id: 2, grade: "A", minMarks: 80, maxMarks: 89, remarks: "Very Good" },
    { id: 3, grade: "B+", minMarks: 70, maxMarks: 79, remarks: "Good" },
    { id: 4, grade: "B", minMarks: 60, maxMarks: 69, remarks: "Above Average" },
    { id: 5, grade: "C", minMarks: 50, maxMarks: 59, remarks: "Average" },
    { id: 6, grade: "D", minMarks: 40, maxMarks: 49, remarks: "Below Average" },
    { id: 7, grade: "F", minMarks: 0, maxMarks: 39, remarks: "Fail" },
  ]);

  const [newRule, setNewRule] = useState({
    grade: "",
    minMarks: "",
    maxMarks: "",
    remarks: "",
  });

  const handleAddRule = () => {
    if (!newRule.grade || !newRule.minMarks || !newRule.maxMarks) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const rule: GradeRule = {
      id: Date.now(),
      grade: newRule.grade,
      minMarks: parseInt(newRule.minMarks),
      maxMarks: parseInt(newRule.maxMarks),
      remarks: newRule.remarks,
    };

    setGradeRules([...gradeRules, rule]);
    setNewRule({ grade: "", minMarks: "", maxMarks: "", remarks: "" });
    
    toast({
      title: "Rule Added",
      description: "New grading rule has been added successfully.",
    });
  };

  const handleDeleteRule = (id: number) => {
    setGradeRules(gradeRules.filter(rule => rule.id !== id));
    toast({
      title: "Rule Deleted",
      description: "Grading rule has been removed.",
    });
  };

  const handleSaveGradingSystem = () => {
    toast({
      title: "Grading System Saved",
      description: "Your grading criteria has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Grading System</h2>
        <p className="text-muted-foreground">Define your school's grading criteria out of 100 marks.</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Current Grading Rules</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade</TableHead>
                <TableHead>Min Marks</TableHead>
                <TableHead>Max Marks</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.grade}</TableCell>
                  <TableCell>{rule.minMarks}</TableCell>
                  <TableCell>{rule.maxMarks}</TableCell>
                  <TableCell>{rule.remarks}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Grading Rule</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                placeholder="e.g., A+"
                value={newRule.grade}
                onChange={(e) => setNewRule({ ...newRule, grade: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="minMarks">Min Marks</Label>
              <Input
                id="minMarks"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={newRule.minMarks}
                onChange={(e) => setNewRule({ ...newRule, minMarks: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="maxMarks">Max Marks</Label>
              <Input
                id="maxMarks"
                type="number"
                min="0"
                max="100"
                placeholder="100"
                value={newRule.maxMarks}
                onChange={(e) => setNewRule({ ...newRule, maxMarks: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                placeholder="e.g., Excellent"
                value={newRule.remarks}
                onChange={(e) => setNewRule({ ...newRule, remarks: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleAddRule} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveGradingSystem} size="lg">
            Save Grading System
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Grading;

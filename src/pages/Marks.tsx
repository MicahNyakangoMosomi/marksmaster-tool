import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { MarksEntryForm } from "@/components/MarksEntryForm";
import { useToast } from "@/hooks/use-toast";

const Marks = () => {
  const { toast } = useToast();

  const handleSubmitMarks = (data: any) => {
    console.log("Marks submitted:", data);
    toast({
      title: "Marks Saved Successfully",
      description: `Marks for ${data.studentName} in ${data.subject} have been recorded.`,
    });
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Enter Student Marks</h2>
          <p className="text-muted-foreground">Record assessment scores for your students.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <MarksEntryForm onSubmit={handleSubmitMarks} />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Marks;

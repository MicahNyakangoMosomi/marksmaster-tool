import { Card } from "@/components/ui/card";
import { MarksEntryForm } from "@/components/MarksEntryForm";
import { useToast } from "@/hooks/use-toast";

const Grading = () => {
  const { toast } = useToast();

  const handleSubmitMarks = (data: any) => {
    console.log("Marks submitted:", data);
    toast({
      title: "Marks Saved Successfully",
      description: `Marks for ${data.studentName} in ${data.subject} have been recorded.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Grading</h2>
        <p className="text-muted-foreground">Enter and manage student grades.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <MarksEntryForm onSubmit={handleSubmitMarks} />
        </Card>
      </div>
    </div>
  );
};

export default Grading;

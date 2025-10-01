import { Card } from "@/components/ui/card";
import { FileText, TrendingUp, Users } from "lucide-react";

const Reports = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Reports</h2>
        <p className="text-muted-foreground">View and generate academic reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Student Performance</h3>
              <p className="text-sm text-muted-foreground">Individual student reports and progress tracking</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Class Analytics</h3>
              <p className="text-sm text-muted-foreground">Class-wise performance and statistics</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Subject Reports</h3>
              <p className="text-sm text-muted-foreground">Subject-wise performance analysis</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;

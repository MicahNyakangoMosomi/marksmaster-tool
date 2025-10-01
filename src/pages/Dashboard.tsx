import { Card } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "156",
      icon: Users,
      description: "Active students",
      color: "text-primary",
    },
    {
      title: "School Mean",
      value: "78.5%",
      icon: TrendingUp,
      description: "All students average",
      color: "text-accent",
    },
    {
      title: "Total Classes",
      value: "8",
      icon: Award,
      description: "Active classes",
      color: "text-primary",
    },
    {
      title: "Subjects",
      value: "12",
      icon: BookOpen,
      description: "Being taught",
      color: "text-accent",
    },
  ];

  const subjectMeans = [
    { subject: "Mathematics", mean: 82, totalStudents: 156 },
    { subject: "English", mean: 78, totalStudents: 156 },
    { subject: "Science", mean: 75, totalStudents: 156 },
    { subject: "History", mean: 81, totalStudents: 156 },
    { subject: "Geography", mean: 76, totalStudents: 156 },
    { subject: "Physics", mean: 79, totalStudents: 98 },
    { subject: "Chemistry", mean: 77, totalStudents: 98 },
    { subject: "Biology", mean: 80, totalStudents: 98 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Teacher!</h2>
        <p className="text-muted-foreground">Here's an overview of your school performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Subject Performance */}
      <Card className="p-6 mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-6">Subject-wise Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectMeans.map((item) => (
            <div key={item.subject} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{item.subject}</h4>
                <span className={`text-lg font-bold ${item.mean >= 80 ? 'text-accent' : 'text-muted-foreground'}`}>
                  {item.mean}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5 mb-2">
                <div 
                  className={`h-2.5 rounded-full ${item.mean >= 80 ? 'bg-accent' : 'bg-primary'}`}
                  style={{ width: `${item.mean}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">{item.totalStudents} students</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <p className="text-muted-foreground">Mathematics marks updated for Grade 10A</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="h-2 w-2 rounded-full bg-accent"></div>
            <p className="text-muted-foreground">New student added to Grade 9B</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <p className="text-muted-foreground">English marks updated for Grade 11C</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

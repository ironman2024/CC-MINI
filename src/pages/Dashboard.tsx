import React from 'react';
import { useData } from '../contexts/DataContext';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Users, BookOpen, GraduationCap, Award, UserCheck, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { data } = useData();
  
  // Calculate statistics
  const activeStudents = data.students.filter(s => s.status === 'Active').length;
  const activeCourses = data.courses.filter(c => c.status === 'Active').length;
  const activeProfessors = data.professors.filter(p => p.status === 'Active').length;
  const totalEnrollments = data.enrollments.length;
  const averageMark = data.marks.length > 0 
    ? Math.round(data.marks.reduce((sum, mark) => sum + mark.marks, 0) / data.marks.length) 
    : 0;
  
  // Get recent enrollments
  const recentEnrollments = [...data.enrollments]
    .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
    .slice(0, 5);
  
  // Get recent marks
  const recentMarks = [...data.marks]
    .sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())
    .slice(0, 5);
  
  const stats = [
    { title: 'Active Students', value: activeStudents, icon: <Users size={24} className="text-blue-500" />, color: 'bg-blue-50', link: '/students' },
    { title: 'Active Courses', value: activeCourses, icon: <BookOpen size={24} className="text-green-500" />, color: 'bg-green-50', link: '/courses' },
    { title: 'Professors', value: activeProfessors, icon: <GraduationCap size={24} className="text-purple-500" />, color: 'bg-purple-50', link: '/professors' },
    { title: 'Total Enrollments', value: totalEnrollments, icon: <UserCheck size={24} className="text-orange-500" />, color: 'bg-orange-50', link: '/enrollments' },
    { title: 'Average Mark', value: `${averageMark}/100`, icon: <Award size={24} className="text-red-500" />, color: 'bg-red-50', link: '/marks' },
    { title: 'Teaching Assignments', value: data.assignments.length, icon: <BookmarkCheck size={24} className="text-teal-500" />, color: 'bg-teal-50', link: '/professors' }
  ];
  
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        subtitle={`Welcome back, ${data.currentUser.name}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Enrollments">
          {recentEnrollments.length > 0 ? (
            <div className="divide-y">
              {recentEnrollments.map(enrollment => {
                const student = data.students.find(s => s.id === enrollment.studentId);
                const course = data.courses.find(c => c.id === enrollment.courseId);
                
                return (
                  <div key={enrollment.id} className="py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">
                        {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {course ? course.name : 'Unknown Course'}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge
                        variant={
                          enrollment.status === 'Enrolled' ? 'primary' :
                          enrollment.status === 'Completed' ? 'success' : 'warning'
                        }
                      >
                        {enrollment.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">No recent enrollments</div>
          )}
        </Card>
        
        <Card title="Recent Marks">
          {recentMarks.length > 0 ? (
            <div className="divide-y">
              {recentMarks.map(mark => {
                const student = data.students.find(s => s.id === mark.studentId);
                const course = data.courses.find(c => c.id === mark.courseId);
                
                return (
                  <div key={mark.id} className="py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">
                        {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {course ? course.name : 'Unknown Course'}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-lg font-bold">
                        {mark.grade}
                        <span className="text-sm text-gray-500 ml-2">({mark.marks}/100)</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(mark.submissionDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">No recent marks</div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
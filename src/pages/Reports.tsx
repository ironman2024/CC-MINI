import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { PieChart, BarChart2, Users, BookOpen, GraduationCap, Award, ClipboardList } from 'lucide-react';

const Reports: React.FC = () => {
  const { data } = useData();
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  
  // Get unique semesters from courses
  const semesters = ['All', ...new Set(data.courses.map(c => c.semester))];
  
  // Filter data by selected semester
  const filterBySemester = <T extends { semester?: string }>(items: T[]): T[] => {
    if (selectedSemester === 'All') return items;
    return items.filter(item => item.semester === selectedSemester);
  };
  
  // Calculate student statistics
  const activeStudents = data.students.filter(s => s.status === 'Active').length;
  const inactiveStudents = data.students.filter(s => s.status === 'Inactive').length;
  const graduatedStudents = data.students.filter(s => s.status === 'Graduated').length;
  
  // Calculate course statistics
  const filteredCourses = filterBySemester(data.courses);
  const activeCourses = filteredCourses.filter(c => c.status === 'Active').length;
  const inactiveCourses = filteredCourses.filter(c => c.status === 'Inactive').length;
  
  // Calculate enrollment statistics
  const filteredEnrollments = selectedSemester === 'All' 
    ? data.enrollments
    : data.enrollments.filter(e => {
        const course = data.courses.find(c => c.id === e.courseId);
        return course?.semester === selectedSemester;
      });
  
  const enrolledCount = filteredEnrollments.filter(e => e.status === 'Enrolled').length;
  const completedCount = filteredEnrollments.filter(e => e.status === 'Completed').length;
  const droppedCount = filteredEnrollments.filter(e => e.status === 'Dropped').length;
  
  // Calculate grade distribution
  const filteredMarks = filterBySemester(data.marks);
  const gradeGroups = filteredMarks.reduce((acc, mark) => {
    const grade = mark.grade.charAt(0); // Take just the letter part (A, B, C, etc.)
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const gradeDistribution = Object.entries(gradeGroups).sort((a, b) => a[0].localeCompare(b[0]));
  
  // Calculate department distribution
  const departmentGroups = data.professors.reduce((acc, prof) => {
    acc[prof.department] = (acc[prof.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const departmentDistribution = Object.entries(departmentGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 departments
  
  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="View statistics and performance metrics"
        action={
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Semester:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="block rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Users size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Student Status</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <Badge variant="success" className="mr-2">Active</Badge>
                <span>{activeStudents} students</span>
              </span>
              <span className="text-sm text-gray-500">
                {data.students.length > 0
                  ? Math.round((activeStudents / data.students.length) * 100)
                  : 0}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${data.students.length > 0
                    ? Math.round((activeStudents / data.students.length) * 100)
                    : 0}%`,
                }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="flex items-center">
                <Badge variant="warning" className="mr-2">Inactive</Badge>
                <span>{inactiveStudents} students</span>
              </span>
              <span className="text-sm text-gray-500">
                {data.students.length > 0
                  ? Math.round((inactiveStudents / data.students.length) * 100)
                  : 0}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${data.students.length > 0
                    ? Math.round((inactiveStudents / data.students.length) * 100)
                    : 0}%`,
                }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="flex items-center">
                <Badge variant="info" className="mr-2">Graduated</Badge>
                <span>{graduatedStudents} students</span>
              </span>
              <span className="text-sm text-gray-500">
                {data.students.length > 0
                  ? Math.round((graduatedStudents / data.students.length) * 100)
                  : 0}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${data.students.length > 0
                    ? Math.round((graduatedStudents / data.students.length) * 100)
                    : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-100 mr-3">
              <BookOpen size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Course Status</h3>
          </div>
          
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-green-600">{activeCourses}</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-yellow-500">{inactiveCourses}</div>
              <div className="text-sm text-gray-500">Inactive</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600">{filteredCourses.length}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-600">
                  Active Rate
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-600">
                  {filteredCourses.length > 0
                    ? Math.round((activeCourses / filteredCourses.length) * 100)
                    : 0}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{
                  width: `${filteredCourses.length > 0
                    ? Math.round((activeCourses / filteredCourses.length) * 100)
                    : 0}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100 mr-3">
              <ClipboardList size={20} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-medium">Enrollment Status</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <Badge variant="primary" className="mr-2">Enrolled</Badge>
                <span>{enrolledCount} enrollments</span>
              </span>
              <span className="text-sm text-gray-500">
                {filteredEnrollments.length > 0
                  ? Math.round((enrolledCount / filteredEnrollments.length) * 100)
                  : 0}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${filteredEnrollments.length > 0
                    ? Math.round((enrolledCount / filteredEnrollments.length) * 100)
                    : 0}%`,
                }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="flex items-center">
                <Badge variant="success" className="mr-2">Completed</Badge>
                <span>{completedCount} enrollments</span>
              </span>
              <span className="text-sm text-gray-500">
                {filteredEnrollments.length > 0
                  ? Math.round((completedCount / filteredEnrollments.length) * 100)
                  : 0}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${filteredEnrollments.length > 0
                    ? Math.round((completedCount / filteredEnrollments.length) * 100)
                    : 0}%`,
                }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="flex items-center">
                <Badge variant="warning" className="mr-2">Dropped</Badge>
                <span>{droppedCount} enrollments</span>
              </span>
              <span className="text-sm text-gray-500">
                {filteredEnrollments.length > 0
                  ? Math.round((droppedCount / filteredEnrollments.length) * 100)
                  : 0}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${filteredEnrollments.length > 0
                    ? Math.round((droppedCount / filteredEnrollments.length) * 100)
                    : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-red-100 mr-3">
              <Award size={20} className="text-red-600" />
            </div>
            <h3 className="text-lg font-medium">Grade Distribution</h3>
          </div>
          
          {gradeDistribution.length > 0 ? (
            <div className="space-y-4">
              {gradeDistribution.map(([grade, count]) => (
                <div key={grade}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium">{grade}</span>
                    <span className="text-sm text-gray-500">
                      {count} students ({Math.round((count / filteredMarks.length) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        grade === 'A' ? 'bg-green-600' :
                        grade === 'B' ? 'bg-blue-600' :
                        grade === 'C' ? 'bg-yellow-500' :
                        grade === 'D' ? 'bg-orange-500' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.round((count / filteredMarks.length) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <Award size={36} className="mx-auto mb-2 text-gray-400" />
              <p>No grade data available for selected semester</p>
            </div>
          )}
        </Card>
        
        <Card>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-100 mr-3">
              <GraduationCap size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Department Distribution</h3>
          </div>
          
          {departmentDistribution.length > 0 ? (
            <div className="space-y-4">
              {departmentDistribution.map(([department, count]) => (
                <div key={department}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium">{department}</span>
                    <span className="text-sm text-gray-500">
                      {count} professors ({Math.round((count / data.professors.length) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${Math.round((count / data.professors.length) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <GraduationCap size={36} className="mx-auto mb-2 text-gray-400" />
              <p>No department data available</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Reports;
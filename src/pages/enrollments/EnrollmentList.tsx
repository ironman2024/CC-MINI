import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { Plus, User, BookOpen, Calendar } from 'lucide-react';
import EnrollmentForm from './EnrollmentForm';

const EnrollmentList: React.FC = () => {
  const { data, getStudentById, getCourseById } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const columns = [
    {
      key: 'id',
      header: 'ID',
      width: '10%',
      render: (enrollment) => (
        <span className="font-mono text-xs text-gray-500">{enrollment.id}</span>
      ),
    },
    {
      key: 'student',
      header: 'Student',
      width: '25%',
      render: (enrollment) => {
        const student = getStudentById(enrollment.studentId);
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <User size={16} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium">{student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}</div>
              <div className="text-xs text-gray-500 mt-0.5">{student?.email || ''}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'course',
      header: 'Course',
      width: '25%',
      render: (enrollment) => {
        const course = getCourseById(enrollment.courseId);
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <BookOpen size={16} className="text-green-600" />
            </div>
            <div>
              <div className="font-medium">{course?.name || 'Unknown Course'}</div>
              <div className="text-xs text-gray-500 mt-0.5">{course?.code || ''}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'enrollmentDate',
      header: 'Enrollment Date',
      width: '20%',
      render: (enrollment) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '20%',
      render: (enrollment) => (
        <Badge
          variant={
            enrollment.status === 'Enrolled' ? 'primary' :
            enrollment.status === 'Completed' ? 'success' : 
            'warning'
          }
        >
          {enrollment.status}
        </Badge>
      ),
    },
  ];
  
  return (
    <div>
      <PageHeader
        title="Course Enrollments"
        subtitle={`${data.enrollments.length} enrollments in the system`}
        action={
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Enrollment
          </Button>
        }
      />
      
      {showAddForm ? (
        <EnrollmentForm onCancel={() => setShowAddForm(false)} />
      ) : (
        <DataTable
          data={data.enrollments}
          columns={columns}
          keyExtractor={(item) => item.id}
          searchable
          searchKeys={['id', 'studentId', 'courseId']}
        />
      )}
    </div>
  );
};

export default EnrollmentList;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StudentForm from './StudentForm';
import { ArrowLeft, Edit, Trash2, Calendar, Mail, Phone, MapPin, User, BookOpen } from 'lucide-react';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, getStudentById, deleteStudent, getCourseById } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!id) {
    navigate('/students');
    return null;
  }
  
  const student = getStudentById(id);
  
  if (!student) {
    navigate('/students');
    return null;
  }
  
  // Get related data
  const studentEnrollments = data.enrollments.filter(e => e.studentId === id);
  const studentMarks = data.marks.filter(m => m.studentId === id);
  
  const handleDelete = () => {
    deleteStudent(id);
    navigate('/students');
  };
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'warning';
      case 'Graduated':
        return 'info';
      default:
        return 'secondary';
    }
  };
  
  // Enrollment columns
  const enrollmentColumns = [
    {
      key: 'course',
      header: 'Course',
      render: (enrollment) => {
        const course = getCourseById(enrollment.courseId);
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <BookOpen size={16} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium">{course?.name || 'Unknown Course'}</div>
              <div className="text-xs text-gray-500">{course?.code || ''}</div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'enrollmentDate',
      header: 'Enrollment Date',
      render: (enrollment) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
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
      )
    }
  ];
  
  // Marks columns
  const marksColumns = [
    {
      key: 'course',
      header: 'Course',
      render: (mark) => {
        const course = getCourseById(mark.courseId);
        return (
          <div>
            <div className="font-medium">{course?.name || 'Unknown Course'}</div>
            <div className="text-xs text-gray-500">{course?.code || ''}</div>
          </div>
        );
      }
    },
    {
      key: 'semester',
      header: 'Semester',
      render: (mark) => (
        <span>{mark.semester}</span>
      )
    },
    {
      key: 'marks',
      header: 'Marks',
      render: (mark) => (
        <span className="font-medium">{mark.marks}/100</span>
      )
    },
    {
      key: 'grade',
      header: 'Grade',
      render: (mark) => (
        <span className="font-bold text-lg">{mark.grade}</span>
      )
    },
    {
      key: 'submissionDate',
      header: 'Date',
      render: (mark) => (
        <span>{new Date(mark.submissionDate).toLocaleDateString()}</span>
      )
    }
  ];
  
  const infoFields = [
    { icon: <User size={18} />, label: 'Name', value: `${student.firstName} ${student.lastName}` },
    { icon: <Mail size={18} />, label: 'Email', value: student.email },
    { icon: <Phone size={18} />, label: 'Phone', value: student.phone },
    { icon: <Calendar size={18} />, label: 'Date of Birth', value: new Date(student.dateOfBirth).toLocaleDateString() },
    { icon: <Calendar size={18} />, label: 'Enrollment Date', value: new Date(student.enrollmentDate).toLocaleDateString() },
    { icon: <MapPin size={18} />, label: 'Address', value: student.address || 'N/A' }
  ];
  
  const tabs = [
    {
      id: 'info',
      label: 'Information',
      content: (
        <div>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infoFields.map((field, index) => (
                <div key={index} className="flex">
                  <div className="mt-0.5 text-gray-400 mr-3">{field.icon}</div>
                  <div>
                    <div className="text-sm text-gray-500">{field.label}</div>
                    <div className="font-medium">{field.value}</div>
                  </div>
                </div>
              ))}
              <div className="flex md:col-span-2">
                <div className="mt-0.5 text-gray-400 mr-3">
                  <div className="h-5 w-5"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div>
                    <Badge variant={getBadgeVariant(student.status)}>
                      {student.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'enrollments',
      label: 'Enrollments',
      content: (
        <div>
          {studentEnrollments.length > 0 ? (
            <DataTable
              data={studentEnrollments}
              columns={enrollmentColumns}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Card>
              <div className="py-8 text-center text-gray-500">
                <BookOpen size={36} className="mx-auto mb-2 text-gray-400" />
                <p>No enrollments found</p>
              </div>
            </Card>
          )}
        </div>
      )
    },
    {
      id: 'marks',
      label: 'Academic Records',
      content: (
        <div>
          {studentMarks.length > 0 ? (
            <DataTable
              data={studentMarks}
              columns={marksColumns}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Card>
              <div className="py-8 text-center text-gray-500">
                <Award size={36} className="mx-auto mb-2 text-gray-400" />
                <p>No academic records found</p>
              </div>
            </Card>
          )}
        </div>
      )
    }
  ];
  
  if (isEditing) {
    return (
      <div>
        <PageHeader
          title="Edit Student"
          action={
            <Button
              variant="secondary"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => setIsEditing(false)}
            >
              Back to Details
            </Button>
          }
        />
        
        <StudentForm
          student={student}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader
        title={`${student.firstName} ${student.lastName}`}
        subtitle={`Student ID: ${student.id}`}
        action={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/students')}
            >
              Back to List
            </Button>
            <Button
              variant="primary"
              leftIcon={<Edit size={16} />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              leftIcon={<Trash2 size={16} />}
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </Button>
          </div>
        }
      />
      
      {showDeleteConfirm ? (
        <Card className="border-red-200 mb-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete this student? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ) : null}
      
      <Tabs tabs={tabs} defaultTab="info" />
    </div>
  );
};

export default StudentDetail;
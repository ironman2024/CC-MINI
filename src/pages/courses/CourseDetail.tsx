import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import CourseForm from './CourseForm';
import { ArrowLeft, Edit, Trash2, Clock, BookOpen, Calendar, User, GraduationCap } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, getCourseById, deleteCourse, getStudentById, getProfessorById } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!id) {
    navigate('/courses');
    return null;
  }
  
  const course = getCourseById(id);
  
  if (!course) {
    navigate('/courses');
    return null;
  }
  
  // Get related data
  const courseEnrollments = data.enrollments.filter(e => e.courseId === id);
  const courseAssignments = data.assignments.filter(a => a.courseId === id);
  const courseMarks = data.marks.filter(m => m.courseId === id);
  
  const handleDelete = () => {
    deleteCourse(id);
    navigate('/courses');
  };
  
  // Student enrollment columns
  const enrollmentColumns = [
    {
      key: 'student',
      header: 'Student',
      render: (enrollment) => {
        const student = getStudentById(enrollment.studentId);
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <User size={16} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium">{student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}</div>
              <div className="text-xs text-gray-500">{student?.email || ''}</div>
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
  
  // Professor assignment columns
  const assignmentColumns = [
    {
      key: 'professor',
      header: 'Professor',
      render: (assignment) => {
        const professor = getProfessorById(assignment.professorId);
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <GraduationCap size={16} className="text-purple-600" />
            </div>
            <div>
              <div className="font-medium">{professor ? `${professor.firstName} ${professor.lastName}` : 'Unknown Professor'}</div>
              <div className="text-xs text-gray-500">{professor?.department || ''}</div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'dates',
      header: 'Assignment Period',
      render: (assignment) => (
        <div>
          <div className="flex items-center">
            <Calendar size={14} className="text-gray-400 mr-1" />
            <span>From: {new Date(assignment.startDate).toLocaleDateString()}</span>
          </div>
          {assignment.endDate && (
            <div className="flex items-center mt-1">
              <Calendar size={14} className="text-gray-400 mr-1" />
              <span>To: {new Date(assignment.endDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (assignment) => (
        <Badge
          variant={
            assignment.status === 'Active' ? 'success' :
            assignment.status === 'Completed' ? 'info' : 
            'warning'
          }
        >
          {assignment.status}
        </Badge>
      )
    }
  ];
  
  // Academic records columns
  const marksColumns = [
    {
      key: 'student',
      header: 'Student',
      render: (mark) => {
        const student = getStudentById(mark.studentId);
        return (
          <div>
            <div className="font-medium">{student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}</div>
          </div>
        );
      }
    },
    {
      key: 'professor',
      header: 'Professor',
      render: (mark) => {
        const professor = getProfessorById(mark.professorId);
        return (
          <div className="text-sm">
            {professor ? `${professor.firstName} ${professor.lastName}` : 'Unknown Professor'}
          </div>
        );
      }
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
      key: 'semester',
      header: 'Semester',
      render: (mark) => (
        <span>{mark.semester}</span>
      )
    }
  ];
  
  const infoFields = [
    { icon: <BookOpen size={18} />, label: 'Course Name', value: course.name },
    { icon: <BookOpen size={18} />, label: 'Course Code', value: course.code },
    { icon: <Clock size={18} />, label: 'Credits', value: course.credits },
    { icon: <Clock size={18} />, label: 'Duration', value: `${course.duration} weeks` },
    { icon: <Calendar size={18} />, label: 'Semester', value: course.semester }
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
                    <Badge variant={course.status === 'Active' ? 'success' : 'warning'}>
                      {course.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex md:col-span-2">
                <div className="mt-0.5 text-gray-400 mr-3">
                  <div className="h-5 w-5"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Description</div>
                  <div className="font-medium">{course.description}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'students',
      label: 'Students',
      content: (
        <div>
          {courseEnrollments.length > 0 ? (
            <DataTable
              data={courseEnrollments}
              columns={enrollmentColumns}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Card>
              <div className="py-8 text-center text-gray-500">
                <User size={36} className="mx-auto mb-2 text-gray-400" />
                <p>No students enrolled in this course</p>
              </div>
            </Card>
          )}
        </div>
      )
    },
    {
      id: 'professors',
      label: 'Professors',
      content: (
        <div>
          {courseAssignments.length > 0 ? (
            <DataTable
              data={courseAssignments}
              columns={assignmentColumns}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Card>
              <div className="py-8 text-center text-gray-500">
                <GraduationCap size={36} className="mx-auto mb-2 text-gray-400" />
                <p>No professors assigned to this course</p>
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
          {courseMarks.length > 0 ? (
            <DataTable
              data={courseMarks}
              columns={marksColumns}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Card>
              <div className="py-8 text-center text-gray-500">
                <BookOpen size={36} className="mx-auto mb-2 text-gray-400" />
                <p>No academic records available for this course</p>
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
          title="Edit Course"
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
        
        <CourseForm
          course={course}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader
        title={course.name}
        subtitle={`Course Code: ${course.code}`}
        action={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/courses')}
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
              Are you sure you want to delete this course? This action cannot be undone.
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

export default CourseDetail;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import ProfessorForm from './ProfessorForm';
import { ArrowLeft, Edit, Trash2, Calendar, Mail, Phone, BookOpen, GraduationCap } from 'lucide-react';

const ProfessorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, getProfessorById, deleteProfessor, getCourseById } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!id) {
    navigate('/professors');
    return null;
  }
  
  const professor = getProfessorById(id);
  
  if (!professor) {
    navigate('/professors');
    return null;
  }
  
  // Get related data
  const professorAssignments = data.assignments.filter(a => a.professorId === id);
  
  const handleDelete = () => {
    deleteProfessor(id);
    navigate('/professors');
  };
  
  // Course assignments columns
  const assignmentColumns = [
    {
      key: 'course',
      header: 'Course',
      render: (assignment) => {
        const course = getCourseById(assignment.courseId);
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
  
  const infoFields = [
    { icon: <GraduationCap size={18} />, label: 'Name', value: `${professor.firstName} ${professor.lastName}` },
    { icon: <Mail size={18} />, label: 'Email', value: professor.email },
    { icon: <Phone size={18} />, label: 'Phone', value: professor.phone },
    { icon: <GraduationCap size={18} />, label: 'Department', value: professor.department },
    { icon: <GraduationCap size={18} />, label: 'Specialization', value: professor.specialization },
    { icon: <Calendar size={18} />, label: 'Join Date', value: new Date(professor.joinDate).toLocaleDateString() }
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
                    <Badge variant={professor.status === 'Active' ? 'success' : 'warning'}>
                      {professor.status}
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
      id: 'courses',
      label: 'Teaching Assignments',
      content: (
        <div>
          {professorAssignments.length > 0 ? (
            <DataTable
              data={professorAssignments}
              columns={assignmentColumns}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Card>
              <div className="py-8 text-center text-gray-500">
                <BookOpen size={36} className="mx-auto mb-2 text-gray-400" />
                <p>No teaching assignments found</p>
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
          title="Edit Professor"
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
        
        <ProfessorForm
          professor={professor}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader
        title={`${professor.firstName} ${professor.lastName}`}
        subtitle={`Professor ID: ${professor.id}`}
        action={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/professors')}
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
              Are you sure you want to delete this professor? This action cannot be undone.
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

export default ProfessorDetail;
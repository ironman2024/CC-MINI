import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { Plus, User, Mail, Phone, Calendar } from 'lucide-react';
import StudentForm from './StudentForm';

const StudentList: React.FC = () => {
  const { data } = useData();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  
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
  
  const columns = [
    {
      key: 'id',
      header: 'ID',
      width: '10%',
      render: (student) => (
        <span className="font-mono text-xs text-gray-500">{student.id}</span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      width: '25%',
      render: (student) => (
        <div className="flex items-center">
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <User size={16} className="text-blue-600" />
          </div>
          <div>
            <div className="font-medium">{`${student.firstName} ${student.lastName}`}</div>
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              <Mail size={12} className="mr-1" />
              {student.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      width: '15%',
      render: (student) => (
        <div className="flex items-center">
          <Phone size={14} className="text-gray-400 mr-1" />
          <span>{student.phone}</span>
        </div>
      ),
    },
    {
      key: 'enrollmentDate',
      header: 'Enrollment Date',
      width: '20%',
      render: (student) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{new Date(student.enrollmentDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '15%',
      render: (student) => (
        <Badge variant={getBadgeVariant(student.status)}>
          {student.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '15%',
      render: (student) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/students/${student.id}`);
            }}
          >
            View
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${data.students.length} students in the system`}
        action={
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Student
          </Button>
        }
      />
      
      {showAddForm ? (
        <StudentForm onCancel={() => setShowAddForm(false)} />
      ) : (
        <DataTable
          data={data.students}
          columns={columns}
          onRowClick={(student) => navigate(`/students/${student.id}`)}
          keyExtractor={(item) => item.id}
          searchable
          searchKeys={['firstName', 'lastName', 'email', 'phone']}
        />
      )}
    </div>
  );
};

export default StudentList;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { Plus, GraduationCap, Mail, Phone, Calendar } from 'lucide-react';
import ProfessorForm from './ProfessorForm';

const ProfessorList: React.FC = () => {
  const { data } = useData();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const columns = [
    {
      key: 'id',
      header: 'ID',
      width: '10%',
      render: (professor) => (
        <span className="font-mono text-xs text-gray-500">{professor.id}</span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      width: '25%',
      render: (professor) => (
        <div className="flex items-center">
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <GraduationCap size={16} className="text-purple-600" />
          </div>
          <div>
            <div className="font-medium">{`${professor.firstName} ${professor.lastName}`}</div>
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              <Mail size={12} className="mr-1" />
              {professor.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      width: '15%',
    },
    {
      key: 'specialization',
      header: 'Specialization',
      width: '15%',
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      width: '15%',
      render: (professor) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{new Date(professor.joinDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (professor) => (
        <Badge variant={professor.status === 'Active' ? 'success' : 'warning'}>
          {professor.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      render: (professor) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/professors/${professor.id}`);
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
        title="Professors"
        subtitle={`${data.professors.length} professors in the system`}
        action={
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Professor
          </Button>
        }
      />
      
      {showAddForm ? (
        <ProfessorForm onCancel={() => setShowAddForm(false)} />
      ) : (
        <DataTable
          data={data.professors}
          columns={columns}
          onRowClick={(professor) => navigate(`/professors/${professor.id}`)}
          keyExtractor={(item) => item.id}
          searchable
          searchKeys={['firstName', 'lastName', 'email', 'department', 'specialization']}
        />
      )}
    </div>
  );
};

export default ProfessorList;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { Plus, BookOpen, Clock, Calendar } from 'lucide-react';
import CourseForm from './CourseForm';

const CourseList: React.FC = () => {
  const { data } = useData();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const columns = [
    {
      key: 'id',
      header: 'ID',
      width: '10%',
      render: (course) => (
        <span className="font-mono text-xs text-gray-500">{course.id}</span>
      ),
    },
    {
      key: 'name',
      header: 'Course',
      width: '30%',
      render: (course) => (
        <div className="flex items-center">
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <BookOpen size={16} className="text-blue-600" />
          </div>
          <div>
            <div className="font-medium">{course.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Code: {course.code}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'credits',
      header: 'Credits',
      width: '10%',
      render: (course) => (
        <span className="font-medium">{course.credits}</span>
      ),
    },
    {
      key: 'duration',
      header: 'Duration',
      width: '15%',
      render: (course) => (
        <div className="flex items-center">
          <Clock size={14} className="text-gray-400 mr-1" />
          <span>{course.duration} weeks</span>
        </div>
      ),
    },
    {
      key: 'semester',
      header: 'Semester',
      width: '15%',
      render: (course) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{course.semester}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (course) => (
        <Badge variant={course.status === 'Active' ? 'success' : 'warning'}>
          {course.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      render: (course) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/courses/${course.id}`);
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
        title="Courses"
        subtitle={`${data.courses.length} courses in the system`}
        action={
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Course
          </Button>
        }
      />
      
      {showAddForm ? (
        <CourseForm onCancel={() => setShowAddForm(false)} />
      ) : (
        <DataTable
          data={data.courses}
          columns={columns}
          onRowClick={(course) => navigate(`/courses/${course.id}`)}
          keyExtractor={(item) => item.id}
          searchable
          searchKeys={['name', 'code', 'description', 'semester']}
        />
      )}
    </div>
  );
};

export default CourseList;
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import { Plus, User, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import MarksForm from './MarksForm';

const MarksList: React.FC = () => {
  const { data, getStudentById, getCourseById, getProfessorById } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const columns = [
    {
      key: 'id',
      header: 'ID',
      width: '10%',
      render: (mark) => (
        <span className="font-mono text-xs text-gray-500">{mark.id}</span>
      ),
    },
    {
      key: 'student',
      header: 'Student',
      width: '20%',
      render: (mark) => {
        const student = getStudentById(mark.studentId);
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <User size={16} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium">{student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'course',
      header: 'Course',
      width: '20%',
      render: (mark) => {
        const course = getCourseById(mark.courseId);
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
      key: 'professor',
      header: 'Professor',
      width: '20%',
      render: (mark) => {
        const professor = getProfessorById(mark.professorId);
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <GraduationCap size={16} className="text-purple-600" />
            </div>
            <div>
              <div className="font-medium">{professor ? `${professor.firstName} ${professor.lastName}` : 'Unknown Professor'}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'marks',
      header: 'Marks',
      width: '10%',
      render: (mark) => (
        <span className="font-medium">{mark.marks}/100</span>
      ),
    },
    {
      key: 'grade',
      header: 'Grade',
      width: '10%',
      render: (mark) => (
        <span className="text-lg font-bold">{mark.grade}</span>
      ),
    },
    {
      key: 'submissionDate',
      header: 'Submission Date',
      width: '15%',
      render: (mark) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{new Date(mark.submissionDate).toLocaleDateString()}</span>
        </div>
      ),
    },
  ];
  
  return (
    <div>
      <PageHeader
        title="Academic Records"
        subtitle={`${data.marks.length} academic records in the system`}
        action={
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Record
          </Button>
        }
      />
      
      {showAddForm ? (
        <MarksForm onCancel={() => setShowAddForm(false)} />
      ) : (
        <DataTable
          data={data.marks}
          columns={columns}
          keyExtractor={(item) => item.id}
          searchable
          searchKeys={['id', 'studentId', 'courseId', 'professorId', 'academicYear']}
        />
      )}
    </div>
  );
};

export default MarksList;
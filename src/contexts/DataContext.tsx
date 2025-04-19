import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { DataState, Student, Course, Professor, Mark, CourseEnrollment, TeachingAssignment } from '../models/types';
import { generateInitialData, generateId } from '../utils/mockData';

interface DataContextType {
  data: DataState;
  addStudent: (student: Omit<Student, 'id'>) => string;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => string;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addProfessor: (professor: Omit<Professor, 'id'>) => string;
  updateProfessor: (id: string, professor: Partial<Professor>) => void;
  deleteProfessor: (id: string) => void;
  addMark: (mark: Omit<Mark, 'id'>) => string;
  updateMark: (id: string, mark: Partial<Mark>) => void;
  deleteMark: (id: string) => void;
  addEnrollment: (enrollment: Omit<CourseEnrollment, 'id'>) => string;
  updateEnrollment: (id: string, enrollment: Partial<CourseEnrollment>) => void;
  deleteEnrollment: (id: string) => void;
  addAssignment: (assignment: Omit<TeachingAssignment, 'id'>) => string;
  updateAssignment: (id: string, assignment: Partial<TeachingAssignment>) => void;
  deleteAssignment: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
  getCourseById: (id: string) => Course | undefined;
  getProfessorById: (id: string) => Professor | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataState>(() => {
    const savedData = localStorage.getItem('studentforceData');
    return savedData ? JSON.parse(savedData) : generateInitialData();
  });

  useEffect(() => {
    localStorage.setItem('studentforceData', JSON.stringify(data));
  }, [data]);

  // Student operations
  const addStudent = (student: Omit<Student, 'id'>) => {
    const id = generateId();
    setData(prev => ({
      ...prev,
      students: [...prev.students, { id, ...student }]
    }));
    return id;
  };

  const updateStudent = (id: string, student: Partial<Student>) => {
    setData(prev => ({
      ...prev,
      students: prev.students.map(s => s.id === id ? { ...s, ...student } : s)
    }));
  };

  const deleteStudent = (id: string) => {
    setData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id),
      enrollments: prev.enrollments.filter(e => e.studentId !== id),
      marks: prev.marks.filter(m => m.studentId !== id)
    }));
  };

  // Course operations
  const addCourse = (course: Omit<Course, 'id'>) => {
    const id = generateId();
    setData(prev => ({
      ...prev,
      courses: [...prev.courses, { id, ...course }]
    }));
    return id;
  };

  const updateCourse = (id: string, course: Partial<Course>) => {
    setData(prev => ({
      ...prev,
      courses: prev.courses.map(c => c.id === id ? { ...c, ...course } : c)
    }));
  };

  const deleteCourse = (id: string) => {
    setData(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== id),
      enrollments: prev.enrollments.filter(e => e.courseId !== id),
      assignments: prev.assignments.filter(a => a.courseId !== id),
      marks: prev.marks.filter(m => m.courseId !== id)
    }));
  };

  // Professor operations
  const addProfessor = (professor: Omit<Professor, 'id'>) => {
    const id = generateId();
    setData(prev => ({
      ...prev,
      professors: [...prev.professors, { id, ...professor }]
    }));
    return id;
  };

  const updateProfessor = (id: string, professor: Partial<Professor>) => {
    setData(prev => ({
      ...prev,
      professors: prev.professors.map(p => p.id === id ? { ...p, ...professor } : p)
    }));
  };

  const deleteProfessor = (id: string) => {
    setData(prev => ({
      ...prev,
      professors: prev.professors.filter(p => p.id !== id),
      assignments: prev.assignments.filter(a => a.professorId !== id),
      marks: prev.marks.filter(m => m.professorId !== id)
    }));
  };

  // Mark operations
  const addMark = (mark: Omit<Mark, 'id'>) => {
    const id = generateId();
    setData(prev => ({
      ...prev,
      marks: [...prev.marks, { id, ...mark }]
    }));
    return id;
  };

  const updateMark = (id: string, mark: Partial<Mark>) => {
    setData(prev => ({
      ...prev,
      marks: prev.marks.map(m => m.id === id ? { ...m, ...mark } : m)
    }));
  };

  const deleteMark = (id: string) => {
    setData(prev => ({
      ...prev,
      marks: prev.marks.filter(m => m.id !== id)
    }));
  };

  // Enrollment operations
  const addEnrollment = (enrollment: Omit<CourseEnrollment, 'id'>) => {
    const id = generateId();
    setData(prev => ({
      ...prev,
      enrollments: [...prev.enrollments, { id, ...enrollment }]
    }));
    return id;
  };

  const updateEnrollment = (id: string, enrollment: Partial<CourseEnrollment>) => {
    setData(prev => ({
      ...prev,
      enrollments: prev.enrollments.map(e => e.id === id ? { ...e, ...enrollment } : e)
    }));
  };

  const deleteEnrollment = (id: string) => {
    setData(prev => ({
      ...prev,
      enrollments: prev.enrollments.filter(e => e.id !== id)
    }));
  };

  // Assignment operations
  const addAssignment = (assignment: Omit<TeachingAssignment, 'id'>) => {
    const id = generateId();
    setData(prev => ({
      ...prev,
      assignments: [...prev.assignments, { id, ...assignment }]
    }));
    return id;
  };

  const updateAssignment = (id: string, assignment: Partial<TeachingAssignment>) => {
    setData(prev => ({
      ...prev,
      assignments: prev.assignments.map(a => a.id === id ? { ...a, ...assignment } : a)
    }));
  };

  const deleteAssignment = (id: string) => {
    setData(prev => ({
      ...prev,
      assignments: prev.assignments.filter(a => a.id !== id)
    }));
  };

  // Getters
  const getStudentById = (id: string) => {
    return data.students.find(s => s.id === id);
  };

  const getCourseById = (id: string) => {
    return data.courses.find(c => c.id === id);
  };

  const getProfessorById = (id: string) => {
    return data.professors.find(p => p.id === id);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        addStudent,
        updateStudent,
        deleteStudent,
        addCourse,
        updateCourse,
        deleteCourse,
        addProfessor,
        updateProfessor,
        deleteProfessor,
        addMark,
        updateMark,
        deleteMark,
        addEnrollment,
        updateEnrollment,
        deleteEnrollment,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        getStudentById,
        getCourseById,
        getProfessorById
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
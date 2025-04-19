import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Mark } from '../../models/types';
import { CheckCircle, Save, X } from 'lucide-react';

interface MarksFormProps {
  mark?: Mark;
  onSave?: (id: string) => void;
  onCancel?: () => void;
}

const defaultMark: Omit<Mark, 'id'> = {
  studentId: '',
  courseId: '',
  professorId: '',
  marks: 0,
  grade: '',
  semester: '',
  academicYear: '',
  submissionDate: new Date().toISOString().split('T')[0]
};

// Grade calculation helper
const calculateGrade = (marks: number): string => {
  if (marks >= 90) return 'A';
  if (marks >= 80) return 'B+';
  if (marks >= 75) return 'B';
  if (marks >= 70) return 'B-';
  if (marks >= 65) return 'C+';
  if (marks >= 60) return 'C';
  if (marks >= 55) return 'C-';
  if (marks >= 50) return 'D';
  return 'F';
};

const MarksForm: React.FC<MarksFormProps> = ({
  mark,
  onSave,
  onCancel
}) => {
  const { data, addMark, updateMark } = useData();
  const [formData, setFormData] = useState<Omit<Mark, 'id'>>(
    mark ? { ...mark } : { ...defaultMark }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Mark, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const isEditMode = !!mark;
  
  // Filter active students and currently enrolled students
  const activeStudents = data.students.filter(s => s.status === 'Active');
  
  // Get available courses for selected student
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  
  // Get available professors for selected course
  const [availableProfessors, setAvailableProfessors] = useState<string[]>([]);
  
  // Update available courses when student changes
  useEffect(() => {
    if (formData.studentId) {
      const enrollments = data.enrollments.filter(
        e => e.studentId === formData.studentId && e.status === 'Enrolled'
      );
      setAvailableCourses(enrollments.map(e => e.courseId));
      
      // Clear course selection if current selection is no longer valid
      if (formData.courseId && !enrollments.some(e => e.courseId === formData.courseId)) {
        setFormData(prev => ({
          ...prev,
          courseId: '',
          professorId: ''
        }));
      }
    } else {
      setAvailableCourses([]);
    }
  }, [formData.studentId, data.enrollments]);
  
  // Update available professors when course changes
  useEffect(() => {
    if (formData.courseId) {
      const assignments = data.assignments.filter(
        a => a.courseId === formData.courseId && a.status === 'Active'
      );
      setAvailableProfessors(assignments.map(a => a.professorId));
      
      // Clear professor selection if current selection is no longer valid
      if (formData.professorId && !assignments.some(a => a.professorId === formData.professorId)) {
        setFormData(prev => ({
          ...prev,
          professorId: ''
        }));
      }
      
      // Auto-fill semester from the course
      const course = data.courses.find(c => c.id === formData.courseId);
      if (course) {
        setFormData(prev => ({
          ...prev,
          semester: course.semester,
          academicYear: course.semester.split(' ')[1] + '-' + (parseInt(course.semester.split(' ')[1]) + 1)
        }));
      }
    } else {
      setAvailableProfessors([]);
    }
  }, [formData.courseId, data.assignments, data.courses]);
  
  // Auto-calculate grade when marks change
  useEffect(() => {
    if (formData.marks >= 0 && formData.marks <= 100) {
      setFormData(prev => ({
        ...prev,
        grade: calculateGrade(formData.marks)
      }));
    }
  }, [formData.marks]);
  
  const validate = () => {
    const newErrors: Partial<Record<keyof Mark, string>> = {};
    
    if (!formData.studentId) {
      newErrors.studentId = 'Student is required';
    }
    
    if (!formData.courseId) {
      newErrors.courseId = 'Course is required';
    }
    
    if (!formData.professorId) {
      newErrors.professorId = 'Professor is required';
    }
    
    if (formData.marks < 0 || formData.marks > 100) {
      newErrors.marks = 'Marks must be between 0 and 100';
    }
    
    if (!formData.grade) {
      newErrors.grade = 'Grade is required';
    }
    
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }
    
    if (!formData.academicYear) {
      newErrors.academicYear = 'Academic year is required';
    }
    
    if (!formData.submissionDate) {
      newErrors.submissionDate = 'Submission date is required';
    }
    
    // Check if this student already has a mark for this course
    if (!isEditMode && formData.studentId && formData.courseId) {
      const existingMark = data.marks.find(
        m => m.studentId === formData.studentId && m.courseId === formData.courseId
      );
      
      if (existingMark) {
        newErrors.courseId = 'Student already has a mark for this course';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'marks' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof Mark]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode && mark) {
        updateMark(mark.id, formData);
        setSubmitSuccess(true);
        setTimeout(() => {
          onSave && onSave(mark.id);
        }, 1000);
      } else {
        const newId = addMark(formData);
        setSubmitSuccess(true);
        setTimeout(() => {
          onSave && onSave(newId);
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving mark:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card title={isEditMode ? 'Edit Academic Record' : 'Add New Academic Record'}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student <span className="text-red-500">*</span>
            </label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              disabled={isEditMode}
              className={`block w-full rounded-md sm:text-sm ${
                errors.studentId
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">Select a student</option>
              {activeStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {`${student.firstName} ${student.lastName}`}
                </option>
              ))}
            </select>
            {errors.studentId && (
              <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              disabled={isEditMode || !formData.studentId || availableCourses.length === 0}
              className={`block w-full rounded-md sm:text-sm ${
                errors.courseId
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">Select a course</option>
              {availableCourses.map(courseId => {
                const course = data.courses.find(c => c.id === courseId);
                return course ? (
                  <option key={course.id} value={course.id}>
                    {`${course.name} (${course.code})`}
                  </option>
                ) : null;
              })}
            </select>
            {errors.courseId && (
              <p className="mt-1 text-sm text-red-600">{errors.courseId}</p>
            )}
            {formData.studentId && availableCourses.length === 0 && (
              <p className="mt-1 text-sm text-amber-600">No courses available for this student</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professor <span className="text-red-500">*</span>
            </label>
            <select
              name="professorId"
              value={formData.professorId}
              onChange={handleChange}
              disabled={!formData.courseId || availableProfessors.length === 0}
              className={`block w-full rounded-md sm:text-sm ${
                errors.professorId
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">Select a professor</option>
              {availableProfessors.map(professorId => {
                const professor = data.professors.find(p => p.id === professorId);
                return professor ? (
                  <option key={professor.id} value={professor.id}>
                    {`${professor.firstName} ${professor.lastName}`}
                  </option>
                ) : null;
              })}
            </select>
            {errors.professorId && (
              <p className="mt-1 text-sm text-red-600">{errors.professorId}</p>
            )}
            {formData.courseId && availableProfessors.length === 0 && (
              <p className="mt-1 text-sm text-amber-600">No professors assigned to this course</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marks (0-100) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="marks"
              min="0"
              max="100"
              value={formData.marks}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.marks
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.marks && (
              <p className="mt-1 text-sm text-red-600">{errors.marks}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              readOnly
              className="block w-full rounded-md bg-gray-50 border-gray-300 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">Auto-calculated based on marks</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.semester
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.semester && (
              <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="e.g. 2023-2024"
              className={`block w-full rounded-md sm:text-sm ${
                errors.academicYear
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.academicYear && (
              <p className="mt-1 text-sm text-red-600">{errors.academicYear}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Submission Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.submissionDate
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.submissionDate && (
              <p className="mt-1 text-sm text-red-600">{errors.submissionDate}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            leftIcon={<X size={16} />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting || submitSuccess}
            leftIcon={submitSuccess ? <CheckCircle size={16} /> : <Save size={16} />}
            variant={submitSuccess ? 'success' : 'primary'}
          >
            {submitSuccess ? 'Saved' : isEditMode ? 'Update' : 'Add Record'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default MarksForm;
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { CourseEnrollment } from '../../models/types';
import { CheckCircle, Save, X } from 'lucide-react';

interface EnrollmentFormProps {
  enrollment?: CourseEnrollment;
  onSave?: (id: string) => void;
  onCancel?: () => void;
}

const defaultEnrollment: Omit<CourseEnrollment, 'id'> = {
  studentId: '',
  courseId: '',
  enrollmentDate: new Date().toISOString().split('T')[0],
  status: 'Enrolled'
};

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  enrollment,
  onSave,
  onCancel
}) => {
  const { data, addEnrollment, updateEnrollment } = useData();
  const [formData, setFormData] = useState<Omit<CourseEnrollment, 'id'>>(
    enrollment ? { ...enrollment } : { ...defaultEnrollment }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof CourseEnrollment, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const isEditMode = !!enrollment;
  
  // Filter active students
  const activeStudents = data.students.filter(s => s.status === 'Active');
  // Filter active courses
  const activeCourses = data.courses.filter(c => c.status === 'Active');
  
  const validate = () => {
    const newErrors: Partial<Record<keyof CourseEnrollment, string>> = {};
    
    if (!formData.studentId) {
      newErrors.studentId = 'Student is required';
    }
    
    if (!formData.courseId) {
      newErrors.courseId = 'Course is required';
    }
    
    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }
    
    // Check if this student is already enrolled in this course
    if (!isEditMode && formData.studentId && formData.courseId) {
      const existingEnrollment = data.enrollments.find(
        e => e.studentId === formData.studentId && e.courseId === formData.courseId
      );
      
      if (existingEnrollment) {
        newErrors.courseId = 'Student is already enrolled in this course';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof CourseEnrollment]) {
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
      if (isEditMode && enrollment) {
        updateEnrollment(enrollment.id, formData);
        setSubmitSuccess(true);
        setTimeout(() => {
          onSave && onSave(enrollment.id);
        }, 1000);
      } else {
        const newId = addEnrollment(formData);
        setSubmitSuccess(true);
        setTimeout(() => {
          onSave && onSave(newId);
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving enrollment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card title={isEditMode ? 'Edit Enrollment' : 'Add New Enrollment'}>
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
              className={`block w-full rounded-md sm:text-sm ${
                errors.studentId
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">Select a student</option>
              {activeStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {`${student.firstName} ${student.lastName} (${student.email})`}
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
              className={`block w-full rounded-md sm:text-sm ${
                errors.courseId
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">Select a course</option>
              {activeCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {`${course.name} (${course.code})`}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="mt-1 text-sm text-red-600">{errors.courseId}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.enrollmentDate
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.enrollmentDate && (
              <p className="mt-1 text-sm text-red-600">{errors.enrollmentDate}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Enrolled">Enrolled</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
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
            {submitSuccess ? 'Saved' : isEditMode ? 'Update' : 'Add Enrollment'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EnrollmentForm;
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Course } from '../../models/types';
import { CheckCircle, Save, X } from 'lucide-react';

interface CourseFormProps {
  course?: Course;
  onSave?: (id: string) => void;
  onCancel?: () => void;
}

const defaultCourse: Omit<Course, 'id'> = {
  name: '',
  code: '',
  description: '',
  credits: 3,
  duration: 16,
  semester: '',
  status: 'Active'
};

const CourseForm: React.FC<CourseFormProps> = ({
  course,
  onSave,
  onCancel
}) => {
  const { addCourse, updateCourse } = useData();
  const [formData, setFormData] = useState<Omit<Course, 'id'>>(
    course ? { ...course } : { ...defaultCourse }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Course, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const isEditMode = !!course;
  
  const validate = () => {
    const newErrors: Partial<Record<keyof Course, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }
    
    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.semester.trim()) {
      newErrors.semester = 'Semester is required';
    }
    
    if (formData.credits < 1) {
      newErrors.credits = 'Credits must be at least 1';
    }
    
    if (formData.duration < 1) {
      newErrors.duration = 'Duration must be at least 1 week';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'credits' || name === 'duration' ? parseInt(value) : value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof Course]) {
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
      if (isEditMode && course) {
        updateCourse(course.id, formData);
        setSubmitSuccess(true);
        setTimeout(() => {
          onSave && onSave(course.id);
        }, 1000);
      } else {
        const newId = addCourse(formData);
        setSubmitSuccess(true);
        setTimeout(() => {
          onSave && onSave(newId);
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card title={isEditMode ? 'Edit Course' : 'Add New Course'}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.code
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credits <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="credits"
              min="1"
              max="6"
              value={formData.credits}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.credits
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.credits && (
              <p className="mt-1 text-sm text-red-600">{errors.credits}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (weeks) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              className={`block w-full rounded-md sm:text-sm ${
                errors.duration
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
            )}
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
              placeholder="e.g. Fall 2023"
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
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`block w-full rounded-md sm:text-sm ${
              errors.description
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
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
            {submitSuccess ? 'Saved' : isEditMode ? 'Update' : 'Add Course'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CourseForm;
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Graduated';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  duration: number;
  semester: string;
  status: 'Active' | 'Inactive';
}

export interface Professor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

export interface Mark {
  id: string;
  studentId: string;
  courseId: string;
  professorId: string;
  marks: number;
  grade: string;
  semester: string;
  academicYear: string;
  submissionDate: string;
}

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'Enrolled' | 'Completed' | 'Dropped';
}

export interface TeachingAssignment {
  id: string;
  professorId: string;
  courseId: string;
  startDate: string;
  endDate: string | null;
  status: 'Active' | 'Completed' | 'Cancelled';
}

export type UserRole = 'Admin' | 'Instructor' | 'Student' | 'Registrar';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DataState {
  students: Student[];
  courses: Course[];
  professors: Professor[];
  marks: Mark[];
  enrollments: CourseEnrollment[];
  assignments: TeachingAssignment[];
  currentUser: User;
}
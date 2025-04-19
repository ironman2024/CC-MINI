import { DataState, Student, Course, Professor, Mark, CourseEnrollment, TeachingAssignment, User } from '../models/types';

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Generate mock students
const generateStudents = (): Student[] => {
  const students: Student[] = [
    {
      id: 'st-001',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1998-05-12',
      address: '123 Campus Drive, College Town, CT 12345',
      enrollmentDate: '2022-09-01',
      status: 'Active'
    },
    {
      id: 'st-002',
      firstName: 'Emma',
      lastName: 'Johnson',
      email: 'emma.johnson@example.com',
      phone: '(555) 234-5678',
      dateOfBirth: '1999-08-23',
      address: '456 University Ave, College Town, CT 12345',
      enrollmentDate: '2022-09-01',
      status: 'Active'
    },
    {
      id: 'st-003',
      firstName: 'Michael',
      lastName: 'Williams',
      email: 'michael.williams@example.com',
      phone: '(555) 345-6789',
      dateOfBirth: '1997-12-10',
      address: '789 Scholar Lane, College Town, CT 12345',
      enrollmentDate: '2021-09-01',
      status: 'Active'
    },
    {
      id: 'st-004',
      firstName: 'Sophia',
      lastName: 'Brown',
      email: 'sophia.brown@example.com',
      phone: '(555) 456-7890',
      dateOfBirth: '1998-02-15',
      address: '321 Academic Blvd, College Town, CT 12345',
      enrollmentDate: '2022-01-15',
      status: 'Active'
    },
    {
      id: 'st-005',
      firstName: 'James',
      lastName: 'Jones',
      email: 'james.jones@example.com',
      phone: '(555) 567-8901',
      dateOfBirth: '1996-06-30',
      address: '654 Education St, College Town, CT 12345',
      enrollmentDate: '2020-09-01',
      status: 'Graduated'
    },
    {
      id: 'st-006',
      firstName: 'Olivia',
      lastName: 'Garcia',
      email: 'olivia.garcia@example.com',
      phone: '(555) 678-9012',
      dateOfBirth: '1999-11-05',
      address: '987 Learning Way, College Town, CT 12345',
      enrollmentDate: '2022-09-01',
      status: 'Active'
    },
    {
      id: 'st-007',
      firstName: 'William',
      lastName: 'Miller',
      email: 'william.miller@example.com',
      phone: '(555) 789-0123',
      dateOfBirth: '1997-04-20',
      address: '246 Knowledge Dr, College Town, CT 12345',
      enrollmentDate: '2021-01-15',
      status: 'Inactive'
    },
    {
      id: 'st-008',
      firstName: 'Ava',
      lastName: 'Davis',
      email: 'ava.davis@example.com',
      phone: '(555) 890-1234',
      dateOfBirth: '1998-09-14',
      address: '135 Wisdom Circle, College Town, CT 12345',
      enrollmentDate: '2022-01-15',
      status: 'Active'
    },
    {
      id: 'st-009',
      firstName: 'Alexander',
      lastName: 'Rodriguez',
      email: 'alexander.rodriguez@example.com',
      phone: '(555) 901-2345',
      dateOfBirth: '1996-10-25',
      address: '864 Intellect Ave, College Town, CT 12345',
      enrollmentDate: '2020-09-01',
      status: 'Active'
    },
    {
      id: 'st-010',
      firstName: 'Isabella',
      lastName: 'Martinez',
      email: 'isabella.martinez@example.com',
      phone: '(555) 012-3456',
      dateOfBirth: '1999-03-18',
      address: '579 Study St, College Town, CT 12345',
      enrollmentDate: '2022-09-01',
      status: 'Active'
    }
  ];
  
  return students;
};

// Generate mock courses
const generateCourses = (): Course[] => {
  const courses: Course[] = [
    {
      id: 'cs-101',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      description: 'Fundamental concepts of computer programming and software development.',
      credits: 3,
      duration: 16,
      semester: 'Fall 2023',
      status: 'Active'
    },
    {
      id: 'cs-201',
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      description: 'Advanced data structures and algorithm design techniques.',
      credits: 4,
      duration: 16,
      semester: 'Spring 2024',
      status: 'Active'
    },
    {
      id: 'math-101',
      name: 'Calculus I',
      code: 'MATH101',
      description: 'Limits, derivatives, and integrals of algebraic and transcendental functions.',
      credits: 4,
      duration: 16,
      semester: 'Fall 2023',
      status: 'Active'
    },
    {
      id: 'eng-101',
      name: 'English Composition',
      code: 'ENG101',
      description: 'Principles of effective written communication and critical reading.',
      credits: 3,
      duration: 16,
      semester: 'Fall 2023',
      status: 'Active'
    },
    {
      id: 'phy-101',
      name: 'Physics I',
      code: 'PHY101',
      description: 'Mechanics, energy, thermodynamics, and waves.',
      credits: 4,
      duration: 16,
      semester: 'Spring 2024',
      status: 'Active'
    },
    {
      id: 'bio-101',
      name: 'Biology I',
      code: 'BIO101',
      description: 'Cell structure, genetics, evolution, and biodiversity.',
      credits: 4,
      duration: 16,
      semester: 'Fall 2023',
      status: 'Active'
    },
    {
      id: 'chem-101',
      name: 'Chemistry I',
      code: 'CHEM101',
      description: 'Atomic structure, periodic trends, and chemical bonding.',
      credits: 4,
      duration: 16,
      semester: 'Spring 2024',
      status: 'Active'
    },
    {
      id: 'cs-301',
      name: 'Database Systems',
      code: 'CS301',
      description: 'Relational database theory, SQL, and database design.',
      credits: 3,
      duration: 16,
      semester: 'Fall 2023',
      status: 'Active'
    },
    {
      id: 'cs-401',
      name: 'Software Engineering',
      code: 'CS401',
      description: 'Software development methodologies, design patterns, and project management.',
      credits: 3,
      duration: 16,
      semester: 'Spring 2024',
      status: 'Inactive'
    },
    {
      id: 'math-201',
      name: 'Linear Algebra',
      code: 'MATH201',
      description: 'Vector spaces, linear transformations, and matrices.',
      credits: 3,
      duration: 16,
      semester: 'Spring 2024',
      status: 'Active'
    }
  ];
  
  return courses;
};

// Generate mock professors
const generateProfessors = (): Professor[] => {
  const professors: Professor[] = [
    {
      id: 'prof-001',
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.johnson@university.edu',
      phone: '(555) 111-2222',
      department: 'Computer Science',
      specialization: 'Artificial Intelligence',
      joinDate: '2015-08-15',
      status: 'Active'
    },
    {
      id: 'prof-002',
      firstName: 'Jennifer',
      lastName: 'Smith',
      email: 'jennifer.smith@university.edu',
      phone: '(555) 222-3333',
      department: 'Mathematics',
      specialization: 'Calculus',
      joinDate: '2010-01-10',
      status: 'Active'
    },
    {
      id: 'prof-003',
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@university.edu',
      phone: '(555) 333-4444',
      department: 'Physics',
      specialization: 'Quantum Mechanics',
      joinDate: '2012-07-20',
      status: 'Active'
    },
    {
      id: 'prof-004',
      firstName: 'Sarah',
      lastName: 'Brown',
      email: 'sarah.brown@university.edu',
      phone: '(555) 444-5555',
      department: 'English',
      specialization: 'American Literature',
      joinDate: '2013-09-01',
      status: 'Active'
    },
    {
      id: 'prof-005',
      firstName: 'Michael',
      lastName: 'Miller',
      email: 'michael.miller@university.edu',
      phone: '(555) 555-6666',
      department: 'Biology',
      specialization: 'Molecular Biology',
      joinDate: '2018-01-15',
      status: 'Active'
    },
    {
      id: 'prof-006',
      firstName: 'Elizabeth',
      lastName: 'Davis',
      email: 'elizabeth.davis@university.edu',
      phone: '(555) 666-7777',
      department: 'Chemistry',
      specialization: 'Organic Chemistry',
      joinDate: '2014-08-10',
      status: 'Active'
    },
    {
      id: 'prof-007',
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@university.edu',
      phone: '(555) 777-8888',
      department: 'Computer Science',
      specialization: 'Database Systems',
      joinDate: '2016-01-05',
      status: 'Active'
    },
    {
      id: 'prof-008',
      firstName: 'Patricia',
      lastName: 'Moore',
      email: 'patricia.moore@university.edu',
      phone: '(555) 888-9999',
      department: 'Computer Science',
      specialization: 'Software Engineering',
      joinDate: '2019-08-20',
      status: 'Inactive'
    },
    {
      id: 'prof-009',
      firstName: 'Richard',
      lastName: 'Taylor',
      email: 'richard.taylor@university.edu',
      phone: '(555) 999-0000',
      department: 'Mathematics',
      specialization: 'Linear Algebra',
      joinDate: '2011-08-15',
      status: 'Active'
    },
    {
      id: 'prof-010',
      firstName: 'Jessica',
      lastName: 'Anderson',
      email: 'jessica.anderson@university.edu',
      phone: '(555) 000-1111',
      department: 'English',
      specialization: 'Composition',
      joinDate: '2017-08-15',
      status: 'Active'
    }
  ];
  
  return professors;
};

// Generate teaching assignments
const generateTeachingAssignments = (): TeachingAssignment[] => {
  const assignments: TeachingAssignment[] = [
    {
      id: 'ta-001',
      professorId: 'prof-001',
      courseId: 'cs-101',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      status: 'Active'
    },
    {
      id: 'ta-002',
      professorId: 'prof-007',
      courseId: 'cs-301',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      status: 'Active'
    },
    {
      id: 'ta-003',
      professorId: 'prof-002',
      courseId: 'math-101',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      status: 'Active'
    },
    {
      id: 'ta-004',
      professorId: 'prof-009',
      courseId: 'math-201',
      startDate: '2024-01-15',
      endDate: null,
      status: 'Active'
    },
    {
      id: 'ta-005',
      professorId: 'prof-004',
      courseId: 'eng-101',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      status: 'Active'
    },
    {
      id: 'ta-006',
      professorId: 'prof-003',
      courseId: 'phy-101',
      startDate: '2024-01-15',
      endDate: null,
      status: 'Active'
    },
    {
      id: 'ta-007',
      professorId: 'prof-005',
      courseId: 'bio-101',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      status: 'Active'
    },
    {
      id: 'ta-008',
      professorId: 'prof-006',
      courseId: 'chem-101',
      startDate: '2024-01-15',
      endDate: null,
      status: 'Active'
    },
    {
      id: 'ta-009',
      professorId: 'prof-008',
      courseId: 'cs-401',
      startDate: '2024-01-15',
      endDate: null,
      status: 'Cancelled'
    },
    {
      id: 'ta-010',
      professorId: 'prof-001',
      courseId: 'cs-201',
      startDate: '2024-01-15',
      endDate: null,
      status: 'Active'
    }
  ];
  
  return assignments;
};

// Generate course enrollments
const generateEnrollments = (): CourseEnrollment[] => {
  const enrollments: CourseEnrollment[] = [
    {
      id: 'enr-001',
      studentId: 'st-001',
      courseId: 'cs-101',
      enrollmentDate: '2023-08-25',
      status: 'Enrolled'
    },
    {
      id: 'enr-002',
      studentId: 'st-001',
      courseId: 'math-101',
      enrollmentDate: '2023-08-25',
      status: 'Enrolled'
    },
    {
      id: 'enr-003',
      studentId: 'st-002',
      courseId: 'cs-101',
      enrollmentDate: '2023-08-26',
      status: 'Enrolled'
    },
    {
      id: 'enr-004',
      studentId: 'st-002',
      courseId: 'eng-101',
      enrollmentDate: '2023-08-26',
      status: 'Enrolled'
    },
    {
      id: 'enr-005',
      studentId: 'st-003',
      courseId: 'bio-101',
      enrollmentDate: '2023-08-24',
      status: 'Enrolled'
    },
    {
      id: 'enr-006',
      studentId: 'st-003',
      courseId: 'cs-301',
      enrollmentDate: '2023-08-24',
      status: 'Enrolled'
    },
    {
      id: 'enr-007',
      studentId: 'st-004',
      courseId: 'cs-101',
      enrollmentDate: '2023-08-25',
      status: 'Dropped'
    },
    {
      id: 'enr-008',
      studentId: 'st-004',
      courseId: 'phy-101',
      enrollmentDate: '2023-12-20',
      status: 'Enrolled'
    },
    {
      id: 'enr-009',
      studentId: 'st-005',
      courseId: 'cs-401',
      enrollmentDate: '2023-08-25',
      status: 'Completed'
    },
    {
      id: 'enr-010',
      studentId: 'st-006',
      courseId: 'math-101',
      enrollmentDate: '2023-08-27',
      status: 'Enrolled'
    },
    {
      id: 'enr-011',
      studentId: 'st-007',
      courseId: 'eng-101',
      enrollmentDate: '2023-08-25',
      status: 'Enrolled'
    },
    {
      id: 'enr-012',
      studentId: 'st-008',
      courseId: 'cs-101',
      enrollmentDate: '2023-08-26',
      status: 'Enrolled'
    },
    {
      id: 'enr-013',
      studentId: 'st-009',
      courseId: 'math-201',
      enrollmentDate: '2023-12-20',
      status: 'Enrolled'
    },
    {
      id: 'enr-014',
      studentId: 'st-010',
      courseId: 'chem-101',
      enrollmentDate: '2023-12-21',
      status: 'Enrolled'
    },
    {
      id: 'enr-015',
      studentId: 'st-005',
      courseId: 'cs-301',
      enrollmentDate: '2023-08-25',
      status: 'Completed'
    }
  ];
  
  return enrollments;
};

// Generate marks/grades
const generateMarks = (): Mark[] => {
  const marks: Mark[] = [
    {
      id: 'mrk-001',
      studentId: 'st-001',
      courseId: 'cs-101',
      professorId: 'prof-001',
      marks: 88,
      grade: 'B+',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-20'
    },
    {
      id: 'mrk-002',
      studentId: 'st-001',
      courseId: 'math-101',
      professorId: 'prof-002',
      marks: 92,
      grade: 'A-',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-19'
    },
    {
      id: 'mrk-003',
      studentId: 'st-002',
      courseId: 'cs-101',
      professorId: 'prof-001',
      marks: 78,
      grade: 'C+',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-20'
    },
    {
      id: 'mrk-004',
      studentId: 'st-002',
      courseId: 'eng-101',
      professorId: 'prof-004',
      marks: 85,
      grade: 'B',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-18'
    },
    {
      id: 'mrk-005',
      studentId: 'st-003',
      courseId: 'bio-101',
      professorId: 'prof-005',
      marks: 90,
      grade: 'A-',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-19'
    },
    {
      id: 'mrk-006',
      studentId: 'st-003',
      courseId: 'cs-301',
      professorId: 'prof-007',
      marks: 82,
      grade: 'B-',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-21'
    },
    {
      id: 'mrk-007',
      studentId: 'st-005',
      courseId: 'cs-401',
      professorId: 'prof-008',
      marks: 95,
      grade: 'A',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-15'
    },
    {
      id: 'mrk-008',
      studentId: 'st-006',
      courseId: 'math-101',
      professorId: 'prof-002',
      marks: 88,
      grade: 'B+',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-19'
    },
    {
      id: 'mrk-009',
      studentId: 'st-007',
      courseId: 'eng-101',
      professorId: 'prof-004',
      marks: 72,
      grade: 'C',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-18'
    },
    {
      id: 'mrk-010',
      studentId: 'st-008',
      courseId: 'cs-101',
      professorId: 'prof-001',
      marks: 93,
      grade: 'A',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-20'
    },
    {
      id: 'mrk-011',
      studentId: 'st-005',
      courseId: 'cs-301',
      professorId: 'prof-007',
      marks: 91,
      grade: 'A-',
      semester: 'Fall 2023',
      academicYear: '2023-2024',
      submissionDate: '2023-12-21'
    }
  ];
  
  return marks;
};

// Current User (Admin by default)
const currentUser: User = {
  id: 'user-001',
  name: 'Admin User',
  email: 'admin@studentforce.edu',
  role: 'Admin',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
};

// Generate initial mock data
export const generateInitialData = (): DataState => {
  return {
    students: generateStudents(),
    courses: generateCourses(),
    professors: generateProfessors(),
    marks: generateMarks(),
    enrollments: generateEnrollments(),
    assignments: generateTeachingAssignments(),
    currentUser
  };
};
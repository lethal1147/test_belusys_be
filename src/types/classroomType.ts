export type GetAllClassroomFilterType = {
  classroomid?: number;
  classname?: string;
  homeroomTeacher?: string;
};

type StudentInClassroom = {
  studentid: number;
  firstname: string;
  lastname: string;
  prefix: {
    prefixid: number;
    prefixname: string;
  };
  birthdate: Date;
};

export type GetAllClassroomWithStudentFormatType = {
  classroomid: number;
  classname: string;
  academic_year: string;
  homeroom_teacher: string;
  students: StudentInClassroom[];
};

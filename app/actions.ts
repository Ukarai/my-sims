"use server";
import { prisma } from "../prisma/client";

// Students
export async function createStudent(
  firstName: string,
  surename: string,
  classId: number
) {
  const newStudent = await prisma.student.create({
    data: {
      firstName: firstName,
      surename: surename,
      classId: classId,
    },
  });

  return newStudent;
}

export async function deleteStudent(studentId: number) {
  return prisma.student.delete({
    where: {
      id: studentId,
    },
  });
}

export async function getAllStudents() {
  return prisma.student.findMany();
}

//Classes
export async function createClass(name: string) {
  const newClass = await prisma.class.create({
    data: {
      name: name,
    },
  });

  return newClass;
}

export async function getAllClasses() {
  return prisma.class.findMany();
}

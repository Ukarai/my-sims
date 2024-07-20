"use server";
import { prisma } from "../prisma/client";

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

export async function createClass(name: string) {
  const newClass = await prisma.class.create({
    data: {
      name: name,
    },
  });

  return newClass;
}

export async function fetchStudents() {
  return prisma.student.findMany();
}

export async function fetchClasses() {
  return prisma.class.findMany();
}

export async function deleteStudent(studentId: number) {
  return prisma.student.delete({
    where: {
      id: studentId,
    },
  });
}

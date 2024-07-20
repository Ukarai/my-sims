"use server";
import { prisma } from "../prisma/client";

export async function createStudent(
  firstName: string,
  surename: string,
  classId: number
) {
  "use server";
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
  "use server";
  const newClass = await prisma.class.create({
    data: {
      name: name,
    },
  });

  return newClass;
}

export async function fetchStudents() {
  "use server";
  return prisma.student.findMany();
}

export async function fetchClasses() {
  "use server";
  return prisma.class.findMany();
}

export async function deleteStudent(studentId: number) {
  "use server";
  return prisma.student.delete({
    where: {
      id: studentId,
    },
  });
}

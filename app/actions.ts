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

export async function getStudentsFromClass(classId: number) {
  return prisma.student.findMany({
    where: {
      classId: classId,
    },
  });
}

export async function getStudentsInClasses(
  classIds: number[] | undefined = []
) {
  return prisma.student.findMany({
    where: {
      classId: { in: classIds },
    },
  });
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

export async function getClasses(ids: number[]) {
  return prisma.class.findMany({
    where: {
      id: { in: ids },
    },
  });
}

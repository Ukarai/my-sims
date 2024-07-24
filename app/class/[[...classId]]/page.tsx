"use client";

import StudentTable from "@/app/_components/student-table";
import { getAllClasses, getAllStudents, getClasses } from "@/app/actions";
import { Button } from "@mui/material";
import { Class, Student } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ClassPage({
  params,
}: {
  params: { classId: string[] };
}) {
  const [classData, setClassData] = useState<Class[]>();
  const [students, setStudents] = useState<Student[]>();

  useEffect(() => {
    async function load() {
      let initClassData;
      const studentData = await getAllStudents();

      if (params.classId === undefined) {
        initClassData = await getAllClasses();
      } else {
        initClassData = await getClasses(
          params.classId.map((a: string) => Number(a))
        );
      }

      setStudents(studentData);
      setClassData(initClassData);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-left flex-wrap ml-12 mt-4 gap-2">
      <div className="flex flex-row gap-2 text-3xl mx-auto">
        Class:{" "}
        {classData?.map((c: Class, i: number) => (
          <h1 key={i}>{c.name}</h1>
        ))}
      </div>

      <div className="text-2xl">
        Total:{" "}
        {
          students?.filter((s: Student) =>
            classData?.map((c: Class) => c.id).includes(s.classId)
          ).length
        }
      </div>
      <Button variant="contained" className="max-w-fit bg-primary">
        New Student
      </Button>
      <StudentTable
        students={students}
        classes={classData?.map((c: Class, i) => c.id)}
      />
    </div>
  );
}

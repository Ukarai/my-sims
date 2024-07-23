"use client";

import StudentTable from "@/app/_components/student-table";
import { getAllClasses, getAllStudents, getClasses } from "@/app/actions";
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
    <div className="flex flex-col items-left flex-wrap ml-12 mt-12 gap-2">
      <div>
        {
          students?.filter((s: Student) =>
            classData?.map((c: Class) => c.id).includes(s.classId)
          ).length
        }{" "}
        Students
      </div>
      <StudentTable
        students={students}
        classes={params.classId?.map((a: string) => Number(a))}
      />
    </div>
  );
}

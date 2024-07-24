"use client";

import StudentTable from "@/app/_components/student-table";
import AddStudentForm from "@/app/_forms/add-student-form";
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
  const [showNewStudentForm, setShowNewStudentForm] = useState<Boolean>(false);

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

  const revalidateStudents = async () => {
    const studentData = await getAllStudents();

    setStudents(studentData);
  };

  if (classData === undefined) {
    return <div>Uh oh</div>;
  }

  return (
    <div className="flex flex-col items-left flex-wrap ml-12 mt-4 gap-2">
      <div className="flex flex-row gap-2 text-3xl mx-auto">
        Class:{" "}
        {params.classId === undefined
          ? "All"
          : classData?.map((c: Class, i: number) => <h1 key={i}>{c.name}</h1>)}
      </div>

      <div className="text-2xl">
        Total:{" "}
        {
          students?.filter((s: Student) =>
            classData?.map((c: Class) => c.id).includes(s.classId)
          ).length
        }
      </div>
      {}

      {showNewStudentForm ? (
        <div className="max-w-fit border-primary border-solid border-2 rounded-xl">
          <AddStudentForm
            setShowForm={setShowNewStudentForm}
            classes={classData}
            revalidateStudents={revalidateStudents}
          />
        </div>
      ) : (
        <Button
          variant="contained"
          className="max-w-fit bg-primary"
          onClick={() => setShowNewStudentForm(!showNewStudentForm)}
        >
          New Student
        </Button>
      )}
      <StudentTable
        students={students}
        classes={classData?.map((c: Class, i) => c.id)}
      />
    </div>
  );
}

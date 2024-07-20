"use client";
import { useEffect, useState } from "react";
import { Class } from "@prisma/client";
import StudentTable from "./_components/student-table";
import { getAllClasses, getAllStudents } from "./actions";

export default function Home() {
  const [classes, setClasses] = useState<Class[] | null>(null);

  useEffect(() => {
    async function load() {
      const initClasses = await getAllClasses();
      setClasses(initClasses);
    }

    load();
  }, []);

  if (classes === null) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="flex flex-row items-left flex-wrap ml-12 mt-12 gap-8">
        <StudentTable classes={classes?.map((a) => a.id)} />
      </div>
    </>
  );
}

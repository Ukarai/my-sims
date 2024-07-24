"use client";

import { Card } from "@mui/material";
import { Class } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllClasses } from "../actions";
import Link from "next/link";

const ClassList = () => {
  const [classList, setClassList] = useState<Class[]>();

  useEffect(() => {
    async function load() {
      const allClasses = await getAllClasses();

      setClassList(allClasses);
    }

    load();
  }, []);

  return (
    <div className="flex flex-row gap-6">
      {classList?.map((classData: Class, index: number) => {
        return (
          <Link href={`/class/${classData.id}`} key={index}>
            <Card className="p-4 border-primary border-2 text-2xl">
              <h1>Class: {classData.name}</h1>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ClassList;

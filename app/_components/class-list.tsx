"use client";

import { Card } from "@mui/material";
import { Class } from "@prisma/client";
import Link from "next/link";

const ClassCard = ({ dest, name }: { dest: string; name: string }) => {
  return (
    <Link href={dest}>
      <Card className="p-4 border-primary border-2 text-2xl">
        <h1>Class: {name}</h1>
      </Card>
    </Link>
  );
};

const ClassList = ({ classList }: { classList: Class[] }) => {
  return (
    <div className="flex flex-row gap-6">
      <ClassCard dest={"/class/"} name={"All"} />
      {classList?.map((classData: Class, index: number) => {
        return (
          <ClassCard
            key={index}
            dest={`/class/${classData.id}`}
            name={classData.name}
          />
        );
      })}
    </div>
  );
};

export default ClassList;

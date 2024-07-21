"use client";
import { useEffect, useState } from "react";
import { Class } from "@prisma/client";
import StudentTable from "./_components/student-table";
import { getAllClasses, getAllStudents } from "./actions";

export default function Home() {
  return (
    <div className="flex flex-row items-left flex-wrap ml-12 mt-12 gap-8">
      <StudentTable classes={[]} />
    </div>
  );
}

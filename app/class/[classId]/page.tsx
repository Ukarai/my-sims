"use client";

import StudentTable from "@/app/_components/student-table";

export default function ClassPage({ params }: { params: { classId: String } }) {
  return (
    <div className="flex flex-row items-left flex-wrap ml-12 mt-12 gap-8">
      <StudentTable classes={[Number(params.classId)]} />
    </div>
  );
}

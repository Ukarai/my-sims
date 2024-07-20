"use client";
import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Student, Class } from "@prisma/client";
import StudentTable from "./_components/student-table";
import AddStudentForm from "./_forms/add-student-form";
import AddClassForm from "./_forms/add-class-form";
import { getAllClasses, getAllStudents } from "./actions";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showAddClassForm, setShowAddClassForm] = useState(false);

  useEffect(() => {
    async function load() {
      const initialStudents = await getAllStudents();
      const initialClasses = await getAllClasses();

      setStudents(initialStudents);
      setClasses(initialClasses);
    }

    load();
  }, []);

  return (
    <>
      <div className="flex flex-row items-left flex-wrap ml-12 mt-12 gap-8">
        <StudentTable students={students} classes={classes} />

        {showAddStudentForm ? (
          <Paper className="max-w-fit max-h-fit">
            <AddStudentForm
              students={students}
              setStudents={setStudents}
              setShowAddStudentForm={setShowAddStudentForm}
              setShowAddClassForm={setShowAddClassForm}
              classes={classes}
            />
          </Paper>
        ) : showAddClassForm ? (
          <Paper className="max-w-fit max-h-fit">
            <AddClassForm
              classes={classes}
              setClasses={setClasses}
              setShowAddClassForm={setShowAddClassForm}
              setShowAddStudentForm={setShowAddStudentForm}
            />
          </Paper>
        ) : (
          <div className="flex flex-col gap-4">
            <Button
              variant="outlined"
              onClick={() => {
                setShowAddStudentForm(true);
                setShowAddClassForm(false);
              }}
            >
              Add Student
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setShowAddStudentForm(false);
                setShowAddClassForm(true);
              }}
            >
              Add Class
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

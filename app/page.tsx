"use client";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ClassList from "./_components/class-list";
import { useEffect, useState } from "react";
import AddClassForm from "./_forms/add-class-form";
import { getAllClasses } from "./actions";
import { Class } from "@prisma/client";

export default function Home() {
  const [openNewClassForm, setOpenNewClassForm] = useState<boolean>(false);
  const [classList, setClassList] = useState<Class[]>();

  const refreshList = async () => {
    const allClasses = await getAllClasses();

    setClassList(allClasses);
  };

  useEffect(() => {
    refreshList();
  }, []);

  if (classList === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <Button
        variant="contained"
        className="bg-primary mb-4"
        onClick={() => setOpenNewClassForm(!openNewClassForm)}
      >
        New Class
      </Button>

      <Dialog open={openNewClassForm}>
        <DialogTitle>New Class Details</DialogTitle>
        <DialogContent>
          <AddClassForm
            refreshClassList={refreshList}
            setShowAddClassForm={setOpenNewClassForm}
          />
        </DialogContent>
      </Dialog>

      <ClassList classList={classList} />
    </div>
  );
}

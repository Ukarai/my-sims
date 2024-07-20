import { Button, Input, Select, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { createClass } from "../actions";

const AddClassForm = ({ classes, setClasses, setShowAddClassForm }: any) => {
  const [newClassName, setNewClassName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let classesCopy = classes;
    let newClass = await createClass(newClassName);

    classesCopy.push(newClass);

    setClasses(classesCopy);
    setNewClassName("");
    setShowAddClassForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="m-4 flex flex-col gap-4">
      <TextField
        value={newClassName}
        placeholder="Class Name"
        onChange={(e) => setNewClassName(e.target.value)}
      />
      <div className="flex justify-evenly gap-2">
        <Button type="submit" variant="contained" className="bg-primary flex-1">
          Add
        </Button>
        <Button
          variant="contained"
          color="error"
          className="flex-1"
          onClick={() => setShowAddClassForm(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddClassForm;

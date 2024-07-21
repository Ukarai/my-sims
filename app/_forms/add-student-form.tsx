import {
  Select,
  MenuItem,
  Button,
  InputLabel,
  SelectChangeEvent,
  FormControl,
  TextField,
  Stack,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { createStudent } from "../actions";
import { Class } from "@prisma/client";

const AddStudentForm = ({
  students,
  setStudents,
  setShowAddStudentForm,
  classes,
}: any) => {
  const [firstName, setFirstName] = useState<string>("");
  const [surename, setSurename] = useState<string>("");
  const [classId, setClassId] = useState<number>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const added = students;
    const toAdd = await createStudent(firstName, surename, classId as number);

    added.push(toAdd);
    setStudents(added);
    setFirstName("");
    setSurename("");
    setShowAddStudentForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="m-4 flex flex-col gap-4">
      <FormControl>
        <TextField
          className="border-2 "
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
        />
      </FormControl>
      <FormControl>
        <TextField
          className="border-2 "
          name="surename"
          value={surename}
          onChange={(e) => setSurename(e.target.value)}
          label="Surename"
          required
        />
      </FormControl>
      <FormControl>
        <InputLabel id="select-class-label">Class</InputLabel>
        <Select
          labelId="select-class-label"
          label="Class"
          value={classId as any}
          autoWidth
          onChange={(e: SelectChangeEvent) => setClassId(e.target.value as any)}
        >
          {classes.map((a: Class) => (
            <MenuItem key={a.id} value={a.id}>
              {a.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" className="bg-primary flex-1">
          Add
        </Button>
        <Button
          variant="contained"
          color="error"
          className="flex-1"
          onClick={() => setShowAddStudentForm(false)}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default AddStudentForm;

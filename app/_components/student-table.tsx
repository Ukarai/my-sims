import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  Popover,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Class, Student } from "@prisma/client";
import { Dispatch, useState } from "react";
import { deleteStudent } from "../actions";

const StudentTable = ({
  students,
  classes,
  setStudents,
}: {
  students: Student[];
  classes: Class[];
  setStudents: Dispatch<Student[]>;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setDeleteIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteIndex(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getClassName = (id: number) => {
    let nameOfClass = "";

    classes.forEach((c: Class) => {
      if (c.id === id) {
        nameOfClass = c.name;
        return;
      }
    });

    return nameOfClass;
  };

  const deleteUser = async (index: number | null) => {
    if (index === null) return;

    const action = await deleteStudent(index);

    if (action !== null) {
      let currentStudents = students;
      let studentIndex = currentStudents.indexOf(action);

      if (index > -1) {
        currentStudents.splice(studentIndex, 1);
      }

      handleClose();
      setStudents(currentStudents);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        className="max-w-fit max-h-fit rounded-xl "
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-primary text-white">
                First Name
              </TableCell>
              <TableCell className="bg-primary text-white">Surename</TableCell>
              <TableCell className="bg-primary text-white">Class</TableCell>
              <TableCell className="bg-primary text-white">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records available
                </TableCell>
              </TableRow>
            ) : (
              students?.map((s: Student, i: number) => (
                <TableRow key={i}>
                  <TableCell className="border-r-[1px] border-gray-200 py-0">
                    {s.firstName}
                  </TableCell>
                  <TableCell className="border-r-[1px] border-gray-200 py-0">
                    {s.surename}
                  </TableCell>
                  <TableCell className="border-r-[1px] border-gray-200 py-0">
                    {getClassName(s.classId)}
                  </TableCell>
                  <TableCell className="border-r-[1px] border-gray-200 flex py-0">
                    <Button onClick={(e) => handleClick(e, s.id)}>
                      <MoreHorizOutlinedIcon className="mx-auto" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteUser(deleteIndex)}
        >
          Delete
        </Button>
      </Popover>
    </>
  );
};

export default StudentTable;

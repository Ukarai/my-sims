import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { Class, Student } from "@prisma/client";
import { useEffect, useState } from "react";
import { getClasses } from "../actions";

const StudentTable = ({
  students,
  classes,
}: {
  students: Student[] | undefined;
  classes: number[];
}) => {
  const [classData, setClasses] = useState<Class[] | undefined>();

  useEffect(() => {
    async function load() {
      const loadClassData = await getClasses(classes);

      setClasses(loadClassData);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClassName = (id: number) => {
    let name = "";

    classData?.forEach((c: Class) => {
      if (c.id === id) {
        name = c.name;
        return;
      }
    });

    return name;
  };

  return (
    <TableContainer
      component={Paper}
      className="max-w-fit max-h-fit rounded-xl "
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="bg-primary text-white">First Name</TableCell>
            <TableCell className="bg-primary text-white">Surename</TableCell>
            <TableCell className="bg-primary text-white">Class</TableCell>
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
            students
              ?.filter((s: Student) => classes?.includes(s.classId))
              .map((s: Student, i: number) => (
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
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;

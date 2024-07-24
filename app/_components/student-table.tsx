import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { Student } from "@prisma/client";

const StudentTable = ({
  students,
  classes,
}: {
  students: Student[] | undefined;
  classes: number[] | undefined;
}) => {
  return (
    <TableContainer
      component={Paper}
      className="max-w-fit max-h-fit rounded-xl "
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="bg-primary text-white text-2xl">
              First Name
            </TableCell>
            <TableCell className="bg-primary text-white text-2xl">
              Surename
            </TableCell>
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
                  <TableCell className="border-r-[1px] border-gray-200 py-0 text-2xl">
                    {s.firstName}
                  </TableCell>
                  <TableCell className="border-r-[1px] border-gray-200 py-0 text-2xl">
                    {s.surename}
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

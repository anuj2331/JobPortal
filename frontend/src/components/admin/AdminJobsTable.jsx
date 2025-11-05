import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Table className="min-w-full text-sm sm:text-base">
          <TableCaption className="text-gray-500 mt-3 text-center">
            A list of your recently posted jobs
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold text-gray-700">
                Company Name
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Role
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Date
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs?.length > 0 ? (
              filterJobs.map((job, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="whitespace-nowrap py-3 px-4 text-gray-700 font-medium">
                    {job?.company?.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-4 text-gray-700">
                    {job?.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-4 text-gray-600">
                    {job?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right py-3 px-4 cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="hover:text-[#6A38C2] transition duration-200" />
                      </PopoverTrigger>
                      <PopoverContent className="w-36 bg-white shadow-lg rounded-lg border border-gray-100">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                          className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer transition"
                        >
                          <Edit2 className="w-4 text-[#6A38C2]" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer transition mt-1"
                        >
                          <Eye className="w-4 text-[#6A38C2]" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))
            ) : (
              <tr>
                <TableCell
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No jobs found
                </TableCell>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;

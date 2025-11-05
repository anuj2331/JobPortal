





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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-full border-collapse">
        <TableCaption className="text-sm text-gray-500 mt-4">
          A list of your recent registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="font-semibold text-sm sm:text-base px-4 py-3">
              Logo
            </TableHead>
            <TableHead className="font-semibold text-sm sm:text-base px-4 py-3">
              Name
            </TableHead>
            <TableHead className="font-semibold text-sm sm:text-base px-4 py-3">
              Date
            </TableHead>
            <TableHead className="font-semibold text-sm sm:text-base text-right px-4 py-3">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.length > 0 ? (
            filterCompany.map((company, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition-all duration-200 border-b last:border-none"
              >
                <TableCell className="px-4 py-3">
                  <Avatar className="w-10 h-10 mx-auto sm:mx-0">
                    <AvatarImage src={company.logo} alt="Company Logo" />
                  </Avatar>
                </TableCell>

                <TableCell className="text-gray-800 text-sm sm:text-base px-4 py-3 whitespace-nowrap text-center sm:text-left">
                  {company.name}
                </TableCell>

                <TableCell className="text-gray-600 text-sm sm:text-base px-4 py-3 whitespace-nowrap text-center sm:text-left">
                  {company.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className="text-right px-4 py-3">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mx-auto sm:mx-0" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#6A38C2] cursor-pointer transition-all duration-150"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan="4"
                className="text-center text-gray-500 py-6 text-sm sm:text-base"
              >
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;



  


import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="w-full px-3 sm:px-6 lg:px-10 py-6">
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
                <Table className="min-w-full text-sm sm:text-base">
                    <TableCaption className="text-gray-600 py-3 text-xs sm:text-sm">
                        A list of your applied jobs
                    </TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="whitespace-nowrap px-3 sm:px-5 py-3 text-gray-700 font-semibold text-left">Date</TableHead>
                            <TableHead className="whitespace-nowrap px-3 sm:px-5 py-3 text-gray-700 font-semibold text-left">Job Role</TableHead>
                            <TableHead className="whitespace-nowrap px-3 sm:px-5 py-3 text-gray-700 font-semibold text-left">Company</TableHead>
                            <TableHead className="whitespace-nowrap px-3 sm:px-5 py-3 text-gray-700 font-semibold text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500 py-6 text-sm sm:text-base">
                                    You haven’t applied for any jobs yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow
                                    key={appliedJob._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell className="px-3 sm:px-5 py-2">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="px-3 sm:px-5 py-2 font-medium">{appliedJob.job?.title}</TableCell>
                                    <TableCell className="px-3 sm:px-5 py-2">{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right px-3 sm:px-5 py-2">
                                        <Badge
                                            className={`${
                                                appliedJob?.status === "rejected"
                                                    ? 'bg-red-400 text-white'
                                                    : appliedJob.status === 'pending'
                                                    ? 'bg-gray-400 text-white'
                                                    : 'bg-green-400 text-white'
                                            } text-xs sm:text-sm px-2 py-1 rounded-full`}
                                        >
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AppliedJobTable;

import { useEffect, useState } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import { getAllStudentData } from "../services/api";
import { EyeFill, TrashFill } from 'react-bootstrap-icons';

export default function AllStudents() {
    const [studentData, setStudentData] = useState([]);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getAllStudentData(currentPage, query, setStudentData, setTotalPages);
    }, [currentPage, query]);

    const handleSearchChange = (e: any) => {
        setQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <Container className="mt-4 p-3 pt-4 pb-2 px-3 shadow-sm rounded">
            <h2 className="mb-4">All Members</h2>

            {/* Search Input */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search by name or email..."
                        value={query}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
                <Button>Add New Member</Button>
            </div>

            {/* Student Data Table */}
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData?.length > 0 ? (
                        studentData?.map((student: any) => (
                            <tr key={student.id}>
                                <td>{student.parentId}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{new Date(student.createdAt).toLocaleDateString('en-GB')}</td>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <Button variant="info">
                                            <EyeFill />
                                        </Button>
                                        <Button variant="danger">
                                            <TrashFill />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="text-center">No students found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-end align-items-center gap-1">
                <Button>First</Button>
                <Button>Previous</Button>
                <Button>Page</Button>
                <Button>Next</Button>
                <Button>Last</Button>
            </div>
        </Container>
    );
}

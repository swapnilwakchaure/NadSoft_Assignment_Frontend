const BASE_URL = "http://localhost:8080/api";

async function getAllStudentData(page = 1, searchQuery = "", setStudentData: any, setTotalPages: any) {
    try {
        const response = await fetch(`${BASE_URL}/student?page=${page}&limit=5&query=${searchQuery}`);
        const data = await response.json();
        setStudentData(data?.data);
        setTotalPages(data.pagination.totalPages);
    } catch (error) {
        console.log("error: ", error);
    }
}

export { getAllStudentData };
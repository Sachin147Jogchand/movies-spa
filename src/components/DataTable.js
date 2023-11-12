import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const columns = [
    {
        field: 'poster',
        headerName: 'Poster',
        flex: 1,
        renderCell: (params) => (
            <img
                src={params.value} // Assuming the 'poster' field contains the URL of the image
                alt={`Poster for ${params.row.name}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        ),
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'year', headerName: 'Year', flex: 1 },
    { field: 'genre', headerName: 'Genre', flex: 1 },
    { field: 'rating', headerName: 'Rating', flex: 1 },
];

const DataTable = ({ data }) => {
    const navigator = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState(
        sessionStorage.getItem('searchTerm') || ''
    );
    const [filteredData, setFilteredData] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
    };

    React.useEffect(() => {
        sessionStorage.setItem('searchTerm', searchTerm);

        const searchData =
            data &&
            data.filter((item) => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                return (
                    (item.name &&
                        item.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
                    (item.year &&
                        item.year.toLowerCase().includes(lowerCaseSearchTerm)) ||
                    (item.genre &&
                        item.genre.toLowerCase().includes(lowerCaseSearchTerm)) ||
                    (item.rating &&
                        item.rating.toLowerCase().includes(lowerCaseSearchTerm))
                );
            });
        setFilteredData(searchData.map((item, index) => ({ ...item, id: index })));
    }, [searchTerm, data]);

    return (
        <div className="table-container">
            <input
                type="text"
                style={{
                    margin: '0 0 10px 6px',
                    height: '30px',
                    border: '1px solid #00000052',
                    width: '300px',
                }}
                className="search_input"
                placeholder="Search by name, protein, date, etc."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <style>
                {`
          .search_input:focus {
            outline: none; /* Remove the focus outline */
          }
        `}
            </style>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={handlePageSizeChange}
                    pagination
                    paginationMode="server"
                    pageSizeOptions={[10, 20, 50, -1]} // -1 represents "All"
                    onRowClick={(params) =>
                        navigator(`/details/?id=${params.row.imdbID}`)
                    }
                />
            </div>
        </div>
    );
};

export default DataTable;

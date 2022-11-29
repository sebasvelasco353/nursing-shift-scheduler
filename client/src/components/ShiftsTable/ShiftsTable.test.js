import { render, screen } from '@testing-library/react';
import ShiftsTable from './ShiftsTable';

const rows = [
    {
        "id": 0,
        "name": "MedSurg1",
        "startTime": "2022-11-26T00:00:00Z",
        "endTime": "2022-11-27T00:00:00Z",
        "nursesId": [
            76543,
            52974
        ],
        "qualificationLevel": "LPN",
        "nurses": [
            "{firstName: \"Barbara\", id: 76543, lastName: \"Andrad…}",
            "{firstName: \"Claudia\", id: 52974, lastName: \"Melend…}"
        ]
    },
    {
        "id": 0,
        "name": "MedSurg1",
        "startTime": "2022-11-26T00:00:00Z",
        "endTime": "2022-11-27T00:00:00Z",
        "nursesId": [],
        "qualificationLevel": "LPN",
        "nurses": []
    }
]

it('Should render the Table with content when rows prop is different than null', () => {
    render(<ShiftsTable rows={rows} />);
    const Table = screen.getByTestId('shiftsTable');
    expect(Table).toBeInTheDocument();
});

it('Should no render the Table when rows prop is null', () => {
    render(<ShiftsTable rows={null} />);
    const Table = screen.queryByTestId('shiftsTable');
    expect(Table).not.toBeInTheDocument();
});

it('Should render the loading animation when rows prop is null', () => {
    render(<ShiftsTable rows={null} />);
    const Table = screen.getByTestId('loading');
    expect(Table).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import ShiftsTable from './ShiftsTable';

const rows = [
    {
        "id": 0,
        "name": "MedSurg1",
        "startTime": "2022-11-26T00:00:00Z",
        "endTime": "2022-11-27T00:00:00Z",
        "nurseId": null,
        "qualificationLevel": "LPN"
    },
    {
        "id": 1,
        "name": "MedSurg2",
        "startTime": "2022-11-27T00:00:00Z",
        "endTime": "2022-11-28T00:00:00Z",
        "nurseId": 345768,
        "qualificationLevel": "CNA",
        "nurse": {
            "id": 345768,
            "firstName": "Bradley",
            "lastName": "Fletcher",
            "username": "a.a",
            "qualificationLevel": "RN"
        }
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

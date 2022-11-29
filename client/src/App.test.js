import { render, screen } from '@testing-library/react';
import App from './App';

it('Should render the header with the set shift Button', () => {
    render(<App />);
    const header = screen.getByTestId('app-header');
    const setShiftButton = screen.getByTestId('setShiftButton');
    expect(header).toBeInTheDocument();
    expect(setShiftButton).toBeInTheDocument();
});

it('Should render the table container and should not be empty', () => {
    render(<App />);
    const tableContainer = screen.getByTestId('tableContainer');
    expect(tableContainer).toBeInTheDocument();
    expect(tableContainer).not.toBeEmptyDOMElement();
});

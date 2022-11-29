import { render, screen } from '@testing-library/react';
import ShiftModal from './ShiftModal';

it('Should render the modal if prop open is true', () => {
    render(<ShiftModal open={true} />);
    const modal = screen.getByTestId('shiftModalComponent');
    expect(modal).toBeInTheDocument();
});

it('Should not render the modal if prop open is false', () => {
    render(<ShiftModal open={false} />);
    const modal = screen.queryByTestId('shiftModalComponent');
    expect(modal).not.toBeTruthy();
});

it('Should have a header with the text "Set Shift Assignment"', () => {
    render(<ShiftModal open={true}/>);
    const h1 = screen.getByText("Set Shift Assignment");
    expect(h1).toBeInTheDocument();
});
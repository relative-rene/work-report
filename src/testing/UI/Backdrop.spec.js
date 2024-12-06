import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Backdrop from '../../components/UI/Backdrop';

describe('Backdrop Component', () => {
  it('renders and adds the `--open-modal` class to body when shown', () => {
    render(<Backdrop show={true} clicked={() => {}} />);

    const backdropElement = screen.getByRole('presentation'); // Access using ARIA role for semantic testing
    expect(backdropElement).toBeInTheDocument();
    expect(document.body.classList).toContain('--open-modal'); // Verify class addition
  });

  it('removes the `--open-modal` class from body when hidden', () => {
    render(<Backdrop show={false} clicked={() => {}} />);

    expect(document.body.classList).not.toContain('--open-modal'); // Verify class removal
  });

  it('triggers the `clicked` prop function on click', () => {
    const mockClicked = jest.fn();
    render(<Backdrop show={true} clicked={mockClicked} />);

    const backdropElement = screen.getByRole('presentation');
    userEvent.click(backdropElement);

    expect(mockClicked).toHaveBeenCalledTimes(1);
  });
});
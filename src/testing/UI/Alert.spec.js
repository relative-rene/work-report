import React from 'react';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Alert from '../../components/UI/Alert';

describe('Alert Component', () => {
    it('renders the alert message with the correct class', () => {
        render(<Alert alertType="success" message="Success message" />)

        const alertElement = screen.getByText('Success message');
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveClass('alert success');
    });

    it('triggers the handleClick function on click', () => {
        const handleClick = jest.fn();
        render(<Alert alertType="error" message="Error message" handleClick={handleClick} />);

        const alertElement = screen.getByText('Error message');
        userEvent.click(alertElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
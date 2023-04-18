import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Avatar } from './Avatar';

const messages = {
    'user.avatar.alt': "{name}'s avatar picture",
    'user.avatar.online': '{name} is here',
};

describe('Avatar', () => {
    const defaultProps = {
        avatarUrl: 'https://example.com/avatar.jpg',
        userName: 'John',
        isOnline: true,
        className: 'custom-class',
    };

    it('renders user profile picture with alt text', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...defaultProps} />
            </IntlProvider>
        );
        const avatarImg = screen.getByAltText("John's avatar picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', 'https://example.com/avatar.jpg');
        expect(avatarImg).toHaveAttribute('height', '40');
        expect(avatarImg).toHaveAttribute('width', '40');
        expect(avatarImg).toHaveClass('custom-class');
    });

    it('renders user online status when isOnline prop is true', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...defaultProps} />
            </IntlProvider>
        );
        const onlinePin = screen.getByTestId('online-pin');
        expect(onlinePin).toBeInTheDocument();
        expect(onlinePin).toHaveClass('onlinePin');
    });

    it('renders user offline status when isOnline prop is false', () => {
        const props = { ...defaultProps, isOnline: false };
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...props} />
            </IntlProvider>
        );
        const onlinePin = screen.queryByTestId('online-pin');
        expect(onlinePin).not.toBeInTheDocument();
    });

    it('renders tooltip with online status message when isOnline prop is true', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...defaultProps} />
            </IntlProvider>
        );
        const onlineTooltip = screen.getByText('John is here');
        expect(onlineTooltip).toBeInTheDocument();
        expect(onlineTooltip).toHaveClass('tooltipText');
    });

    it('does not render tooltip when isOnline prop is false', () => {
        const props = { ...defaultProps, isOnline: false };
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...props} />
            </IntlProvider>
        );
        const onlineTooltip = screen.queryByText('John is here');
        expect(onlineTooltip).not.toBeInTheDocument();
    });
});
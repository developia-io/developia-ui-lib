module.exports = ({ addComponents, theme }) => {
    const buttons = {
        '.btn': {
            padding: '.5rem 1rem',
            borderRadius: theme('borderRadius.md'),
            fontWeight: '600',
            display: 'inline-block',
            textAlign: 'center',
        },
        '.btn-solid': {
            backgroundColor: theme('colors.blue.500'),
            color: theme('colors.white'),
            '&:hover': {
                backgroundColor: theme('colors.blue.600'),
            },
        },
        '.btn-outline': {
            backgroundColor: 'transparent',
            color: theme('colors.blue.500'),
            border: '2px solid',
            borderColor: theme('colors.blue.500'),
            '&:hover': {
                backgroundColor: theme('colors.blue.500'),
                color: theme('colors.white'),
            },
        },
        '.btn-ghost': {
            backgroundColor: 'transparent',
            color: theme('colors.blue.500'),
            '&:hover': {
                backgroundColor: theme('colors.blue.100'),
            },
        },
        // Additional styles can be added here
    };

    addComponents(buttons);
};

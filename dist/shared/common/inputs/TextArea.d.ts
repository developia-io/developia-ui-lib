import * as react from 'react';

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
    optional?: boolean;
};
declare const TextArea: ({ className, optional, ...rest }: Props) => react.JSX.Element;

export { TextArea as default };

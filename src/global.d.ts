import * as React from 'react';

declare global {
    namespace JSX {
        type Element = React.ReactElement<any, any>;

        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

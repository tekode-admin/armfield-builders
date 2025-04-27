import React from 'react';
import { Provider } from 'react-redux';
import { Link } from 'gatsby'
import store from './reduxStore';
import { PrismicProvider } from '@prismicio/react'


const ReduxWrapper = ({ element }) => (
    {element}
    // <PrismicProvider
    //     internalLinkComponent={({ href, ...props }) => (
    //         <Link to={href} {...props} />
    //     )}
    // >
    //     <Provider store={store}>{element}</Provider>
    // </PrismicProvider>
);

export default ReduxWrapper; 
import React from 'react';
import { Helmet } from 'react-helmet';

const Headtitle = ({ title }) => {

    return (
        <Helmet>
            <title>{`Password Management - ${title}`}</title>
        </Helmet>
    )
}

export default Headtitle;
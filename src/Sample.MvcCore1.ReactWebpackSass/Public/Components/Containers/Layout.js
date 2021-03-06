import React, { PropTypes } from 'react';

const Layout = ({ children }) => (
    <div>
        {children}
    </div>
);

Layout.propTypes = {
    children: PropTypes.object.isRequired
};

export default Layout;

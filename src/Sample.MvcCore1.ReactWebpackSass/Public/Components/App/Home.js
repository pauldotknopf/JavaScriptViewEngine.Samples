import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Home = ({ model, viewBag }) => (
    <div>
        <p>
            <strong>Model:</strong>
            {JSON.stringify(model)}
        </p>
        <p>
            <strong>ViewBag:</strong>
            {JSON.stringify(viewBag)}
        </p>
    </div>
);

Home.propTypes = {
    model: PropTypes.object.isRequired,
    viewBag: PropTypes.object
};

export default connect(
    state => ({
        model: state.model,
        viewBag: state.viewBag
    })
)(Home);

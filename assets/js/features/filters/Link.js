import React from "react";
import PropTypes from "prop-types";

const Link = ({ active, children, setVisibilityFilter, filter }) => (
  <button
    onClick={() => setVisibilityFilter(filter)}
    disabled={active}
    className="ml-2 underline text-blue-600"
  >
    {children}
  </button>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default Link;

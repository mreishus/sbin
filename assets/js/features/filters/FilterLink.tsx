import { connect } from "react-redux";
import { setVisibilityFilter } from "./filtersSlice";
import Link from "./Link";
import { RootState } from "../../reducers";

const mapStateToProps = (state: RootState, ownProps: any) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToProps = { setVisibilityFilter };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

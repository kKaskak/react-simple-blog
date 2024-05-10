import propTypes from 'prop-types';

const PageLayout = ({ children }) => {
	return <>{children}</>;
};

export default PageLayout;

PageLayout.propTypes = {
	children: propTypes.node.isRequired,
};

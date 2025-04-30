/* eslint-disable react/prop-types */
import GoogleAd from '../../../components/GoogleAd/GoogleAd';

const GoogleAdSense = ({ slot, format = 'auto', layout = null, style = { display: 'block' }, className = '' }) => {
	return <GoogleAd slot={slot} format={format} layout={layout} style={style} className={className} />;
};

export default GoogleAdSense;

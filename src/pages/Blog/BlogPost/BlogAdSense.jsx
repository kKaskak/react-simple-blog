import GoogleAd from '../../../components/GoogleAd/GoogleAd';

// eslint-disable-next-line react/prop-types
const BlogAdSense = ({ slot = '8896538111', format = 'fluid', layoutKey = '-6t+ed+2i-1n-4w', style = { display: 'block' }, className = '' }) => {
	return <GoogleAd slot={slot} format={format} layout={layoutKey} style={style} className={className} />;
};

export default BlogAdSense;

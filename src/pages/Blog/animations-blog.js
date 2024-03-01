const blogCard = {
	hidden: {
		opacity: 0,
		y: -50,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 0.2,
			duration: 0.5,
		},
	},
};
const hover = {
	scale: 1.01,
	transition: {
		duration: 0.3,
	},
};
export { blogCard, hover };

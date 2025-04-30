'use strict';
(self.webpackChunkblog_project = self.webpackChunkblog_project || []).push([
	[386],
	{
		8386: (e, t, l) => {
			l.r(t), l.d(t, { default: () => a });
			var i = l(1228),
				o = l(4446);
			const r = { hidden: { opacity: 0, y: -50 }, show: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } } },
				c = { scale: 1.01, transition: { duration: 0.3 } };
			var s = l(5475),
				n = l(579);
			const a = (e) => {
				let { post: t } = e;
				return (0, n.jsx)(
					i.P.div,
					{
						initial: 'hidden',
						whileInView: 'show',
						viewport: { once: !0, amount: 0.3 },
						variants: r,
						whileHover: c,
						className: 'blog-article-component',
						children: (0, n.jsxs)(s.N_, {
							style: { textDecoration: 'none' },
							to: '/blog/'.concat(t.slug.current),
							children: [
								(0, n.jsx)('img', { loading: 'lazy', src: (0, o.dk)(t.previewImage), alt: t.title }),
								(0, n.jsxs)('div', {
									className: 'blog-article-component-date',
									children: [
										(0, n.jsx)('p', {
											style: { color: t.categoriesPreviewColor },
											children: t.categories.map((e) => e.title).join(', '),
										}),
										(0, n.jsx)('p', { style: { color: t.publishedAtPreviewColor }, children: t.publishedAt }),
									],
								}),
								(0, n.jsxs)('div', {
									className: 'blog-article-component-title',
									children: [
										(0, n.jsx)('h3', {
											style: { color: ''.concat(t.titleColorCard), filter: ''.concat(t.titleFilter) },
											children: t.title,
										}),
										(0, n.jsx)('p', { children: t.desc }),
									],
								}),
							],
						}),
					},
					t.slug.current,
				);
			};
		},
	},
]);
//# sourceMappingURL=386.b76e5d59.chunk.js.map

'use strict';
(self.webpackChunkblog_project = self.webpackChunkblog_project || []).push([
	[113],
	{
		2113: (t, e, n) => {
			n.r(e), n.d(e, { a: () => _, e: () => d, s: () => k });
			var r = n(5970);
			const o = /_key\s*==\s*['"](.*)['"]/;
			function c(t) {
				if (!Array.isArray(t)) throw new Error('Path is not an array');
				return t.reduce((t, e, n) => {
					const r = typeof e;
					if ('number' === r) return ''.concat(t, '[').concat(e, ']');
					if ('string' === r)
						return ''
							.concat(t)
							.concat(0 === n ? '' : '.')
							.concat(e);
					if (
						(function (t) {
							return 'string' == typeof t ? o.test(t.trim()) : 'object' == typeof t && '_key' in t;
						})(e) &&
						e._key
					)
						return ''.concat(t, '[_key=="').concat(e._key, '"]');
					if (Array.isArray(e)) {
						const [n, r] = e;
						return ''.concat(t, '[').concat(n, ':').concat(r, ']');
					}
					throw new Error('Unsupported path segment `'.concat(JSON.stringify(e), '`'));
				}, '');
			}
			const a = { '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t', "'": "\\'", '\\': '\\\\' },
				s = { '\\f': '\f', '\\n': '\n', '\\r': '\r', '\\t': '\t', "\\'": "'", '\\\\': '\\' };
			function i(t) {
				const e = [],
					n = /\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g;
				let r;
				for (; null !== (r = n.exec(t)); )
					if (void 0 === r[1])
						if (void 0 === r[2])
							if (void 0 === r[3]);
							else {
								const t = r[3].replace(/\\(\\')/g, (t) => s[t]);
								e.push({ _key: t, _index: -1 });
							}
						else e.push(parseInt(r[2], 10));
					else {
						const t = r[1].replace(/\\(\\|f|n|r|t|')/g, (t) => s[t]);
						e.push(t);
					}
				return e;
			}
			function l(t) {
				return t.map((t) => {
					if ('string' == typeof t || 'number' == typeof t) return t;
					if ('' !== t._key) return { _key: t._key };
					if (-1 !== t._index) return t._index;
					throw new Error('invalid segment:'.concat(JSON.stringify(t)));
				});
			}
			function u(t, e) {
				if (null == e || !e.mappings) return;
				const n = (function (t) {
					return '$'.concat(
						t
							.map((t) =>
								'string' == typeof t
									? "['".concat(
											t.replace(/[\f\n\r\t'\\]/g, (t) => a[t]),
											"']",
										)
									: 'number' == typeof t
										? '['.concat(t, ']')
										: '' !== t._key
											? "[?(@._key=='".concat(
													t._key.replace(/['\\]/g, (t) => a[t]),
													"')]",
												)
											: '['.concat(t._index, ']'),
							)
							.join(''),
					);
				})(
					t.map((t) => {
						if ('string' == typeof t || 'number' == typeof t) return t;
						if (-1 !== t._index) return t._index;
						throw new Error('invalid segment:'.concat(JSON.stringify(t)));
					}),
				);
				if (void 0 !== e.mappings[n]) return { mapping: e.mappings[n], matchedPath: n, pathSuffix: '' };
				const r = Object.entries(e.mappings)
					.filter((t) => {
						let [e] = t;
						return n.startsWith(e);
					})
					.sort((t, e) => {
						let [n] = t,
							[r] = e;
						return r.length - n.length;
					});
				if (0 == r.length) return;
				const [o, c] = r[0];
				return { mapping: c, matchedPath: o, pathSuffix: n.substring(o.length) };
			}
			function p(t) {
				return 'object' == typeof t && null !== t;
			}
			function f(t, e) {
				let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
				return (function (t) {
					return null !== t && Array.isArray(t);
				})(t)
					? t.map((t, r) => {
							if (p(t)) {
								const o = t._key;
								if ('string' == typeof o) return f(t, e, n.concat({ _key: o, _index: r }));
							}
							return f(t, e, n.concat(r));
						})
					: p(t)
						? Object.fromEntries(
								Object.entries(t).map((t) => {
									let [r, o] = t;
									return [r, f(o, e, n.concat(r))];
								}),
							)
						: e(t, n);
			}
			function d(t, e, n) {
				return f(t, (t, r) => {
					if ('string' != typeof t) return t;
					const o = u(r, e);
					if (!o) return t;
					const { mapping: c, matchedPath: a } = o;
					if ('value' !== c.type || 'documentValue' !== c.source.type) return t;
					const s = e.documents[c.source.document],
						l = e.paths[c.source.path],
						p = i(a),
						f = i(l).concat(r.slice(p.length));
					return n({ sourcePath: f, sourceDocument: s, resultPath: r, value: t });
				});
			}
			const h = 'drafts.';
			function g(t) {
				const { baseUrl: e, workspace: n = 'default', tool: r = 'default', id: o, type: a, path: s, projectId: i, dataset: u } = t;
				if (!e) throw new Error('baseUrl is required');
				if (!s) throw new Error('path is required');
				if (!o) throw new Error('id is required');
				if ('/' !== e && e.endsWith('/')) throw new Error('baseUrl must not end with a slash');
				const p = 'default' === n ? void 0 : n,
					f = 'default' === r ? void 0 : r,
					d = (function (t) {
						return t.startsWith(h) ? t.slice(h.length) : t;
					})(o),
					g = Array.isArray(s) ? c(l(s)) : s,
					y = new URLSearchParams({ baseUrl: e, id: d, type: a, path: g });
				p && y.set('workspace', p),
					f && y.set('tool', f),
					i && y.set('projectId', i),
					u && y.set('dataset', u),
					o.startsWith(h) && y.set('isDraft', '');
				const m = ['/' === e ? '' : e];
				p && m.push(p);
				const b = ['mode=presentation', 'id='.concat(d), 'type='.concat(a), 'path='.concat(encodeURIComponent(g))];
				return f && b.push('tool='.concat(f)), m.push('intent', 'edit', ''.concat(b.join(';'), '?').concat(y)), m.join('/');
			}
			const y = (t) => {
					let { sourcePath: e, value: n } = t;
					if (
						(/^\d{4}-\d{2}-\d{2}/.test((r = n)) && Date.parse(r)) ||
						(function (t) {
							try {
								new URL(t, t.startsWith('/') ? 'https://acme.com' : void 0);
							} catch {
								return !1;
							}
							return !0;
						})(n)
					)
						return !1;
					var r;
					const o = e.at(-1);
					return !(
						('slug' === e.at(-2) && 'current' === o) ||
						('string' == typeof o && o.startsWith('_')) ||
						('number' == typeof o && 'marks' === e.at(-2)) ||
						('href' === o && 'number' == typeof e.at(-2) && 'markDefs' === e.at(-3)) ||
						'style' === o ||
						'listItem' === o ||
						e.some((t) => 'meta' === t || 'metadata' === t || 'openGraph' === t || 'seo' === t) ||
						('string' == typeof o && m.has(o))
					);
				},
				m = new Set([
					'color',
					'colour',
					'currency',
					'email',
					'format',
					'gid',
					'hex',
					'href',
					'hsl',
					'hsla',
					'icon',
					'id',
					'index',
					'key',
					'language',
					'layout',
					'link',
					'linkAction',
					'locale',
					'lqip',
					'page',
					'path',
					'ref',
					'rgb',
					'rgba',
					'route',
					'secret',
					'slug',
					'status',
					'tag',
					'template',
					'theme',
					'type',
					'unit',
					'url',
					'username',
					'variant',
					'website',
				]);
			const b = 20;
			function k(t, e, n) {
				var c, a, s, i, l, u, p, f, h;
				const { filter: m, logger: k, enabled: _ } = n;
				if (!_) {
					const r = "config.enabled must be true, don't call this function otherwise";
					throw (
						(null == (c = null == k ? void 0 : k.error) ||
							c.call(k, '[@sanity/client]: '.concat(r), { result: t, resultSourceMap: e, config: n }),
						new TypeError(r))
					);
				}
				if (!e)
					return (
						null == (a = null == k ? void 0 : k.error) ||
							a.call(k, '[@sanity/client]: Missing Content Source Map from response body', {
								result: t,
								resultSourceMap: e,
								config: n,
							}),
						t
					);
				if (!n.studioUrl) {
					const r = 'config.studioUrl must be defined';
					throw (
						(null == (s = null == k ? void 0 : k.error) ||
							s.call(k, '[@sanity/client]: '.concat(r), { result: t, resultSourceMap: e, config: n }),
						new TypeError(r))
					);
				}
				const v = { encoded: [], skipped: [] },
					U = d(t, e, (t) => {
						let { sourcePath: e, sourceDocument: o, resultPath: c, value: a } = t;
						if (
							!1 ===
							('function' == typeof m
								? m({ sourcePath: e, resultPath: c, filterDefault: y, sourceDocument: o, value: a })
								: y({ sourcePath: e, resultPath: c, filterDefault: y, sourceDocument: o, value: a }))
						)
							return (
								k &&
									v.skipped.push({
										path: w(e),
										value: ''.concat(a.slice(0, b)).concat(a.length > b ? '...' : ''),
										length: a.length,
									}),
								a
							);
						k && v.encoded.push({ path: w(e), value: ''.concat(a.slice(0, b)).concat(a.length > b ? '...' : ''), length: a.length });
						const {
							baseUrl: s,
							workspace: i,
							tool: l,
						} = (function (t) {
							let e = 'string' == typeof t ? t : t.baseUrl;
							return '/' !== e && (e = e.replace(/\/$/, '')), 'string' == typeof t ? { baseUrl: e } : { ...t, baseUrl: e };
						})('function' == typeof n.studioUrl ? n.studioUrl(o) : n.studioUrl);
						if (!s) return a;
						const { _id: u, _type: p, _projectId: f, _dataset: d } = o;
						return (0, r.g)(
							a,
							{
								origin: 'sanity.io',
								href: g({
									baseUrl: s,
									workspace: i,
									tool: l,
									id: u,
									type: p,
									path: e,
									...(!n.omitCrossDatasetReferenceData && { dataset: d, projectId: f }),
								}),
							},
							!1,
						);
					});
				if (k) {
					const t = v.skipped.length,
						e = v.encoded.length;
					if (
						((t || e) &&
							(null == (i = (null == k ? void 0 : k.groupCollapsed) || k.log) || i('[@sanity/client]: Encoding source map into result'),
							null == (l = k.log) ||
								l.call(k, '[@sanity/client]: Paths encoded: '.concat(v.encoded.length, ', skipped: ').concat(v.skipped.length))),
						v.encoded.length > 0 &&
							(null == (u = null == k ? void 0 : k.log) || u.call(k, '[@sanity/client]: Table of encoded paths'),
							null == (p = (null == k ? void 0 : k.table) || k.log) || p(v.encoded)),
						v.skipped.length > 0)
					) {
						const t = new Set();
						for (const { path: e } of v.skipped) t.add(e.replace(o, '0').replace(/\[\d+\]/g, '[]'));
						null == (f = null == k ? void 0 : k.log) || f.call(k, '[@sanity/client]: List of skipped paths', [...t.values()]);
					}
					(t || e) && (null == (h = null == k ? void 0 : k.groupEnd) || h.call(k));
				}
				return U;
			}
			function w(t) {
				return c(l(t));
			}
			var _ = Object.freeze({ __proto__: null, stegaEncodeSourceMap: k });
		},
	},
]);
//# sourceMappingURL=113.ba4f5129.chunk.js.map

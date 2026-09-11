// jontury.com — shop painting data (JTD)
// ---------------------------------------------------------------------------
// Served to /shop as a HOSTED Webflow script, pinned to an immutable jsDelivr
// commit URL. This replaces the old pair of INLINE scripts (jt_shop_data +
// jt_shop_data_ext), which were capped at 2000 characters each and had run out
// of room — jt_shop_data_ext was 1962/2000 when it was retired.
//
// WHY PINNED TO A COMMIT SHA, NOT @main:
//   jsDelivr serves @main with s-maxage=43200 (12h) and its purge is only
//   eventually consistent. On 2026-08-28 a *finished* purge was followed ~14
//   minutes later by the pre-fix file being served again (BUG-035). A commit
//   URL is immutable, so it is cached hard and can never go stale.
//   To change this data: edit, commit, push, then re-register the Webflow
//   script against the NEW commit URL. Never mutate a URL already in use.
//
// SHAPE:
//   paintings[] — s: slug, t: title, r: aspect ratio key, img, desc
//   sz          — sizes offered per ratio key. r MUST be one of these keys.
//   cl          — frame colour swatches
//   pr          — price overrides (populated at runtime)
//
// GOTCHAS THAT HAVE BITTEN BEFORE:
//   * No. 12 "Spirit" is 5:4 LANDSCAPE but carries r:'4:5'. That is correct
//     and deliberate: sz has no '5:4' key, and 5:4 is the same rectangle
//     rotated, so '4:5' offers exactly the right sizes. Writing '5:4' would
//     match no key and the painting would offer NO sizes at all.
//   * Jon's own titles are Adam's exact strings, lowercase included, and
//     No. 156 is signed T2RY on the canvas. Do not "correct" either.
//   * Renaming a painting renames its cart line, and jt_shop_price_fix keys
//     its cart thumbnail map on a substring of that line. Change a title
//     here, check that map.
//   * Descriptions are written from the painting itself (BUG-038) — described,
//     not titled, and not inferred from an earlier note.
// ---------------------------------------------------------------------------
window.JTD={paintings:[{s:'dscf1658',t:'Contemplation With Orange Hat',r:'4:5',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bbd1cc29c93007feb2b314_jontury-painting-5-f.jpg',desc:'In 2017 I was deep into my style. This is one of many paintings I did during that time, fomented primarily by my love of women. A fascination with their difference to men, me. I was drawn to their fluttering light. A vividly colored hat and face somehow produce an unusually calm piece. I wondered how to coalesce. Join, become one.'},{s:'dscf1691',t:'Untitled',r:'4:5',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bce87e329969f763698e8d_jontury-painting-21-f.jpg',desc:'A luminous figure in fiery reds, deep teals, and golden yellows twists with urgent energy. Bold contour lines fragment the body into saturated color planes, while expressive hands reach outward between invitation and self-protection.'},{s:'dscf1751',t:'See! Clean Hands',r:'4:5',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bcec4c377ad811b6b6cbb3_jontury-painting-51-f.jpg',desc:'Open palms presented to the viewer, hair splayed like a crown against warm amber. Rendered in lavender, gold, and orange, wide eyes and parted lips convey innocence or defiance. Acrylic on canvas, 2016.'},{s:'dscf1767',t:'Lady Chaos',r:'2:3',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bcecf8acefaebae9aa33eb_jontury-painting-58-f.jpg',desc:'Lady Chaos what a gem\nNot worried bout her dress’s hem\n\nShe’s just wild new born child\n\nDoesn’t care if you understand\nShe’s always here on demand\n\nA Jon t2ry understand'},{s:'dscf1835',t:'Juggler',r:'3:4',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bcf07edfa43d3f5fc9dfcc_jontury-painting-90-f.jpg',desc:'A muscular torso emerges from a storm of ochre, teal, and coral, articulated through thick, sculptural brushstrokes. Dark contour lines trace powerful anatomy while vivid color spheres orbit the composition, suggesting forces in precarious balance.'},{s:'dscf1865',t:'Double Face',r:'2:3',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bcfda7296bd902e56dc23c_jontury-painting-105-f.jpg',desc:'A face of bold geometric planes in red, yellow, olive, and turquoise gazes from a richly patterned surround. The composition recalls stained glass, each color field delineated by strong black outlines, creating regal presence and ornamental grandeur.'},{s:'dscf1753',t:'Another Dancer',r:'4:5',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bcec636a49b895acddd7e1_jontury-painting-52-f.jpg',desc:'Description forthcoming.'},{s:'dscf1984',t:'Pensive with green chair',r:'4:5',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bd0c8c48b4b320d7ad4fec_jontury-painting-156-f.jpg',desc:'Description forthcoming.'},{s:'dscf1673',t:'Spirit',r:'4:5',img:'https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bce55e531537044f459e40_jontury-painting-12-f.jpg',desc:'A reclining figure unfolds in long looping ribbons of orange, gold and rose, her lashed eyes set in a crescent of yellow. Around her the ground breaks into flat angular fields of olive, green and plum.'}],sz:{'4:5':['8×10"','16×20"','24×30"'],'2:3':['12×18"','16×24"','24×36"'],'3:4':['12×16"','16×20"','24×32"']},cl:{Black:'#1c1c1c',White:'#f0ede8',Natural:'#b89b72'},pr:{}};

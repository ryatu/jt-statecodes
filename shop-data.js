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

// ---------------------------------------------------------------------------
// 2026-10-05 (CHG-317) — Nos. 149, 162, 169 released, with the wider size range
// of DEC-031. Everything these three need lives in THIS block, because the old
// inline scripts (jt_cart_map_a/b, jt_shop_price_fix) are at Webflow's 2000-char
// cap and cannot take 32 more keys.
//
// HOW IT HOOKS IN — read before editing:
//   * k:1 on a painting = "keep". The /shop footer block filters JTD.paintings
//     to a hard-coded KEEP list that can only be edited in the Designer. The
//     filter() override below lets k:1 paintings through and leaves every other
//     painting to that KEEP list exactly as before.
//   * jt_shop_price_fix ASSIGNS JTD.pr (it does not merge), so pr is a setter
//     here: whatever is assigned gets the PX prices merged in.
//   * JTSKU is merged with Object.assign, the same way the cart-map scripts do,
//     so load order does not matter. Every sku id here MUST also be in
//     skumap.json (BUG-035) or the order is charged and never printed.
//   * Sizes with a side of exactly 12in are in Printful but NOT offered here:
//     the footer block still drops anything not strictly over 12in.
//   * Cart thumbnails: jt_shop_price_fix matches a title substring from its own
//     fixed list, so the three new titles get the same treatment below.
(function(){
  var J=window.JTD,NEW=[{"s":"dscf1960","t":"Comfortable Woman, Enclosed","r":"3:4","img":"https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bd0c2744c235fec41d8674_jontury-painting-149-f.jpg","desc":"Description forthcoming.","k":1},{"s":"dscf2001","t":"Staring Figure","r":"2:3","img":"https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bd0d40fef4443b65e451f1_jontury-painting-162-f.jpg","desc":"Description forthcoming.","k":1},{"s":"dscf2019","t":"Praying with Bloody Fingers","r":"3:4","img":"https://cdn.prod.website-files.com/69a168f418c340b0d17eecbe/69bd0ddfefe2483d190b8b0a_jontury-painting-169-f.jpg","desc":"Description forthcoming.","k":1}],PX={"dscf1960_cv_18×24\"":144.99,"dscf1960_cv_24×32\"":229.99,"dscf1960_cv_30×40\"":282.99,"dscf1960_fa_18×24\"":53.99,"dscf1960_fa_24×32\"":70.99,"dscf1960_fa_30×40\"":89.99,"dscf1960_fr_18×24\"_Black":190.99,"dscf1960_fr_18×24\"_White":190.99,"dscf1960_fr_18×24\"_Natural":190.99,"dscf2001_cv_16×24\"":143.99,"dscf2001_cv_20×30\"":156.99,"dscf2001_cv_24×36\"":269.99,"dscf2001_cv_32×48\"":388.99,"dscf2001_cv_40×60\"":637.99,"dscf2001_fa_16×24\"":52.99,"dscf2001_fa_20×30\"":54.99,"dscf2001_fa_24×36\"":75.99,"dscf2001_fr_20×30\"_Black":239.99,"dscf2001_fr_24×36\"_Black":321.99,"dscf2001_fr_20×30\"_White":239.99,"dscf2001_fr_24×36\"_White":327.99,"dscf2001_fr_20×30\"_Natural":239.99,"dscf2001_fr_24×36\"_Natural":318.99,"dscf2019_cv_18×24\"":144.99,"dscf2019_cv_24×32\"":229.99,"dscf2019_cv_30×40\"":282.99,"dscf2019_fa_18×24\"":53.99,"dscf2019_fa_24×32\"":70.99,"dscf2019_fa_30×40\"":89.99,"dscf2019_fr_18×24\"_Black":190.99,"dscf2019_fr_18×24\"_White":190.99,"dscf2019_fr_18×24\"_Natural":190.99},SKU={"dscf1960:canvas:18x24":"6ac3a0ccdd3910adc99a5786","dscf1960:canvas:24x32":"6ac3a0d417ef21967650025b","dscf1960:canvas:30x40":"6ac3a0d64b0f7e18f69625cc","dscf1960:fine-art:18x24":"6ac3a0d88d65f4337d1c2a0e","dscf1960:fine-art:24x32":"6ac3a0dd10684005e703ea5b","dscf1960:fine-art:30x40":"6ac3a0e1c974532f0708bd51","dscf1960:framed-black:18x24":"6ac3a0e4c974532f0708be53","dscf1960:framed-white:18x24":"6ac3a0e6ece2987923212c3d","dscf1960:framed-natural:18x24":"6ac3a0e8e0481ce4b0b7cdbc","dscf2001:canvas:16x24":"6ac3a0eaa0fbe05c7e2f8533","dscf2001:canvas:20x30":"6ac3a0f078a7cbf33e47c47a","dscf2001:canvas:24x36":"6ac3a0f322ebe1f0f988dadf","dscf2001:canvas:32x48":"6ac3a0f58667c18120be1d4a","dscf2001:canvas:40x60":"6ac3a0f942f7d67284613539","dscf2001:fine-art:16x24":"6ac3a0fb17ef219676500c63","dscf2001:fine-art:20x30":"6ac3a0fe32864727fd82f3f6","dscf2001:fine-art:24x36":"6ac3a0ffa0fbe05c7e2f8c3f","dscf2001:framed-black:20x30":"6ac3a1016e44d83fd0f143b3","dscf2001:framed-black:24x36":"6ac3a1048b894a3eda2d27bd","dscf2001:framed-white:20x30":"6ac3a107ac833c625da7ed48","dscf2001:framed-white:24x36":"6ac3a109be3d9f30ae5d502c","dscf2001:framed-natural:20x30":"6ac3a10bcc9e5548d8b4e155","dscf2001:framed-natural:24x36":"6ac3a10f3f9c16a079ad7974","dscf2019:canvas:18x24":"6ac3a111c0f62556407bb7ee","dscf2019:canvas:24x32":"6ac3a1158cad47f100db8999","dscf2019:canvas:30x40":"6ac3a117c0f62556407bb976","dscf2019:fine-art:18x24":"6ac3a1198cad47f100db8ba9","dscf2019:fine-art:24x32":"6ac3a11b8cad47f100db8ca2","dscf2019:fine-art:30x40":"6ac3a11e22ebe1f0f988f360","dscf2019:framed-black:18x24":"6ac3a12017ef219676501544","dscf2019:framed-white:18x24":"6ac3a12332864727fd82f7aa","dscf2019:framed-natural:18x24":"6ac3a1263f9c16a079ad8a78"};
  NEW.forEach(function(p){J.paintings.push(p)});
  var keep=function(fn,th){var a=Array.prototype.filter.call(this,function(p,i,arr){return (p&&p.k)||fn.call(th,p,i,arr)});a.filter=keep;return a};
  J.paintings.filter=keep;
  J.sz['2:3']=['12×18"','16×24"','20×30"','24×36"','32×48"','40×60"'];
  J.sz['3:4']=['12×16"','16×20"','18×24"','24×32"','30×40"'];
  var cur=J.pr||{};
  Object.defineProperty(J,'pr',{configurable:true,get:function(){return cur},set:function(v){cur=Object.assign(v||{},PX)}});
  J.pr=cur;
  window.JTSKU=Object.assign(window.JTSKU||{},SKU);
  if(location.pathname.indexOf('/shop')!==0)return;
  var D={'Comfortable':'dscf1960','Staring':'dscf2001','Praying':'dscf2019'};
  (function inj(){document.querySelectorAll('.w-commerce-commercecartitem').forEach(function(it){if(it._jti2)return;var tx=it.textContent||'',d='',k;for(k in D){if(tx.indexOf(k)>-1){d=D[k];break}}if(!d)return;var p=NEW.filter(function(x){return x.s===d})[0],ex=it.querySelector('img');if(!p||!ex)return;it._jti2=1;ex.src=p.img;ex.classList.remove('w-dyn-bind-empty');ex.style.display='block'});setTimeout(inj,600)})();
})();

(()=>{
        var Gn = Object.defineProperty;
        var A = (n,e)=>{
                for (var t in e)
                    Gn(n, t, {
                        get: e[t],
                        enumerable: !0
                    })
            }
        ;
        function j() {}
        function Qe(n) {
            return n()
        }
        function Dt() {
            return Object.create(null)
        }
        function G(n) {
            n.forEach(Qe)
        }
        function qe(n) {
            return typeof n == "function"
        }
        function V(n, e) {
            return n != n ? e == e : n !== e || n && typeof n == "object" || typeof n == "function"
        }
        var Le;
        function se(n, e) {
            return Le || (Le = document.createElement("a")),
                Le.href = e,
            n === Le.href
        }
        function zt(n) {
            return Object.keys(n).length === 0
        }
        var Ut = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global
            , _e = class {
                constructor(e) {
                    this.options = e,
                        this._listeners = "WeakMap"in Ut ? new WeakMap : void 0
                }
                observe(e, t) {
                    return this._listeners.set(e, t),
                        this._getObserver().observe(e, this.options),
                        ()=>{
                            this._listeners.delete(e),
                                this._observer.unobserve(e)
                        }
                }
                _getObserver() {
                    var e;
                    return (e = this._observer) !== null && e !== void 0 ? e : this._observer = new ResizeObserver(t=>{
                            var l;
                            for (let s of t)
                                _e.entries.set(s.target, s),
                                (l = this._listeners.get(s.target)) === null || l === void 0 || l(s)
                        }
                    )
                }
            }
        ;
        _e.entries = "WeakMap"in Ut ? new WeakMap : void 0;
        var It = !1;
        function Vn() {
            It = !0
        }
        function Wn() {
            It = !1
        }
        function b(n, e) {
            n.appendChild(e)
        }
        function y(n, e, t) {
            n.insertBefore(e, t || null)
        }
        function v(n) {
            n.parentNode && n.parentNode.removeChild(n)
        }
        function X(n, e) {
            for (let t = 0; t < n.length; t += 1)
                n[t] && n[t].d(e)
        }
        function C(n) {
            return document.createElement(n)
        }
        function Jn(n) {
            return document.createElementNS("http://www.w3.org/2000/svg", n)
        }
        function w(n) {
            return document.createTextNode(n)
        }
        function S() {
            return w(" ")
        }
        function Z() {
            return w("")
        }
        function W(n, e, t, l) {
            return n.addEventListener(e, t, l),
                ()=>n.removeEventListener(e, t, l)
        }
        function p(n, e, t) {
            t == null ? n.removeAttribute(e) : n.getAttribute(e) !== t && n.setAttribute(e, t)
        }
        function Kn(n) {
            return Array.from(n.childNodes)
        }
        function N(n, e) {
            e = "" + e,
            n.data !== e && (n.data = e)
        }
        function xe(n, e) {
            n.value = e ?? ""
        }
        function B(n, e, t) {
            n.classList[t ? "add" : "remove"](e)
        }
        var Be = class {
                constructor(e=!1) {
                    this.is_svg = !1,
                        this.is_svg = e,
                        this.e = this.n = null
                }
                c(e) {
                    this.h(e)
                }
                m(e, t, l=null) {
                    this.e || (this.is_svg ? this.e = Jn(t.nodeName) : this.e = C(t.nodeType === 11 ? "TEMPLATE" : t.nodeName),
                        this.t = t.tagName !== "TEMPLATE" ? t : t.content,
                        this.c(e)),
                        this.i(l)
                }
                h(e) {
                    this.e.innerHTML = e,
                        this.n = Array.from(this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes)
                }
                i(e) {
                    for (let t = 0; t < this.n.length; t += 1)
                        y(this.t, this.n[t], e)
                }
                p(e) {
                    this.d(),
                        this.h(e),
                        this.i(this.a)
                }
                d() {
                    this.n.forEach(v)
                }
            }
        ;
        var de;
        function fe(n) {
            de = n
        }
        function Yn() {
            if (!de)
                throw new Error("Function called outside component initialization");
            return de
        }
        function $e(n) {
            Yn().$$.on_mount.push(n)
        }
        var te = [];
        var le = []
            , ne = []
            , Ye = []
            , Xn = Promise.resolve()
            , Xe = !1;
        function Zn() {
            Xe || (Xe = !0,
                Xn.then(Pt))
        }
        function Ze(n) {
            ne.push(n)
        }
        function Lt(n) {
            Ye.push(n)
        }
        var Ke = new Set
            , ee = 0;
        function Pt() {
            if (ee !== 0)
                return;
            let n = de;
            do {
                try {
                    for (; ee < te.length; ) {
                        let e = te[ee];
                        ee++,
                            fe(e),
                            Qn(e.$$)
                    }
                } catch (e) {
                    throw te.length = 0,
                        ee = 0,
                        e
                }
                for (fe(null),
                         te.length = 0,
                         ee = 0; le.length; )
                    le.pop()();
                for (let e = 0; e < ne.length; e += 1) {
                    let t = ne[e];
                    Ke.has(t) || (Ke.add(t),
                        t())
                }
                ne.length = 0
            } while (te.length);
            for (; Ye.length; )
                Ye.pop()();
            Xe = !1,
                Ke.clear(),
                fe(n)
        }
        function Qn(n) {
            if (n.fragment !== null) {
                n.update(),
                    G(n.before_update);
                let e = n.dirty;
                n.dirty = [-1],
                n.fragment && n.fragment.p(n.ctx, e),
                    n.after_update.forEach(Ze)
            }
        }
        function xn(n) {
            let e = []
                , t = [];
            ne.forEach(l=>n.indexOf(l) === -1 ? e.push(l) : t.push(l)),
                t.forEach(l=>l()),
                ne = e
        }
        var Pe = new Set, $;
        function re() {
            $ = {
                r: 0,
                c: [],
                p: $
            }
        }
        function ie() {
            $.r || G($.c),
                $ = $.p
        }
        function D(n, e) {
            n && n.i && (Pe.delete(n),
                n.i(e))
        }
        function I(n, e, t, l) {
            if (n && n.o) {
                if (Pe.has(n))
                    return;
                Pe.add(n),
                    $.c.push(()=>{
                            Pe.delete(n),
                            l && (t && n.d(1),
                                l())
                        }
                    ),
                    n.o(e)
            } else
                l && l()
        }
        function qt(n, e) {
            I(n, 1, 1, ()=>{
                    e.delete(n.key)
                }
            )
        }
        function Bt(n, e, t, l, s, r, i, o, a, h, _, f) {
            let c = n.length
                , E = r.length
                , u = c
                , m = {};
            for (; u--; )
                m[n[u].key] = u;
            let d = []
                , T = new Map
                , R = new Map
                , k = [];
            for (u = E; u--; ) {
                let M = f(s, r, u)
                    , L = t(M)
                    , U = i.get(L);
                U ? l && k.push(()=>U.p(M, e)) : (U = h(L, M),
                    U.c()),
                    T.set(L, d[u] = U),
                L in m && R.set(L, Math.abs(u - m[L]))
            }
            let F = new Set
                , x = new Set;
            function ae(M) {
                D(M, 1),
                    M.m(o, _),
                    i.set(M.key, M),
                    _ = M.first,
                    E--
            }
            for (; c && E; ) {
                let M = d[E - 1]
                    , L = n[c - 1]
                    , U = M.key
                    , Y = L.key;
                M === L ? (_ = M.first,
                    c--,
                    E--) : T.has(Y) ? !i.has(U) || F.has(U) ? ae(M) : x.has(Y) ? c-- : R.get(U) > R.get(Y) ? (x.add(U),
                    ae(M)) : (F.add(Y),
                    c--) : (a(L, i),
                    c--)
            }
            for (; c--; ) {
                let M = n[c];
                T.has(M.key) || a(M, i)
            }
            for (; E; )
                ae(d[E - 1]);
            return G(k),
                d
        }
        var $n = ["allowfullscreen", "allowpaymentrequest", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "formnovalidate", "hidden", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected"]
            , Or = new Set([...$n]);
        function Gt(n, e, t) {
            let l = n.$$.props[e];
            l !== void 0 && (n.$$.bound[l] = t,
                t(n.$$.ctx[l]))
        }
        function Ge(n) {
            n && n.c()
        }
        function he(n, e, t, l) {
            let {fragment: s, after_update: r} = n.$$;
            s && s.m(e, t),
            l || Ze(()=>{
                    let i = n.$$.on_mount.map(Qe).filter(qe);
                    n.$$.on_destroy ? n.$$.on_destroy.push(...i) : G(i),
                        n.$$.on_mount = []
                }
            ),
                r.forEach(Ze)
        }
        function oe(n, e) {
            let t = n.$$;
            t.fragment !== null && (xn(t.after_update),
                G(t.on_destroy),
            t.fragment && t.fragment.d(e),
                t.on_destroy = t.fragment = null,
                t.ctx = [])
        }
        function el(n, e) {
            n.$$.dirty[0] === -1 && (te.push(n),
                Zn(),
                n.$$.dirty.fill(0)),
                n.$$.dirty[e / 31 | 0] |= 1 << e % 31
        }
        function J(n, e, t, l, s, r, i, o=[-1]) {
            let a = de;
            fe(n);
            let h = n.$$ = {
                fragment: null,
                ctx: [],
                props: r,
                update: j,
                not_equal: s,
                bound: Dt(),
                on_mount: [],
                on_destroy: [],
                on_disconnect: [],
                before_update: [],
                after_update: [],
                context: new Map(e.context || (a ? a.$$.context : [])),
                callbacks: Dt(),
                dirty: o,
                skip_bound: !1,
                root: e.target || a.$$.root
            };
            i && i(h.root);
            let _ = !1;
            if (h.ctx = t ? t(n, e.props || {}, (f,c,...E)=>{
                    let u = E.length ? E[0] : c;
                    return h.ctx && s(h.ctx[f], h.ctx[f] = u) && (!h.skip_bound && h.bound[f] && h.bound[f](u),
                    _ && el(n, f)),
                        c
                }
            ) : [],
                h.update(),
                _ = !0,
                G(h.before_update),
                h.fragment = l ? l(h.ctx) : !1,
                e.target) {
                if (e.hydrate) {
                    Vn();
                    let f = Kn(e.target);
                    h.fragment && h.fragment.l(f),
                        f.forEach(v)
                } else
                    h.fragment && h.fragment.c();
                e.intro && D(n.$$.fragment),
                    he(n, e.target, e.anchor, e.customElement),
                    Wn(),
                    Pt()
            }
            fe(a)
        }
        var tl;
        typeof HTMLElement == "function" && (tl = class extends HTMLElement {
                constructor() {
                    super(),
                        this.attachShadow({
                            mode: "open"
                        })
                }
                connectedCallback() {
                    let {on_mount: n} = this.$$;
                    this.$$.on_disconnect = n.map(Qe).filter(qe);
                    for (let e in this.$$.slotted)
                        this.appendChild(this.$$.slotted[e])
                }
                attributeChangedCallback(n, e, t) {
                    this[n] = t
                }
                disconnectedCallback() {
                    G(this.$$.on_disconnect)
                }
                $destroy() {
                    oe(this, 1),
                        this.$destroy = j
                }
                $on(n, e) {
                    if (!qe(e))
                        return j;
                    let t = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
                    return t.push(e),
                        ()=>{
                            let l = t.indexOf(e);
                            l !== -1 && t.splice(l, 1)
                        }
                }
                $set(n) {
                    this.$$set && !zt(n) && (this.$$.skip_bound = !0,
                        this.$$set(n),
                        this.$$.skip_bound = !1)
                }
            }
        );
        var q = class {
                $destroy() {
                    oe(this, 1),
                        this.$destroy = j
                }
                $on(e, t) {
                    if (!qe(t))
                        return j;
                    let l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
                    return l.push(t),
                        ()=>{
                            let s = l.indexOf(t);
                            s !== -1 && l.splice(s, 1)
                        }
                }
                $set(e) {
                    this.$$set && !zt(e) && (this.$$.skip_bound = !0,
                        this.$$set(e),
                        this.$$.skip_bound = !1)
                }
            }
        ;
        function z(n) {
            let e = typeof n == "string" ? n.charCodeAt(0) : n;
            return e >= 97 && e <= 122 || e >= 65 && e <= 90
        }
        function Q(n) {
            let e = typeof n == "string" ? n.charCodeAt(0) : n;
            return e >= 48 && e <= 57
        }
        function K(n) {
            return z(n) || Q(n)
        }
        var Vt = ["art-lojban", "cel-gaulish", "no-bok", "no-nyn", "zh-guoyu", "zh-hakka", "zh-min", "zh-min-nan", "zh-xiang"];
        var et = {
            "en-gb-oed": "en-GB-oxendict",
            "i-ami": "ami",
            "i-bnn": "bnn",
            "i-default": null,
            "i-enochian": null,
            "i-hak": "hak",
            "i-klingon": "tlh",
            "i-lux": "lb",
            "i-mingo": null,
            "i-navajo": "nv",
            "i-pwn": "pwn",
            "i-tao": "tao",
            "i-tay": "tay",
            "i-tsu": "tsu",
            "sgn-be-fr": "sfb",
            "sgn-be-nl": "vgt",
            "sgn-ch-de": "sgg",
            "art-lojban": "jbo",
            "cel-gaulish": null,
            "no-bok": "nb",
            "no-nyn": "nn",
            "zh-guoyu": "cmn",
            "zh-hakka": "hak",
            "zh-min": null,
            "zh-min-nan": "nan",
            "zh-xiang": "hsn"
        };
        var nl = {}.hasOwnProperty;
        function Ve(n, e={}) {
            let t = Wt()
                , l = String(n)
                , s = l.toLowerCase()
                , r = 0;
            if (n == null)
                throw new Error("Expected string, got `" + n + "`");
            if (nl.call(et, s)) {
                let o = et[s];
                return (e.normalize === void 0 || e.normalize === null || e.normalize) && typeof o == "string" ? Ve(o) : (t[Vt.includes(s) ? "regular" : "irregular"] = l,
                    t)
            }
            for (; z(s.charCodeAt(r)) && r < 9; )
                r++;
            if (r > 1 && r < 9) {
                if (t.language = l.slice(0, r),
                r < 4) {
                    let o = 0;
                    for (; s.charCodeAt(r) === 45 && z(s.charCodeAt(r + 1)) && z(s.charCodeAt(r + 2)) && z(s.charCodeAt(r + 3)) && !z(s.charCodeAt(r + 4)); ) {
                        if (o > 2)
                            return i(r, 3, "Too many extended language subtags, expected at most 3 subtags");
                        t.extendedLanguageSubtags.push(l.slice(r + 1, r + 4)),
                            r += 4,
                            o++
                    }
                }
                for (s.charCodeAt(r) === 45 && z(s.charCodeAt(r + 1)) && z(s.charCodeAt(r + 2)) && z(s.charCodeAt(r + 3)) && z(s.charCodeAt(r + 4)) && !z(s.charCodeAt(r + 5)) && (t.script = l.slice(r + 1, r + 5),
                    r += 5),
                     s.charCodeAt(r) === 45 && (z(s.charCodeAt(r + 1)) && z(s.charCodeAt(r + 2)) && !z(s.charCodeAt(r + 3)) ? (t.region = l.slice(r + 1, r + 3),
                         r += 3) : Q(s.charCodeAt(r + 1)) && Q(s.charCodeAt(r + 2)) && Q(s.charCodeAt(r + 3)) && !Q(s.charCodeAt(r + 4)) && (t.region = l.slice(r + 1, r + 4),
                         r += 4)); s.charCodeAt(r) === 45; ) {
                    let o = r + 1
                        , a = o;
                    for (; K(s.charCodeAt(a)); ) {
                        if (a - o > 7)
                            return i(a, 1, "Too long variant, expected at most 8 characters");
                        a++
                    }
                    if (a - o > 4 || a - o > 3 && Q(s.charCodeAt(o)))
                        t.variants.push(l.slice(o, a)),
                            r = a;
                    else
                        break
                }
                for (; s.charCodeAt(r) === 45 && !(s.charCodeAt(r + 1) === 120 || !K(s.charCodeAt(r + 1)) || s.charCodeAt(r + 2) !== 45 || !K(s.charCodeAt(r + 3))); ) {
                    let o = r + 2
                        , a = 0;
                    for (; s.charCodeAt(o) === 45 && K(s.charCodeAt(o + 1)) && K(s.charCodeAt(o + 2)); ) {
                        let h = o + 1;
                        for (o = h + 2,
                                 a++; K(s.charCodeAt(o)); ) {
                            if (o - h > 7)
                                return i(o, 2, "Too long extension, expected at most 8 characters");
                            o++
                        }
                    }
                    if (!a)
                        return i(o, 4, "Empty extension, extensions must have at least 2 characters of content");
                    t.extensions.push({
                        singleton: l.charAt(r + 1),
                        extensions: l.slice(r + 3, o).split("-")
                    }),
                        r = o
                }
            } else
                r = 0;
            if (r === 0 && s.charCodeAt(r) === 120 || s.charCodeAt(r) === 45 && s.charCodeAt(r + 1) === 120) {
                r = r ? r + 2 : 1;
                let o = r;
                for (; s.charCodeAt(o) === 45 && K(s.charCodeAt(o + 1)); ) {
                    let a = r + 1;
                    for (o = a; K(s.charCodeAt(o)); ) {
                        if (o - a > 7)
                            return i(o, 5, "Too long private-use area, expected at most 8 characters");
                        o++
                    }
                    t.privateuse.push(l.slice(r + 1, o)),
                        r = o
                }
            }
            if (r !== l.length)
                return i(r, 6, "Found superfluous content after tag");
            return t;
            function i(o, a, h) {
                return e.warning && e.warning(h, a, o),
                    e.forgiving ? t : Wt()
            }
        }
        function Wt() {
            return {
                language: null,
                extendedLanguageSubtags: [],
                script: null,
                region: null,
                variants: [],
                extensions: [],
                privateuse: [],
                irregular: null,
                regular: null
            }
        }
        function Jt(n, e, t) {
            let l = n.slice();
            return l[8] = e[t][0],
                l[9] = e[t][1],
                l
        }
        function ll(n) {
            let e, t, l, s, r, i = n[0] && Kt(n);
            return {
                c() {
                    i && i.c(),
                        e = S(),
                        t = C("div"),
                        l = C("p"),
                        l.textContent = `${n[3](30)}`,
                        s = S(),
                        r = C("p"),
                        r.textContent = `${n[3](40)}`,
                        p(l, "class", "pagefind-ui__result-title pagefind-ui__loading svelte-j9e30"),
                        p(r, "class", "pagefind-ui__result-excerpt pagefind-ui__loading svelte-j9e30"),
                        p(t, "class", "pagefind-ui__result-inner svelte-j9e30")
                },
                m(o, a) {
                    i && i.m(o, a),
                        y(o, e, a),
                        y(o, t, a),
                        b(t, l),
                        b(t, s),
                        b(t, r)
                },
                p(o, a) {
                    o[0] ? i || (i = Kt(o),
                        i.c(),
                        i.m(e.parentNode, e)) : i && (i.d(1),
                        i = null)
                },
                d(o) {
                    i && i.d(o),
                    o && v(e),
                    o && v(t)
                }
            }
        }
        function sl(n) {
            let e, t, l, s, r = n[1].meta?.title + "", i, o, a, h, _ = n[1].excerpt + "", f, c = n[0] && Yt(n), E = n[2].length && Zt(n);
            return {
                c() {
                    c && c.c(),
                        e = S(),
                        t = C("div"),
                        l = C("p"),
                        s = C("a"),
                        i = w(r),
                        a = S(),
                        h = C("p"),
                        f = S(),
                    E && E.c(),
                        p(s, "class", "pagefind-ui__result-link svelte-j9e30"),
                        p(s, "href", o = n[1].meta?.url || n[1].url),
                        p(l, "class", "pagefind-ui__result-title svelte-j9e30"),
                        p(h, "class", "pagefind-ui__result-excerpt svelte-j9e30"),
                        p(t, "class", "pagefind-ui__result-inner svelte-j9e30")
                },
                m(u, m) {
                    c && c.m(u, m),
                        y(u, e, m),
                        y(u, t, m),
                        b(t, l),
                        b(l, s),
                        b(s, i),
                        b(t, a),
                        b(t, h),
                        h.innerHTML = _,
                        b(t, f),
                    E && E.m(t, null)
                },
                p(u, m) {
                    u[0] ? c ? c.p(u, m) : (c = Yt(u),
                        c.c(),
                        c.m(e.parentNode, e)) : c && (c.d(1),
                        c = null),
                    m & 2 && r !== (r = u[1].meta?.title + "") && N(i, r),
                    m & 2 && o !== (o = u[1].meta?.url || u[1].url) && p(s, "href", o),
                    m & 2 && _ !== (_ = u[1].excerpt + "") && (h.innerHTML = _),
                        u[2].length ? E ? E.p(u, m) : (E = Zt(u),
                            E.c(),
                            E.m(t, null)) : E && (E.d(1),
                            E = null)
                },
                d(u) {
                    c && c.d(u),
                    u && v(e),
                    u && v(t),
                    E && E.d()
                }
            }
        }
        function Kt(n) {
            let e;
            return {
                c() {
                    e = C("div"),
                        p(e, "class", "pagefind-ui__result-thumb pagefind-ui__loading svelte-j9e30")
                },
                m(t, l) {
                    y(t, e, l)
                },
                d(t) {
                    t && v(e)
                }
            }
        }
        function Yt(n) {
            let e, t = n[1].meta.image && Xt(n);
            return {
                c() {
                    e = C("div"),
                    t && t.c(),
                        p(e, "class", "pagefind-ui__result-thumb svelte-j9e30")
                },
                m(l, s) {
                    y(l, e, s),
                    t && t.m(e, null)
                },
                p(l, s) {
                    l[1].meta.image ? t ? t.p(l, s) : (t = Xt(l),
                        t.c(),
                        t.m(e, null)) : t && (t.d(1),
                        t = null)
                },
                d(l) {
                    l && v(e),
                    t && t.d()
                }
            }
        }
        function Xt(n) {
            let e, t, l;
            return {
                c() {
                    e = C("img"),
                        p(e, "class", "pagefind-ui__result-image svelte-j9e30"),
                    se(e.src, t = n[1].meta?.image) || p(e, "src", t),
                        p(e, "alt", l = n[1].meta?.image_alt || n[1].meta?.title)
                },
                m(s, r) {
                    y(s, e, r)
                },
                p(s, r) {
                    r & 2 && !se(e.src, t = s[1].meta?.image) && p(e, "src", t),
                    r & 2 && l !== (l = s[1].meta?.image_alt || s[1].meta?.title) && p(e, "alt", l)
                },
                d(s) {
                    s && v(e)
                }
            }
        }
        function Zt(n) {
            let e, t = n[2], l = [];
            for (let s = 0; s < t.length; s += 1)
                l[s] = Qt(Jt(n, t, s));
            return {
                c() {
                    e = C("ul");
                    for (let s = 0; s < l.length; s += 1)
                        l[s].c();
                    p(e, "class", "pagefind-ui__result-tags svelte-j9e30")
                },
                m(s, r) {
                    y(s, e, r);
                    for (let i = 0; i < l.length; i += 1)
                        l[i] && l[i].m(e, null)
                },
                p(s, r) {
                    if (r & 4) {
                        t = s[2];
                        let i;
                        for (i = 0; i < t.length; i += 1) {
                            let o = Jt(s, t, i);
                            l[i] ? l[i].p(o, r) : (l[i] = Qt(o),
                                l[i].c(),
                                l[i].m(e, null))
                        }
                        for (; i < l.length; i += 1)
                            l[i].d(1);
                        l.length = t.length
                    }
                },
                d(s) {
                    s && v(e),
                        X(l, s)
                }
            }
        }
        function Qt(n) {
            let e, t = n[8].replace(/^(\w)/, xt) + "", l, s, r = n[9] + "", i, o;
            return {
                c() {
                    e = C("li"),
                        l = w(t),
                        s = w(": "),
                        i = w(r),
                        o = S(),
                        p(e, "class", "pagefind-ui__result-tag svelte-j9e30")
                },
                m(a, h) {
                    y(a, e, h),
                        b(e, l),
                        b(e, s),
                        b(e, i),
                        b(e, o)
                },
                p(a, h) {
                    h & 4 && t !== (t = a[8].replace(/^(\w)/, xt) + "") && N(l, t),
                    h & 4 && r !== (r = a[9] + "") && N(i, r)
                },
                d(a) {
                    a && v(e)
                }
            }
        }
        function rl(n) {
            let e;
            function t(r, i) {
                return r[1] ? sl : ll
            }
            let l = t(n, -1)
                , s = l(n);
            return {
                c() {
                    e = C("li"),
                        s.c(),
                        p(e, "class", "pagefind-ui__result svelte-j9e30")
                },
                m(r, i) {
                    y(r, e, i),
                        s.m(e, null)
                },
                p(r, [i]) {
                    l === (l = t(r, i)) && s ? s.p(r, i) : (s.d(1),
                        s = l(r),
                    s && (s.c(),
                        s.m(e, null)))
                },
                i: j,
                o: j,
                d(r) {
                    r && v(e),
                        s.d()
                }
            }
        }
        var xt = n=>n.toLocaleUpperCase();
        function il(n, e, t) {
            let {show_images: l=!0} = e, {process_result: s=null} = e, {result: r={
                data: async()=>{}
            }} = e, i = ["title", "image", "image_alt", "url"], o, a = [], h = async f=>{
                t(1, o = await f.data()),
                    t(1, o = s?.(o) ?? o),
                    t(2, a = Object.entries(o.meta).filter(([c])=>!i.includes(c)))
            }
                , _ = (f=30)=>". ".repeat(Math.floor(10 + Math.random() * f));
            return n.$$set = f=>{
                "show_images"in f && t(0, l = f.show_images),
                "process_result"in f && t(4, s = f.process_result),
                "result"in f && t(5, r = f.result)
            }
                ,
                n.$$.update = ()=>{
                    if (n.$$.dirty & 32)
                        e: h(r)
                }
                ,
                [l, o, a, _, s, r]
        }
        var tt = class extends q {
            constructor(e) {
                super(),
                    J(this, e, il, rl, V, {
                        show_images: 0,
                        process_result: 4,
                        result: 5
                    })
            }
        }
            , $t = tt;
        function en(n, e, t) {
            let l = n.slice();
            return l[11] = e[t][0],
                l[12] = e[t][1],
                l
        }
        function tn(n, e, t) {
            let l = n.slice();
            return l[15] = e[t],
                l
        }
        function ol(n) {
            let e, t, l, s, r, i = n[0] && nn(n);
            return {
                c() {
                    i && i.c(),
                        e = S(),
                        t = C("div"),
                        l = C("p"),
                        l.textContent = `${n[5](30)}`,
                        s = S(),
                        r = C("p"),
                        r.textContent = `${n[5](40)}`,
                        p(l, "class", "pagefind-ui__result-title pagefind-ui__loading svelte-4xnkmf"),
                        p(r, "class", "pagefind-ui__result-excerpt pagefind-ui__loading svelte-4xnkmf"),
                        p(t, "class", "pagefind-ui__result-inner svelte-4xnkmf")
                },
                m(o, a) {
                    i && i.m(o, a),
                        y(o, e, a),
                        y(o, t, a),
                        b(t, l),
                        b(t, s),
                        b(t, r)
                },
                p(o, a) {
                    o[0] ? i || (i = nn(o),
                        i.c(),
                        i.m(e.parentNode, e)) : i && (i.d(1),
                        i = null)
                },
                d(o) {
                    i && i.d(o),
                    o && v(e),
                    o && v(t)
                }
            }
        }
        function al(n) {
            let e, t, l, s, r = n[1].meta?.title + "", i, o, a, h, _, f = n[0] && ln(n), c = n[4] && rn(n), E = n[3], u = [];
            for (let d = 0; d < E.length; d += 1)
                u[d] = on(tn(n, E, d));
            let m = n[2].length && an(n);
            return {
                c() {
                    f && f.c(),
                        e = S(),
                        t = C("div"),
                        l = C("p"),
                        s = C("a"),
                        i = w(r),
                        a = S(),
                    c && c.c(),
                        h = S();
                    for (let d = 0; d < u.length; d += 1)
                        u[d].c();
                    _ = S(),
                    m && m.c(),
                        p(s, "class", "pagefind-ui__result-link svelte-4xnkmf"),
                        p(s, "href", o = n[1].meta?.url || n[1].url),
                        p(l, "class", "pagefind-ui__result-title svelte-4xnkmf"),
                        p(t, "class", "pagefind-ui__result-inner svelte-4xnkmf")
                },
                m(d, T) {
                    f && f.m(d, T),
                        y(d, e, T),
                        y(d, t, T),
                        b(t, l),
                        b(l, s),
                        b(s, i),
                        b(t, a),
                    c && c.m(t, null),
                        b(t, h);
                    for (let R = 0; R < u.length; R += 1)
                        u[R] && u[R].m(t, null);
                    b(t, _),
                    m && m.m(t, null)
                },
                p(d, T) {
                    if (d[0] ? f ? f.p(d, T) : (f = ln(d),
                        f.c(),
                        f.m(e.parentNode, e)) : f && (f.d(1),
                        f = null),
                    T & 2 && r !== (r = d[1].meta?.title + "") && N(i, r),
                    T & 2 && o !== (o = d[1].meta?.url || d[1].url) && p(s, "href", o),
                        d[4] ? c ? c.p(d, T) : (c = rn(d),
                            c.c(),
                            c.m(t, h)) : c && (c.d(1),
                            c = null),
                    T & 8) {
                        E = d[3];
                        let R;
                        for (R = 0; R < E.length; R += 1) {
                            let k = tn(d, E, R);
                            u[R] ? u[R].p(k, T) : (u[R] = on(k),
                                u[R].c(),
                                u[R].m(t, _))
                        }
                        for (; R < u.length; R += 1)
                            u[R].d(1);
                        u.length = E.length
                    }
                    d[2].length ? m ? m.p(d, T) : (m = an(d),
                        m.c(),
                        m.m(t, null)) : m && (m.d(1),
                        m = null)
                },
                d(d) {
                    f && f.d(d),
                    d && v(e),
                    d && v(t),
                    c && c.d(),
                        X(u, d),
                    m && m.d()
                }
            }
        }
        function nn(n) {
            let e;
            return {
                c() {
                    e = C("div"),
                        p(e, "class", "pagefind-ui__result-thumb pagefind-ui__loading svelte-4xnkmf")
                },
                m(t, l) {
                    y(t, e, l)
                },
                d(t) {
                    t && v(e)
                }
            }
        }
        function ln(n) {
            let e, t = n[1].meta.image && sn(n);
            return {
                c() {
                    e = C("div"),
                    t && t.c(),
                        p(e, "class", "pagefind-ui__result-thumb svelte-4xnkmf")
                },
                m(l, s) {
                    y(l, e, s),
                    t && t.m(e, null)
                },
                p(l, s) {
                    l[1].meta.image ? t ? t.p(l, s) : (t = sn(l),
                        t.c(),
                        t.m(e, null)) : t && (t.d(1),
                        t = null)
                },
                d(l) {
                    l && v(e),
                    t && t.d()
                }
            }
        }
        function sn(n) {
            let e, t, l;
            return {
                c() {
                    e = C("img"),
                        p(e, "class", "pagefind-ui__result-image svelte-4xnkmf"),
                    se(e.src, t = n[1].meta?.image) || p(e, "src", t),
                        p(e, "alt", l = n[1].meta?.image_alt || n[1].meta?.title)
                },
                m(s, r) {
                    y(s, e, r)
                },
                p(s, r) {
                    r & 2 && !se(e.src, t = s[1].meta?.image) && p(e, "src", t),
                    r & 2 && l !== (l = s[1].meta?.image_alt || s[1].meta?.title) && p(e, "alt", l)
                },
                d(s) {
                    s && v(e)
                }
            }
        }
        function rn(n) {
            let e, t = n[1].excerpt + "";
            return {
                c() {
                    e = C("p"),
                        p(e, "class", "pagefind-ui__result-excerpt svelte-4xnkmf")
                },
                m(l, s) {
                    y(l, e, s),
                        e.innerHTML = t
                },
                p(l, s) {
                    s & 2 && t !== (t = l[1].excerpt + "") && (e.innerHTML = t)
                },
                d(l) {
                    l && v(e)
                }
            }
        }
        function on(n) {
            let e, t, l, s = n[15].title + "", r, i, o, a, h = n[15].excerpt + "";
            return {
                c() {
                    e = C("div"),
                        t = C("p"),
                        l = C("a"),
                        r = w(s),
                        o = S(),
                        a = C("p"),
                        p(l, "class", "pagefind-ui__result-link svelte-4xnkmf"),
                        p(l, "href", i = n[15].url),
                        p(t, "class", "pagefind-ui__result-title svelte-4xnkmf"),
                        p(a, "class", "pagefind-ui__result-excerpt svelte-4xnkmf"),
                        p(e, "class", "pagefind-ui__result-nested svelte-4xnkmf")
                },
                m(_, f) {
                    y(_, e, f),
                        b(e, t),
                        b(t, l),
                        b(l, r),
                        b(e, o),
                        b(e, a),
                        a.innerHTML = h
                },
                p(_, f) {
                    f & 8 && s !== (s = _[15].title + "") && N(r, s),
                    f & 8 && i !== (i = _[15].url) && p(l, "href", i),
                    f & 8 && h !== (h = _[15].excerpt + "") && (a.innerHTML = h)
                },
                d(_) {
                    _ && v(e)
                }
            }
        }
        function an(n) {
            let e, t = n[2], l = [];
            for (let s = 0; s < t.length; s += 1)
                l[s] = un(en(n, t, s));
            return {
                c() {
                    e = C("ul");
                    for (let s = 0; s < l.length; s += 1)
                        l[s].c();
                    p(e, "class", "pagefind-ui__result-tags svelte-4xnkmf")
                },
                m(s, r) {
                    y(s, e, r);
                    for (let i = 0; i < l.length; i += 1)
                        l[i] && l[i].m(e, null)
                },
                p(s, r) {
                    if (r & 4) {
                        t = s[2];
                        let i;
                        for (i = 0; i < t.length; i += 1) {
                            let o = en(s, t, i);
                            l[i] ? l[i].p(o, r) : (l[i] = un(o),
                                l[i].c(),
                                l[i].m(e, null))
                        }
                        for (; i < l.length; i += 1)
                            l[i].d(1);
                        l.length = t.length
                    }
                },
                d(s) {
                    s && v(e),
                        X(l, s)
                }
            }
        }
        function un(n) {
            let e, t = n[11].replace(/^(\w)/, cn) + "", l, s, r = n[12] + "", i, o;
            return {
                c() {
                    e = C("li"),
                        l = w(t),
                        s = w(": "),
                        i = w(r),
                        o = S(),
                        p(e, "class", "pagefind-ui__result-tag svelte-4xnkmf")
                },
                m(a, h) {
                    y(a, e, h),
                        b(e, l),
                        b(e, s),
                        b(e, i),
                        b(e, o)
                },
                p(a, h) {
                    h & 4 && t !== (t = a[11].replace(/^(\w)/, cn) + "") && N(l, t),
                    h & 4 && r !== (r = a[12] + "") && N(i, r)
                },
                d(a) {
                    a && v(e)
                }
            }
        }
        function ul(n) {
            let e;
            function t(r, i) {
                return r[1] ? al : ol
            }
            let l = t(n, -1)
                , s = l(n);
            return {
                c() {
                    e = C("li"),
                        s.c(),
                        p(e, "class", "pagefind-ui__result svelte-4xnkmf")
                },
                m(r, i) {
                    y(r, e, i),
                        s.m(e, null)
                },
                p(r, [i]) {
                    l === (l = t(r, i)) && s ? s.p(r, i) : (s.d(1),
                        s = l(r),
                    s && (s.c(),
                        s.m(e, null)))
                },
                i: j,
                o: j,
                d(r) {
                    r && v(e),
                        s.d()
                }
            }
        }
        var cn = n=>n.toLocaleUpperCase();
        function cl(n, e, t) {
            let {show_images: l=!0} = e, {process_result: s=null} = e, {result: r={
                data: async()=>{}
            }} = e, i = ["title", "image", "image_alt", "url"], o, a = [], h = [], _ = !1, f = (u,m)=>{
                if (u.length <= m)
                    return u;
                let d = [...u].sort((T,R)=>R.locations.length - T.locations.length).slice(0, 3).map(T=>T.url);
                return u.filter(T=>d.includes(T.url))
            }
                , c = async u=>{
                t(1, o = await u.data()),
                    t(1, o = s?.(o) ?? o),
                    t(2, a = Object.entries(o.meta).filter(([m])=>!i.includes(m))),
                Array.isArray(o.sub_results) && (t(4, _ = o.sub_results?.[0]?.url === (o.meta?.url || o.url)),
                    _ ? t(3, h = f(o.sub_results.slice(1), 3)) : t(3, h = f([...o.sub_results], 3)))
            }
                , E = (u=30)=>". ".repeat(Math.floor(10 + Math.random() * u));
            return n.$$set = u=>{
                "show_images"in u && t(0, l = u.show_images),
                "process_result"in u && t(6, s = u.process_result),
                "result"in u && t(7, r = u.result)
            }
                ,
                n.$$.update = ()=>{
                    if (n.$$.dirty & 128)
                        e: c(r)
                }
                ,
                [l, o, a, h, _, E, s, r]
        }
        var nt = class extends q {
            constructor(e) {
                super(),
                    J(this, e, cl, ul, V, {
                        show_images: 0,
                        process_result: 6,
                        result: 7
                    })
            }
        }
            , fn = nt;
        function _n(n, e, t) {
            let l = n.slice();
            return l[9] = e[t][0],
                l[10] = e[t][1],
                l[11] = e,
                l[12] = t,
                l
        }
        function dn(n, e, t) {
            let l = n.slice();
            return l[13] = e[t][0],
                l[14] = e[t][1],
                l[15] = e,
                l[16] = t,
                l
        }
        function hn(n) {
            let e, t, l = n[3]("filters_label", n[4], n[5]) + "", s, r, i = Object.entries(n[1]), o = [];
            for (let a = 0; a < i.length; a += 1)
                o[a] = gn(_n(n, i, a));
            return {
                c() {
                    e = C("fieldset"),
                        t = C("legend"),
                        s = w(l),
                        r = S();
                    for (let a = 0; a < o.length; a += 1)
                        o[a].c();
                    p(t, "class", "pagefind-ui__filter-panel-label svelte-1v2r7ls"),
                        p(e, "class", "pagefind-ui__filter-panel svelte-1v2r7ls")
                },
                m(a, h) {
                    y(a, e, h),
                        b(e, t),
                        b(t, s),
                        b(e, r);
                    for (let _ = 0; _ < o.length; _ += 1)
                        o[_] && o[_].m(e, null)
                },
                p(a, h) {
                    if (h & 56 && l !== (l = a[3]("filters_label", a[4], a[5]) + "") && N(s, l),
                    h & 71) {
                        i = Object.entries(a[1]);
                        let _;
                        for (_ = 0; _ < i.length; _ += 1) {
                            let f = _n(a, i, _);
                            o[_] ? o[_].p(f, h) : (o[_] = gn(f),
                                o[_].c(),
                                o[_].m(e, null))
                        }
                        for (; _ < o.length; _ += 1)
                            o[_].d(1);
                        o.length = i.length
                    }
                },
                d(a) {
                    a && v(e),
                        X(o, a)
                }
            }
        }
        function mn(n) {
            let e, t, l, s, r, i, o, a, h = n[13] + "", _, f = n[14] + "", c, E, u, m, d, T;
            function R() {
                n[8].call(t, n[9], n[13])
            }
            return {
                c() {
                    e = C("div"),
                        t = C("input"),
                        i = S(),
                        o = C("label"),
                        a = new Be(!1),
                        _ = w(" ("),
                        c = w(f),
                        E = w(")"),
                        m = S(),
                        p(t, "class", "pagefind-ui__filter-checkbox svelte-1v2r7ls"),
                        p(t, "type", "checkbox"),
                        p(t, "id", l = n[9] + "-" + n[13]),
                        p(t, "name", s = n[9]),
                        t.__value = r = n[13],
                        t.value = t.__value,
                        a.a = _,
                        p(o, "class", "pagefind-ui__filter-label svelte-1v2r7ls"),
                        p(o, "for", u = n[9] + "-" + n[13]),
                        p(e, "class", "pagefind-ui__filter-value svelte-1v2r7ls"),
                        B(e, "pagefind-ui__filter-value--checked", n[0][`${n[9]}:${n[13]}`])
                },
                m(k, F) {
                    y(k, e, F),
                        b(e, t),
                        t.checked = n[0][`${n[9]}:${n[13]}`],
                        b(e, i),
                        b(e, o),
                        a.m(h, o),
                        b(o, _),
                        b(o, c),
                        b(o, E),
                        b(e, m),
                    d || (T = W(t, "change", R),
                        d = !0)
                },
                p(k, F) {
                    n = k,
                    F & 2 && l !== (l = n[9] + "-" + n[13]) && p(t, "id", l),
                    F & 2 && s !== (s = n[9]) && p(t, "name", s),
                    F & 2 && r !== (r = n[13]) && (t.__value = r,
                        t.value = t.__value),
                    F & 3 && (t.checked = n[0][`${n[9]}:${n[13]}`]),
                    F & 2 && h !== (h = n[13] + "") && a.p(h),
                    F & 2 && f !== (f = n[14] + "") && N(c, f),
                    F & 2 && u !== (u = n[9] + "-" + n[13]) && p(o, "for", u),
                    F & 3 && B(e, "pagefind-ui__filter-value--checked", n[0][`${n[9]}:${n[13]}`])
                },
                d(k) {
                    k && v(e),
                        d = !1,
                        T()
                }
            }
        }
        function pn(n) {
            let e, t = (n[2] || n[14] || n[0][`${n[9]}:${n[13]}`]) && mn(n);
            return {
                c() {
                    t && t.c(),
                        e = Z()
                },
                m(l, s) {
                    t && t.m(l, s),
                        y(l, e, s)
                },
                p(l, s) {
                    l[2] || l[14] || l[0][`${l[9]}:${l[13]}`] ? t ? t.p(l, s) : (t = mn(l),
                        t.c(),
                        t.m(e.parentNode, e)) : t && (t.d(1),
                        t = null)
                },
                d(l) {
                    t && t.d(l),
                    l && v(e)
                }
            }
        }
        function gn(n) {
            let e, t, l = n[9].replace(/^(\w)/, En) + "", s, r, i, o = n[9] + "", a, h, _ = Object.entries(n[10] || {}), f = [];
            for (let c = 0; c < _.length; c += 1)
                f[c] = pn(dn(n, _, c));
            return {
                c() {
                    e = C("details"),
                        t = C("summary"),
                        s = S(),
                        r = C("fieldset"),
                        i = C("legend"),
                        a = S();
                    for (let c = 0; c < f.length; c += 1)
                        f[c].c();
                    h = S(),
                        p(t, "class", "pagefind-ui__filter-name svelte-1v2r7ls"),
                        p(i, "class", "pagefind-ui__filter-group-label svelte-1v2r7ls"),
                        p(r, "class", "pagefind-ui__filter-group svelte-1v2r7ls"),
                        p(e, "class", "pagefind-ui__filter-block svelte-1v2r7ls"),
                        e.open = n[6]
                },
                m(c, E) {
                    y(c, e, E),
                        b(e, t),
                        t.innerHTML = l,
                        b(e, s),
                        b(e, r),
                        b(r, i),
                        i.innerHTML = o,
                        b(r, a);
                    for (let u = 0; u < f.length; u += 1)
                        f[u] && f[u].m(r, null);
                    b(e, h)
                },
                p(c, E) {
                    if (E & 2 && l !== (l = c[9].replace(/^(\w)/, En) + "") && (t.innerHTML = l),
                    E & 2 && o !== (o = c[9] + "") && (i.innerHTML = o),
                    E & 7) {
                        _ = Object.entries(c[10] || {});
                        let u;
                        for (u = 0; u < _.length; u += 1) {
                            let m = dn(c, _, u);
                            f[u] ? f[u].p(m, E) : (f[u] = pn(m),
                                f[u].c(),
                                f[u].m(r, null))
                        }
                        for (; u < f.length; u += 1)
                            f[u].d(1);
                        f.length = _.length
                    }
                    E & 64 && (e.open = c[6])
                },
                d(c) {
                    c && v(e),
                        X(f, c)
                }
            }
        }
        function fl(n) {
            let e = n[1] && Object.entries(n[1]).length, t, l = e && hn(n);
            return {
                c() {
                    l && l.c(),
                        t = Z()
                },
                m(s, r) {
                    l && l.m(s, r),
                        y(s, t, r)
                },
                p(s, [r]) {
                    r & 2 && (e = s[1] && Object.entries(s[1]).length),
                        e ? l ? l.p(s, r) : (l = hn(s),
                            l.c(),
                            l.m(t.parentNode, t)) : l && (l.d(1),
                            l = null)
                },
                i: j,
                o: j,
                d(s) {
                    l && l.d(s),
                    s && v(t)
                }
            }
        }
        var En = n=>n.toLocaleUpperCase();
        function _l(n, e, t) {
            let {available_filters: l=null} = e
                , {show_empty_filters: s=!0} = e
                , {translate: r=()=>""} = e
                , {automatic_translations: i={}} = e
                , {translations: o={}} = e
                , a = {}
                , h = !1
                , _ = !1;
            function f(c, E) {
                a[`${c}:${E}`] = this.checked,
                    t(0, a)
            }
            return n.$$set = c=>{
                "available_filters"in c && t(1, l = c.available_filters),
                "show_empty_filters"in c && t(2, s = c.show_empty_filters),
                "translate"in c && t(3, r = c.translate),
                "automatic_translations"in c && t(4, i = c.automatic_translations),
                "translations"in c && t(5, o = c.translations)
            }
                ,
                n.$$.update = ()=>{
                    if (n.$$.dirty & 130) {
                        e: if (l && !h) {
                            t(7, h = !0);
                            let c = Object.entries(l || {});
                            c.length === 1 && Object.entries(c[0][1])?.length <= 6 && t(6, _ = !0)
                        }
                    }
                }
                ,
                [a, l, s, r, i, o, _, h, f]
        }
        var lt = class extends q {
            constructor(e) {
                super(),
                    J(this, e, _l, fl, V, {
                        available_filters: 1,
                        show_empty_filters: 2,
                        translate: 3,
                        automatic_translations: 4,
                        translations: 5,
                        selected_filters: 0
                    })
            }
            get selected_filters() {
                return this.$$.ctx[0]
            }
        }
            , bn = lt;
        var st = {};
        A(st, {
            comments: ()=>hl,
            default: ()=>gl,
            direction: ()=>ml,
            strings: ()=>pl,
            thanks_to: ()=>dl
        });
        var dl = "Jan Claasen"
            , hl = ""
            , ml = "ltr"
            , pl = {
            placeholder: "Soek",
            clear_search: "Opruim",
            load_more: "Laai nog resultate",
            search_label: "Soek hierdie webwerf",
            filters_label: "Filters",
            zero_results: "Geen resultate vir [SEARCH_TERM]",
            many_results: "[COUNT] resultate vir [SEARCH_TERM]",
            one_result: "[COUNT] resultate vir [SEARCH_TERM]",
            alt_search: "Geen resultate vir [SEARCH_TERM]. Toon resultate vir [DIFFERENT_TERM] in plaas daarvan",
            search_suggestion: "Geen resultate vir [SEARCH_TERM]. Probeer eerder een van die volgende terme:",
            searching: "Soek vir [SEARCH_TERM]"
        }
            , gl = {
            thanks_to: dl,
            comments: hl,
            direction: ml,
            strings: pl
        };
        var rt = {};
        A(rt, {
            comments: ()=>bl,
            default: ()=>Cl,
            direction: ()=>Rl,
            strings: ()=>Tl,
            thanks_to: ()=>El
        });
        var El = "Pablo Villaverde <https://github.com/pvillaverde>"
            , bl = ""
            , Rl = "ltr"
            , Tl = {
            placeholder: "Cerca",
            clear_search: "Netejar",
            load_more: "Veure m\xE9es resultats",
            search_label: "Cerca en aquest lloc",
            filters_label: "Filtres",
            zero_results: "No es van trobar resultats per [SEARCH_TERM]",
            many_results: "[COUNT] resultats trobats per [SEARCH_TERM]",
            one_result: "[COUNT] resultat trobat per [SEARCH_TERM]",
            alt_search: "No es van trobar resultats per [SEARCH_TERM]. Mostrant al seu lloc resultats per [DIFFERENT_TERM]",
            search_suggestion: "No es van trobar resultats per [SEARCH_TERM]. Proveu una de les cerques seg\xFCents:",
            searching: "Cercant [SEARCH_TERM]..."
        }
            , Cl = {
            thanks_to: El,
            comments: bl,
            direction: Rl,
            strings: Tl
        };
        var it = {};
        A(it, {
            comments: ()=>yl,
            default: ()=>wl,
            direction: ()=>kl,
            strings: ()=>Sl,
            thanks_to: ()=>vl
        });
        var vl = "Jan Claasen"
            , yl = ""
            , kl = "ltr"
            , Sl = {
            placeholder: "Suche",
            clear_search: "L\xF6schen",
            load_more: "Mehr Ergebnisse laden",
            search_label: "Suche diese Seite",
            filters_label: "Filter",
            zero_results: "Keine Ergebnisse f\xFCr [SEARCH_TERM]",
            many_results: "[COUNT] Ergebnisse f\xFCr [SEARCH_TERM]",
            one_result: "[COUNT] Ergebnis f\xFCr [SEARCH_TERM]",
            alt_search: "Keine Ergebnisse f\xFCr [SEARCH_TERM]. Stattdessen werden Ergebnisse f\xFCr [DIFFERENT_TERM] angezeigt",
            search_suggestion: "Keine Ergebnisse f\xFCr [SEARCH_TERM]. Versuchen Sie eine der folgenden Suchen:",
            searching: "Suche f\xFCr [SEARCH_TERM]"
        }
            , wl = {
            thanks_to: vl,
            comments: yl,
            direction: kl,
            strings: Sl
        };
        var ot = {};
        A(ot, {
            comments: ()=>Ml,
            default: ()=>Nl,
            direction: ()=>Fl,
            strings: ()=>Hl,
            thanks_to: ()=>Al
        });
        var Al = "Liam Bigelow <liam@cloudcannon.com>"
            , Ml = ""
            , Fl = "ltr"
            , Hl = {
            placeholder: "Search",
            clear_search: "Clear",
            load_more: "Load more results",
            search_label: "Search this site",
            filters_label: "Filters",
            zero_results: "No results for [SEARCH_TERM]",
            many_results: "[COUNT] results for [SEARCH_TERM]",
            one_result: "[COUNT] result for [SEARCH_TERM]",
            alt_search: "No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead",
            search_suggestion: "No results for [SEARCH_TERM]. Try one of the following searches:",
            searching: "Searching for [SEARCH_TERM]..."
        }
            , Nl = {
            thanks_to: Al,
            comments: Ml,
            direction: Fl,
            strings: Hl
        };
        var at = {};
        A(at, {
            comments: ()=>jl,
            default: ()=>Ul,
            direction: ()=>Dl,
            strings: ()=>zl,
            thanks_to: ()=>Ol
        });
        var Ol = "Pablo Villaverde <https://github.com/pvillaverde>"
            , jl = ""
            , Dl = "ltr"
            , zl = {
            placeholder: "Buscar",
            clear_search: "Limpiar",
            load_more: "Ver m\xE1s resultados",
            search_label: "Buscar en este sitio",
            filters_label: "Filtros",
            zero_results: "No se encontraron resultados para [SEARCH_TERM]",
            many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
            one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
            alt_search: "No se encontraron resultados para [SEARCH_TERM]. Mostrando en su lugar resultados para [DIFFERENT_TERM]",
            search_suggestion: "No se encontraron resultados para [SEARCH_TERM]. Prueba una de las siguientes b\xFAsquedas:",
            searching: "Buscando [SEARCH_TERM]..."
        }
            , Ul = {
            thanks_to: Ol,
            comments: jl,
            direction: Dl,
            strings: zl
        };
        var ut = {};
        A(ut, {
            comments: ()=>Ll,
            default: ()=>Bl,
            direction: ()=>Pl,
            strings: ()=>ql,
            thanks_to: ()=>Il
        });
        var Il = "Valtteri Laitinen <dev@valtlai.fi>"
            , Ll = ""
            , Pl = "ltr"
            , ql = {
            placeholder: "Haku",
            clear_search: "Tyhjenn\xE4",
            load_more: "Lataa lis\xE4\xE4 tuloksia",
            search_label: "Hae t\xE4lt\xE4 sivustolta",
            filters_label: "Suodattimet",
            zero_results: "Ei tuloksia haulle [SEARCH_TERM]",
            many_results: "[COUNT] tulosta haulle [SEARCH_TERM]",
            one_result: "[COUNT] tulos haulle [SEARCH_TERM]",
            alt_search: "Ei tuloksia haulle [SEARCH_TERM]. N\xE4ytet\xE4\xE4n tulokset sen sijaan haulle [DIFFERENT_TERM]",
            search_suggestion: "Ei tuloksia haulle [SEARCH_TERM]. Kokeile jotain seuraavista:",
            searching: "Haetaan [SEARCH_TERM]..."
        }
            , Bl = {
            thanks_to: Il,
            comments: Ll,
            direction: Pl,
            strings: ql
        };
        var ct = {};
        A(ct, {
            comments: ()=>Vl,
            default: ()=>Kl,
            direction: ()=>Wl,
            strings: ()=>Jl,
            thanks_to: ()=>Gl
        });
        var Gl = "Nicolas Friedli <nicolas@theologique.ch>"
            , Vl = ""
            , Wl = "ltr"
            , Jl = {
            placeholder: "Rechercher",
            clear_search: "Nettoyer",
            load_more: "Charger plus de r\xE9sultats",
            search_label: "Recherche sur ce site",
            filters_label: "Filtres",
            zero_results: "Pas de r\xE9sultat pour [SEARCH_TERM]",
            many_results: "[COUNT] r\xE9sultats pour [SEARCH_TERM]",
            one_result: "[COUNT] r\xE9sultat pour [SEARCH_TERM]",
            alt_search: "Pas de r\xE9sultat pour [SEARCH_TERM]. Montre les r\xE9sultats pour [DIFFERENT_TERM] \xE0 la place",
            search_suggestion: "Pas de r\xE9sultat pour [SEARCH_TERM]. Essayer une des recherches suivantes:",
            searching: "Recherche [SEARCH_TERM]..."
        }
            , Kl = {
            thanks_to: Gl,
            comments: Vl,
            direction: Wl,
            strings: Jl
        };
        var ft = {};
        A(ft, {
            comments: ()=>Xl,
            default: ()=>xl,
            direction: ()=>Zl,
            strings: ()=>Ql,
            thanks_to: ()=>Yl
        });
        var Yl = "Pablo Villaverde <https://github.com/pvillaverde>"
            , Xl = ""
            , Zl = "ltr"
            , Ql = {
            placeholder: "Buscar",
            clear_search: "Limpar",
            load_more: "Ver m\xE1is resultados",
            search_label: "Buscar neste sitio",
            filters_label: "Filtros",
            zero_results: "Non se atoparon resultados para [SEARCH_TERM]",
            many_results: "[COUNT] resultados atopados para [SEARCH_TERM]",
            one_result: "[COUNT] resultado atopado para [SEARCH_TERM]",
            alt_search: "Non se atoparon resultados para [SEARCH_TERM]. Amosando no seu lugar resultados para [DIFFERENT_TERM]",
            search_suggestion: "Non se atoparon resultados para [SEARCH_TERM]. Probe unha das seguintes pesquisas:",
            searching: "Buscando [SEARCH_TERM]..."
        }
            , xl = {
            thanks_to: Yl,
            comments: Xl,
            direction: Zl,
            strings: Ql
        };
        var _t = {};
        A(_t, {
            comments: ()=>es,
            default: ()=>ls,
            direction: ()=>ts,
            strings: ()=>ns,
            thanks_to: ()=>$l
        });
        var $l = "Amit Yadav <amit@thetechbasket.com>"
            , es = ""
            , ts = "ltr"
            , ns = {
            placeholder: "\u0916\u094B\u091C\u0947\u0902",
            clear_search: "\u0938\u093E\u092B \u0915\u0930\u0947\u0902",
            load_more: "\u0914\u0930 \u0905\u0927\u093F\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
            search_label: "\u0907\u0938 \u0938\u093E\u0907\u091F \u092E\u0947\u0902 \u0916\u094B\u091C\u0947\u0902",
            filters_label: "\u092B\u093C\u093F\u0932\u094D\u091F\u0930",
            zero_results: "\u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E",
            many_results: "[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u092E\u093F\u0932\u0947",
            one_result: "[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u092E\u093F\u0932\u093E",
            alt_search: "[SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0907\u0938\u0915\u0947 \u092C\u091C\u093E\u092F [DIFFERENT_TERM] \u0915\u0947 \u0932\u093F\u090F \u092A\u0930\u093F\u0923\u093E\u092E \u0926\u093F\u0916\u093E \u0930\u0939\u093E \u0939\u0948",
            search_suggestion: "[SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0928\u093F\u092E\u094D\u0928\u0932\u093F\u0916\u093F\u0924 \u0916\u094B\u091C\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u0915\u094B\u0908 \u090F\u0915 \u0906\u091C\u093C\u092E\u093E\u090F\u0902:",
            searching: "[SEARCH_TERM] \u0915\u0940 \u0916\u094B\u091C \u0915\u0940 \u091C\u093E \u0930\u0939\u0940 \u0939\u0948..."
        }
            , ls = {
            thanks_to: $l,
            comments: es,
            direction: ts,
            strings: ns
        };
        var dt = {};
        A(dt, {
            comments: ()=>rs,
            default: ()=>as,
            direction: ()=>is,
            strings: ()=>os,
            thanks_to: ()=>ss
        });
        var ss = "Nixentric"
            , rs = ""
            , is = "ltr"
            , os = {
            placeholder: "Cari",
            clear_search: "Bersihkan",
            load_more: "Muat lebih banyak hasil",
            search_label: "Telusuri situs ini",
            filters_label: "Filter",
            zero_results: "[SEARCH_TERM] tidak ditemukan",
            many_results: "Ditemukan [COUNT] hasil untuk [SEARCH_TERM]",
            one_result: "Ditemukan [COUNT] hasil untuk [SEARCH_TERM]",
            alt_search: "[SEARCH_TERM] tidak ditemukan. Menampilkan hasil [DIFFERENT_TERM] sebagai gantinya",
            search_suggestion: "[SEARCH_TERM] tidak ditemukan. Coba salah satu pencarian berikut ini:",
            searching: "Mencari [SEARCH_TERM]..."
        }
            , as = {
            thanks_to: ss,
            comments: rs,
            direction: is,
            strings: os
        };
        var ht = {};
        A(ht, {
            comments: ()=>cs,
            default: ()=>ds,
            direction: ()=>fs,
            strings: ()=>_s,
            thanks_to: ()=>us
        });
        var us = "Cosette Bruhns Alonso, Andrew Janco <apjanco@upenn.edu>"
            , cs = ""
            , fs = "ltr"
            , _s = {
            placeholder: "Cerca",
            clear_search: "Cancella la cronologia",
            load_more: "Mostra pi\xF9 risultati",
            search_label: "Cerca nel sito",
            filters_label: "Filtri di ricerca",
            zero_results: "Nessun risultato per [SEARCH_TERM]",
            many_results: "[COUNT] risultati per [SEARCH_TERM]",
            one_result: "[COUNT] risultato per [SEARCH_TERM]",
            alt_search: "Nessun risultato per [SEARCH_TERM]. Mostrando risultati per [DIFFERENT_TERM] come alternativa.",
            search_suggestion: "Nessun risultato per [SEARCH_TERM]. Prova una delle seguenti ricerche:",
            searching: "Cercando [SEARCH_TERM]..."
        }
            , ds = {
            thanks_to: us,
            comments: cs,
            direction: fs,
            strings: _s
        };
        var mt = {};
        A(mt, {
            comments: ()=>ms,
            default: ()=>Es,
            direction: ()=>ps,
            strings: ()=>gs,
            thanks_to: ()=>hs
        });
        var hs = "Tate"
            , ms = ""
            , ps = "ltr"
            , gs = {
            placeholder: "\u691C\u7D22",
            clear_search: "\u6D88\u3059",
            load_more: "\u3082\u3063\u3068\u8AAD\u307F\u8FBC\u3080",
            search_label: "\u3053\u306E\u30B5\u30A4\u30C8\u3092\u691C\u7D22",
            filters_label: "\u30D5\u30A3\u30EB\u30BF",
            zero_results: "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F",
            many_results: "[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
            one_result: "[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
            alt_search: "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002[DIFFERENT_TERM]\u306E\u691C\u7D22\u7D50\u679C\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059",
            search_suggestion: "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6B21\u306E\u3044\u305A\u308C\u304B\u306E\u691C\u7D22\u3092\u8A66\u3057\u3066\u304F\u3060\u3055\u3044",
            searching: "[SEARCH_TERM]\u3092\u691C\u7D22\u3057\u3066\u3044\u307E\u3059"
        }
            , Es = {
            thanks_to: hs,
            comments: ms,
            direction: ps,
            strings: gs
        };
        var pt = {};
        A(pt, {
            comments: ()=>Rs,
            default: ()=>vs,
            direction: ()=>Ts,
            strings: ()=>Cs,
            thanks_to: ()=>bs
        });
        var bs = "Paul van Brouwershaven"
            , Rs = ""
            , Ts = "ltr"
            , Cs = {
            placeholder: "Zoeken",
            clear_search: "Reset",
            load_more: "Meer resultaten laden",
            search_label: "Doorzoek deze site",
            filters_label: "Filters",
            zero_results: "Geen resultaten voor [SEARCH_TERM]",
            many_results: "[COUNT] resultaten voor [SEARCH_TERM]",
            one_result: "[COUNT] resultaat voor [SEARCH_TERM]",
            alt_search: "Geen resultaten voor [SEARCH_TERM]. In plaats daarvan worden resultaten voor [DIFFERENT_TERM] weergegeven",
            search_suggestion: "Geen resultaten voor [SEARCH_TERM]. Probeer een van de volgende zoekopdrachten:",
            searching: "Zoeken naar [SEARCH_TERM]..."
        }
            , vs = {
            thanks_to: bs,
            comments: Rs,
            direction: Ts,
            strings: Cs
        };
        var gt = {};
        A(gt, {
            comments: ()=>ks,
            default: ()=>As,
            direction: ()=>Ss,
            strings: ()=>ws,
            thanks_to: ()=>ys
        });
        var ys = "Christopher Wingate"
            , ks = ""
            , Ss = "ltr"
            , ws = {
            placeholder: "S\xF8k",
            clear_search: "Fjern",
            load_more: "Last flere resultater",
            search_label: "S\xF8k p\xE5 denne siden",
            filters_label: "Filtre",
            zero_results: "Ingen resultater for [SEARCH_TERM]",
            many_results: "[COUNT] resultater for [SEARCH_TERM]",
            one_result: "[COUNT] resultat for [SEARCH_TERM]",
            alt_search: "Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
            search_suggestion: "Ingen resultater for [SEARCH_TERM]. Pr\xF8v en av disse s\xF8keordene i stedet:",
            searching: "S\xF8ker etter [SEARCH_TERM]"
        }
            , As = {
            thanks_to: ys,
            comments: ks,
            direction: Ss,
            strings: ws
        };
        var Et = {};
        A(Et, {
            comments: ()=>Fs,
            default: ()=>Os,
            direction: ()=>Hs,
            strings: ()=>Ns,
            thanks_to: ()=>Ms
        });
        var Ms = "Jonatah"
            , Fs = ""
            , Hs = "ltr"
            , Ns = {
            placeholder: "Pesquisar",
            clear_search: "Limpar",
            load_more: "Ver mais resultados",
            search_label: "Pesquisar",
            filters_label: "Filtros",
            zero_results: "Nenhum resultado encontrado para [SEARCH_TERM]",
            many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
            one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
            alt_search: "Nenhum resultado encontrado para [SEARCH_TERM]. Exibindo resultados para [DIFFERENT_TERM]",
            search_suggestion: "Nenhum resultado encontrado para [SEARCH_TERM]. Tente uma das seguintes pesquisas:",
            searching: "Pesquisando por [SEARCH_TERM]..."
        }
            , Os = {
            thanks_to: Ms,
            comments: Fs,
            direction: Hs,
            strings: Ns
        };
        var bt = {};
        A(bt, {
            comments: ()=>Ds,
            default: ()=>Is,
            direction: ()=>zs,
            strings: ()=>Us,
            thanks_to: ()=>js
        });
        var js = "Aleksandr Gordeev"
            , Ds = ""
            , zs = "ltr"
            , Us = {
            placeholder: "\u041F\u043E\u0438\u0441\u043A",
            clear_search: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435",
            load_more: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0435",
            search_label: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443",
            filters_label: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B",
            zero_results: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
            many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
            one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
            alt_search: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [DIFFERENT_TERM]",
            search_suggestion: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
            searching: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]"
        }
            , Is = {
            thanks_to: js,
            comments: Ds,
            direction: zs,
            strings: Us
        };
        var Rt = {};
        A(Rt, {
            comments: ()=>Ps,
            default: ()=>Gs,
            direction: ()=>qs,
            strings: ()=>Bs,
            thanks_to: ()=>Ls
        });
        var Ls = "Andrija Sagicc"
            , Ps = ""
            , qs = "ltr"
            , Bs = {
            placeholder: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430",
            clear_search: "\u0411\u0440\u0438\u0441\u0430\u045A\u0435",
            load_more: "\u041F\u0440\u0438\u043A\u0430\u0437 \u0432\u0438\u0448\u0435 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430",
            search_label: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430 \u0441\u0430\u0458\u0442\u0430",
            filters_label: "\u0424\u0438\u043B\u0442\u0435\u0440\u0438",
            zero_results: "\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
            many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
            one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
            alt_search: "\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]. \u041F\u0440\u0438\u043A\u0430\u0437 \u0434\u043E\u0434\u0430\u0442\u043D\u0438\u043A \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [DIFFERENT_TERM]",
            search_suggestion: "\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]. \u041F\u043E\u043A\u0443\u0448\u0430\u0458\u0442\u0435 \u0441\u0430 \u043D\u0435\u043A\u043E\u043C \u043E\u0434 \u0441\u043B\u0435\u0434\u0435\u045B\u0438\u0445 \u043F\u0440\u0435\u0442\u0440\u0430\u0433\u0430:",
            searching: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430 \u0442\u0435\u0440\u043C\u0438\u043D\u0430 [SEARCH_TERM]..."
        }
            , Gs = {
            thanks_to: Ls,
            comments: Ps,
            direction: qs,
            strings: Bs
        };
        var Tt = {};
        A(Tt, {
            comments: ()=>Ws,
            default: ()=>Ys,
            direction: ()=>Js,
            strings: ()=>Ks,
            thanks_to: ()=>Vs
        });
        var Vs = "Montazar Al-Jaber <montazar@nanawee.tech>"
            , Ws = ""
            , Js = "ltr"
            , Ks = {
            placeholder: "S\xF6k",
            clear_search: "Rensa",
            load_more: "Visa fler tr\xE4ffar",
            search_label: "S\xF6k p\xE5 denna sida",
            filters_label: "Filter",
            zero_results: "[SEARCH_TERM] gav inga tr\xE4ffar",
            many_results: "[SEARCH_TERM] gav [COUNT] tr\xE4ffar",
            one_result: "[SEARCH_TERM] gav [COUNT] tr\xE4ff",
            alt_search: "[SEARCH_TERM] gav inga tr\xE4ffar. Visar resultat f\xF6r [DIFFERENT_TERM] ist\xE4llet",
            search_suggestion: "[SEARCH_TERM] gav inga tr\xE4ffar. F\xF6rs\xF6k igen med en av f\xF6ljande s\xF6kord:",
            searching: "S\xF6ker efter [SEARCH_TERM]..."
        }
            , Ys = {
            thanks_to: Vs,
            comments: Ws,
            direction: Js,
            strings: Ks
        };
        var Ct = {};
        A(Ct, {
            comments: ()=>Zs,
            default: ()=>$s,
            direction: ()=>Qs,
            strings: ()=>xs,
            thanks_to: ()=>Xs
        });
        var Xs = ""
            , Zs = ""
            , Qs = "ltr"
            , xs = {
            placeholder: "\u0BA4\u0BC7\u0B9F\u0BC1\u0B95",
            clear_search: "\u0B85\u0BB4\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0B95",
            load_more: "\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95",
            search_label: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BB3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BC7\u0B9F\u0BC1\u0B95",
            filters_label: "\u0BB5\u0B9F\u0BBF\u0B95\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BCD",
            zero_results: "[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
            many_results: "[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 [COUNT] \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
            one_result: "[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1",
            alt_search: "[SEARCH_TERM] \u0B87\u0BA4\u0BCD\u0BA4\u0BC7\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8, \u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BC7\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0B92\u0BA4\u0BCD\u0BA4 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD [DIFFERENT_TERM]",
            search_suggestion: "[SEARCH_TERM] \u0B87\u0BA4\u0BCD \u0BA4\u0BC7\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.\u0B87\u0BA4\u0BB1\u0BCD\u0B95\u0BC1 \u0BAA\u0BA4\u0BBF\u0BB2\u0BC0\u0B9F\u0BBE\u0BA9 \u0BA4\u0BC7\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC8 \u0BA4\u0BC7\u0B9F\u0BC1\u0B95:",
            searching: "[SEARCH_TERM] \u0BA4\u0BC7\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA4\u0BC1"
        }
            , $s = {
            thanks_to: Xs,
            comments: Zs,
            direction: Qs,
            strings: xs
        };
        var vt = {};
        A(vt, {
            comments: ()=>tr,
            default: ()=>sr,
            direction: ()=>nr,
            strings: ()=>lr,
            thanks_to: ()=>er
        });
        var er = "Taylan \xD6zg\xFCr Bildik"
            , tr = ""
            , nr = "ltr"
            , lr = {
            placeholder: "Ara\u015Ft\u0131r",
            clear_search: "Temizle",
            load_more: "Daha fazla sonu\xE7",
            search_label: "Site genelinde arama",
            filters_label: "Filtreler",
            zero_results: "[SEARCH_TERM] i\xE7in sonu\xE7 yok",
            many_results: "[SEARCH_TERM] i\xE7in [COUNT] sonu\xE7 bulundu",
            one_result: "[SEARCH_TERM] i\xE7in [COUNT] sonu\xE7 bulundu",
            alt_search: "[SEARCH_TERM] i\xE7in sonu\xE7 yok. Bunun yerine [DIFFERENT_TERM] i\xE7in sonu\xE7lar g\xF6steriliyor",
            search_suggestion: "[SEARCH_TERM] i\xE7in sonu\xE7 yok. Alternatif olarak a\u015Fa\u011F\u0131daki kelimelerden birini deneyebilirsiniz:",
            searching: "[SEARCH_TERM] ara\u015Ft\u0131r\u0131l\u0131yor..."
        }
            , sr = {
            thanks_to: er,
            comments: tr,
            direction: nr,
            strings: lr
        };
        var yt = {};
        A(yt, {
            comments: ()=>ir,
            default: ()=>ur,
            direction: ()=>or,
            strings: ()=>ar,
            thanks_to: ()=>rr
        });
        var rr = "Amber Song"
            , ir = ""
            , or = "ltr"
            , ar = {
            placeholder: "\u641C\u7D22",
            clear_search: "\u6E05\u9664",
            load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
            search_label: "\u7AD9\u5185\u641C\u7D22",
            filters_label: "\u7B5B\u9009",
            zero_results: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            many_results: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            one_result: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            alt_search: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            search_suggestion: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
            searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]..."
        }
            , ur = {
            thanks_to: rr,
            comments: ir,
            direction: or,
            strings: ar
        };
        var kt = {};
        A(kt, {
            comments: ()=>fr,
            default: ()=>hr,
            direction: ()=>_r,
            strings: ()=>dr,
            thanks_to: ()=>cr
        });
        var cr = "Amber Song"
            , fr = ""
            , _r = "ltr"
            , dr = {
            placeholder: "\u641C\u7D22",
            clear_search: "\u6E05\u9664",
            load_more: "\u52A0\u8F09\u66F4\u591A\u7D50\u679C",
            search_label: "\u7AD9\u5167\u641C\u7D22",
            filters_label: "\u7BE9\u9078",
            zero_results: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
            many_results: "\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
            one_result: "\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
            alt_search: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u6539\u70BA\u986F\u793A [DIFFERENT_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
            search_suggestion: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u8ACB\u5617\u8A66\u4EE5\u4E0B\u641C\u7D22\u3002",
            searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]..."
        }
            , hr = {
            thanks_to: cr,
            comments: fr,
            direction: _r,
            strings: dr
        };
        var St = {};
        A(St, {
            comments: ()=>pr,
            default: ()=>br,
            direction: ()=>gr,
            strings: ()=>Er,
            thanks_to: ()=>mr
        });
        var mr = "Amber Song"
            , pr = ""
            , gr = "ltr"
            , Er = {
            placeholder: "\u641C\u7D22",
            clear_search: "\u6E05\u9664",
            load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
            search_label: "\u7AD9\u5185\u641C\u7D22",
            filters_label: "\u7B5B\u9009",
            zero_results: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            many_results: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            one_result: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            alt_search: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
            search_suggestion: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
            searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]..."
        }
            , br = {
            thanks_to: mr,
            comments: pr,
            direction: gr,
            strings: Er
        };
        var Rr = [st, rt, it, ot, at, ut, ct, ft, _t, dt, ht, mt, pt, gt, Et, bt, Rt, Tt, Ct, vt, yt, kt, St]
            , Rn = Rr
            , Tn = ["../../translations/af.json", "../../translations/ca.json", "../../translations/de.json", "../../translations/en.json", "../../translations/es.json", "../../translations/fi.json", "../../translations/fr.json", "../../translations/gl.json", "../../translations/hi.json", "../../translations/id.json", "../../translations/it.json", "../../translations/ja.json", "../../translations/nl.json", "../../translations/no.json", "../../translations/pt.json", "../../translations/ru.json", "../../translations/sr.json", "../../translations/sv.json", "../../translations/ta.json", "../../translations/tr.json", "../../translations/zh-cn.json", "../../translations/zh-tw.json", "../../translations/zh.json"];
        function Cn(n, e, t) {
            let l = n.slice();
            return l[47] = e[t],
                l
        }
        function vn(n) {
            let e, t, l;
            function s(i) {
                n[33](i)
            }
            let r = {
                show_empty_filters: n[4],
                available_filters: n[16],
                translate: n[18],
                automatic_translations: n[17],
                translations: n[5]
            };
            return n[7] !== void 0 && (r.selected_filters = n[7]),
                e = new bn({
                    props: r
                }),
                le.push(()=>Gt(e, "selected_filters", s)),
                {
                    c() {
                        Ge(e.$$.fragment)
                    },
                    m(i, o) {
                        he(e, i, o),
                            l = !0
                    },
                    p(i, o) {
                        let a = {};
                        o[0] & 16 && (a.show_empty_filters = i[4]),
                        o[0] & 65536 && (a.available_filters = i[16]),
                        o[0] & 131072 && (a.automatic_translations = i[17]),
                        o[0] & 32 && (a.translations = i[5]),
                        !t && o[0] & 128 && (t = !0,
                            a.selected_filters = i[7],
                            Lt(()=>t = !1)),
                            e.$set(a)
                    },
                    i(i) {
                        l || (D(e.$$.fragment, i),
                            l = !0)
                    },
                    o(i) {
                        I(e.$$.fragment, i),
                            l = !1
                    },
                    d(i) {
                        oe(e, i)
                    }
                }
        }
        function yn(n) {
            let e, t, l, s, r = [vr, Cr], i = [];
            function o(a, h) {
                return a[12] ? 0 : 1
            }
            return t = o(n, [-1, -1]),
                l = i[t] = r[t](n),
                {
                    c() {
                        e = C("div"),
                            l.c(),
                            p(e, "class", "pagefind-ui__results-area svelte-1d60ae3")
                    },
                    m(a, h) {
                        y(a, e, h),
                            i[t].m(e, null),
                            s = !0
                    },
                    p(a, h) {
                        let _ = t;
                        t = o(a, h),
                            t === _ ? i[t].p(a, h) : (re(),
                                I(i[_], 1, 1, ()=>{
                                        i[_] = null
                                    }
                                ),
                                ie(),
                                l = i[t],
                                l ? l.p(a, h) : (l = i[t] = r[t](a),
                                    l.c()),
                                D(l, 1),
                                l.m(e, null))
                    },
                    i(a) {
                        s || (D(l),
                            s = !0)
                    },
                    o(a) {
                        I(l),
                            s = !1
                    },
                    d(a) {
                        a && v(e),
                            i[t].d()
                    }
                }
        }
        function Cr(n) {
            let e, t, l, s = [], r = new Map, i, o, a;
            function h(m, d) {
                return m[11].results.length === 0 ? Sr : m[11].results.length === 1 ? kr : yr
            }
            let _ = h(n, [-1, -1])
                , f = _(n)
                , c = n[11].results.slice(0, n[15])
                , E = m=>m[47].id;
            for (let m = 0; m < c.length; m += 1) {
                let d = Cn(n, c, m)
                    , T = E(d);
                r.set(T, s[m] = kn(T, d))
            }
            let u = n[11].results.length > n[15] && Sn(n);
            return {
                c() {
                    e = C("p"),
                        f.c(),
                        t = S(),
                        l = C("ol");
                    for (let m = 0; m < s.length; m += 1)
                        s[m].c();
                    i = S(),
                    u && u.c(),
                        o = Z(),
                        p(e, "class", "pagefind-ui__message svelte-1d60ae3"),
                        p(l, "class", "pagefind-ui__results svelte-1d60ae3")
                },
                m(m, d) {
                    y(m, e, d),
                        f.m(e, null),
                        y(m, t, d),
                        y(m, l, d);
                    for (let T = 0; T < s.length; T += 1)
                        s[T] && s[T].m(l, null);
                    y(m, i, d),
                    u && u.m(m, d),
                        y(m, o, d),
                        a = !0
                },
                p(m, d) {
                    _ === (_ = h(m, d)) && f ? f.p(m, d) : (f.d(1),
                        f = _(m),
                    f && (f.c(),
                        f.m(e, null))),
                    d[0] & 34830 && (c = m[11].results.slice(0, m[15]),
                        re(),
                        s = Bt(s, d, E, 1, m, c, r, l, qt, kn, null, Cn),
                        ie()),
                        m[11].results.length > m[15] ? u ? u.p(m, d) : (u = Sn(m),
                            u.c(),
                            u.m(o.parentNode, o)) : u && (u.d(1),
                            u = null)
                },
                i(m) {
                    if (!a) {
                        for (let d = 0; d < c.length; d += 1)
                            D(s[d]);
                        a = !0
                    }
                },
                o(m) {
                    for (let d = 0; d < s.length; d += 1)
                        I(s[d]);
                    a = !1
                },
                d(m) {
                    m && v(e),
                        f.d(),
                    m && v(t),
                    m && v(l);
                    for (let d = 0; d < s.length; d += 1)
                        s[d].d();
                    m && v(i),
                    u && u.d(m),
                    m && v(o)
                }
            }
        }
        function vr(n) {
            let e, t = n[14] && wn(n);
            return {
                c() {
                    t && t.c(),
                        e = Z()
                },
                m(l, s) {
                    t && t.m(l, s),
                        y(l, e, s)
                },
                p(l, s) {
                    l[14] ? t ? t.p(l, s) : (t = wn(l),
                        t.c(),
                        t.m(e.parentNode, e)) : t && (t.d(1),
                        t = null)
                },
                i: j,
                o: j,
                d(l) {
                    t && t.d(l),
                    l && v(e)
                }
            }
        }
        function yr(n) {
            let e = n[18]("many_results", n[17], n[5]).replace(/\[SEARCH_TERM\]/, n[14]).replace(/\[COUNT\]/, new Intl.NumberFormat(n[5].language).format(n[11].results.length)) + "", t;
            return {
                c() {
                    t = w(e)
                },
                m(l, s) {
                    y(l, t, s)
                },
                p(l, s) {
                    s[0] & 149536 && e !== (e = l[18]("many_results", l[17], l[5]).replace(/\[SEARCH_TERM\]/, l[14]).replace(/\[COUNT\]/, new Intl.NumberFormat(l[5].language).format(l[11].results.length)) + "") && N(t, e)
                },
                d(l) {
                    l && v(t)
                }
            }
        }
        function kr(n) {
            let e = n[18]("one_result", n[17], n[5]).replace(/\[SEARCH_TERM\]/, n[14]).replace(/\[COUNT\]/, new Intl.NumberFormat(n[5].language).format(1)) + "", t;
            return {
                c() {
                    t = w(e)
                },
                m(l, s) {
                    y(l, t, s)
                },
                p(l, s) {
                    s[0] & 147488 && e !== (e = l[18]("one_result", l[17], l[5]).replace(/\[SEARCH_TERM\]/, l[14]).replace(/\[COUNT\]/, new Intl.NumberFormat(l[5].language).format(1)) + "") && N(t, e)
                },
                d(l) {
                    l && v(t)
                }
            }
        }
        function Sr(n) {
            let e = n[18]("zero_results", n[17], n[5]).replace(/\[SEARCH_TERM\]/, n[14]) + "", t;
            return {
                c() {
                    t = w(e)
                },
                m(l, s) {
                    y(l, t, s)
                },
                p(l, s) {
                    s[0] & 147488 && e !== (e = l[18]("zero_results", l[17], l[5]).replace(/\[SEARCH_TERM\]/, l[14]) + "") && N(t, e)
                },
                d(l) {
                    l && v(t)
                }
            }
        }
        function wr(n) {
            let e, t;
            return e = new $t({
                props: {
                    show_images: n[1],
                    process_result: n[3],
                    result: n[47]
                }
            }),
                {
                    c() {
                        Ge(e.$$.fragment)
                    },
                    m(l, s) {
                        he(e, l, s),
                            t = !0
                    },
                    p(l, s) {
                        let r = {};
                        s[0] & 2 && (r.show_images = l[1]),
                        s[0] & 8 && (r.process_result = l[3]),
                        s[0] & 34816 && (r.result = l[47]),
                            e.$set(r)
                    },
                    i(l) {
                        t || (D(e.$$.fragment, l),
                            t = !0)
                    },
                    o(l) {
                        I(e.$$.fragment, l),
                            t = !1
                    },
                    d(l) {
                        oe(e, l)
                    }
                }
        }
        function Ar(n) {
            let e, t;
            return e = new fn({
                props: {
                    show_images: n[1],
                    process_result: n[3],
                    result: n[47]
                }
            }),
                {
                    c() {
                        Ge(e.$$.fragment)
                    },
                    m(l, s) {
                        he(e, l, s),
                            t = !0
                    },
                    p(l, s) {
                        let r = {};
                        s[0] & 2 && (r.show_images = l[1]),
                        s[0] & 8 && (r.process_result = l[3]),
                        s[0] & 34816 && (r.result = l[47]),
                            e.$set(r)
                    },
                    i(l) {
                        t || (D(e.$$.fragment, l),
                            t = !0)
                    },
                    o(l) {
                        I(e.$$.fragment, l),
                            t = !1
                    },
                    d(l) {
                        oe(e, l)
                    }
                }
        }
        function kn(n, e) {
            let t, l, s, r, i, o = [Ar, wr], a = [];
            function h(_, f) {
                return _[2] ? 0 : 1
            }
            return l = h(e, [-1, -1]),
                s = a[l] = o[l](e),
                {
                    key: n,
                    first: null,
                    c() {
                        t = Z(),
                            s.c(),
                            r = Z(),
                            this.first = t
                    },
                    m(_, f) {
                        y(_, t, f),
                            a[l].m(_, f),
                            y(_, r, f),
                            i = !0
                    },
                    p(_, f) {
                        e = _;
                        let c = l;
                        l = h(e, f),
                            l === c ? a[l].p(e, f) : (re(),
                                I(a[c], 1, 1, ()=>{
                                        a[c] = null
                                    }
                                ),
                                ie(),
                                s = a[l],
                                s ? s.p(e, f) : (s = a[l] = o[l](e),
                                    s.c()),
                                D(s, 1),
                                s.m(r.parentNode, r))
                    },
                    i(_) {
                        i || (D(s),
                            i = !0)
                    },
                    o(_) {
                        I(s),
                            i = !1
                    },
                    d(_) {
                        _ && v(t),
                            a[l].d(_),
                        _ && v(r)
                    }
                }
        }
        function Sn(n) {
            let e, t = n[18]("load_more", n[17], n[5]) + "", l, s, r;
            return {
                c() {
                    e = C("button"),
                        l = w(t),
                        p(e, "type", "button"),
                        p(e, "class", "pagefind-ui__button svelte-1d60ae3")
                },
                m(i, o) {
                    y(i, e, o),
                        b(e, l),
                    s || (r = W(e, "click", n[20]),
                        s = !0)
                },
                p(i, o) {
                    o[0] & 131104 && t !== (t = i[18]("load_more", i[17], i[5]) + "") && N(l, t)
                },
                d(i) {
                    i && v(e),
                        s = !1,
                        r()
                }
            }
        }
        function wn(n) {
            let e, t = n[18]("searching", n[17], n[5]).replace(/\[SEARCH_TERM\]/, n[14]) + "", l;
            return {
                c() {
                    e = C("p"),
                        l = w(t),
                        p(e, "class", "pagefind-ui__message svelte-1d60ae3")
                },
                m(s, r) {
                    y(s, e, r),
                        b(e, l)
                },
                p(s, r) {
                    r[0] & 147488 && t !== (t = s[18]("searching", s[17], s[5]).replace(/\[SEARCH_TERM\]/, s[14]) + "") && N(l, t)
                },
                d(s) {
                    s && v(e)
                }
            }
        }
        function Mr(n) {
            let e, t, l, s, r, i, o = n[18]("clear_search", n[17], n[5]) + "", a, h, _, f, c, E, u, m, d = n[10] && vn(n), T = n[13] && yn(n);
            return {
                c() {
                    e = C("div"),
                        t = C("form"),
                        l = C("input"),
                        r = S(),
                        i = C("button"),
                        a = w(o),
                        h = S(),
                        _ = C("div"),
                    d && d.c(),
                        f = S(),
                    T && T.c(),
                        p(l, "class", "pagefind-ui__search-input svelte-1d60ae3"),
                        p(l, "type", "text"),
                        p(l, "placeholder", s = n[18]("placeholder", n[17], n[5])),
                        p(l, "autocapitalize", "none"),
                        p(l, "enterkeyhint", "search"),
                        p(i, "class", "pagefind-ui__search-clear svelte-1d60ae3"),
                        B(i, "pagefind-ui__suppressed", !n[6]),
                        p(_, "class", "pagefind-ui__drawer svelte-1d60ae3"),
                        B(_, "pagefind-ui__hidden", !n[13]),
                        p(t, "class", "pagefind-ui__form svelte-1d60ae3"),
                        p(t, "role", "search"),
                        p(t, "aria-label", c = n[18]("search_label", n[17], n[5])),
                        p(t, "action", "javascript:void(0);"),
                        p(e, "class", "pagefind-ui svelte-1d60ae3"),
                        B(e, "pagefind-ui--reset", n[0])
                },
                m(R, k) {
                    y(R, e, k),
                        b(e, t),
                        b(t, l),
                        xe(l, n[6]),
                        n[30](l),
                        b(t, r),
                        b(t, i),
                        b(i, a),
                        n[31](i),
                        b(t, h),
                        b(t, _),
                    d && d.m(_, null),
                        b(_, f),
                    T && T.m(_, null),
                        E = !0,
                    u || (m = [W(l, "focus", n[19]), W(l, "keydown", n[28]), W(l, "input", n[29]), W(i, "click", n[32]), W(t, "submit", Fr)],
                        u = !0)
                },
                p(R, k) {
                    (!E || k[0] & 131104 && s !== (s = R[18]("placeholder", R[17], R[5]))) && p(l, "placeholder", s),
                    k[0] & 64 && l.value !== R[6] && xe(l, R[6]),
                    (!E || k[0] & 131104) && o !== (o = R[18]("clear_search", R[17], R[5]) + "") && N(a, o),
                    (!E || k[0] & 64) && B(i, "pagefind-ui__suppressed", !R[6]),
                        R[10] ? d ? (d.p(R, k),
                        k[0] & 1024 && D(d, 1)) : (d = vn(R),
                            d.c(),
                            D(d, 1),
                            d.m(_, f)) : d && (re(),
                            I(d, 1, 1, ()=>{
                                    d = null
                                }
                            ),
                            ie()),
                        R[13] ? T ? (T.p(R, k),
                        k[0] & 8192 && D(T, 1)) : (T = yn(R),
                            T.c(),
                            D(T, 1),
                            T.m(_, null)) : T && (re(),
                            I(T, 1, 1, ()=>{
                                    T = null
                                }
                            ),
                            ie()),
                    (!E || k[0] & 8192) && B(_, "pagefind-ui__hidden", !R[13]),
                    (!E || k[0] & 131104 && c !== (c = R[18]("search_label", R[17], R[5]))) && p(t, "aria-label", c),
                    (!E || k[0] & 1) && B(e, "pagefind-ui--reset", R[0])
                },
                i(R) {
                    E || (D(d),
                        D(T),
                        E = !0)
                },
                o(R) {
                    I(d),
                        I(T),
                        E = !1
                },
                d(R) {
                    R && v(e),
                        n[30](null),
                        n[31](null),
                    d && d.d(),
                    T && T.d(),
                        u = !1,
                        G(m)
                }
            }
        }
        var Fr = n=>n.preventDefault();
        function Hr(n, e, t) {
            let l = {}
                , s = Tn.map(g=>g.match(/([^\/]+)\.json$/)[1]);
            for (let g = 0; g < s.length; g++)
                l[s[g]] = {
                    language: s[g],
                    ...Rn[g].strings
                };
            let {base_path: r="/pagefind/"} = e, {reset_styles: i=!0} = e, {show_images: o=!0} = e, {show_sub_results: a=!1} = e, {excerpt_length: h} = e, {process_result: _=null} = e, {process_term: f=null} = e, {show_empty_filters: c=!0} = e, {debounce_timeout_ms: E=300} = e, {pagefind_options: u={}} = e, {merge_index: m=[]} = e, {trigger_search_term: d=""} = e, {translations: T={}} = e, R = "", k, F, x, ae = 40, M = !1, L = [], U = !1, Y = !1, Mt = 0, Ft = "", Je = 5, Ht = null, ue = null, Ie = {}, Nt = l.en, Mn = (g,H,O)=>O[g] ?? H[g] ?? "";
            $e(()=>{
                    let g = document?.querySelector?.("html")?.getAttribute?.("lang") || "en"
                        , H = Ve(g.toLocaleLowerCase());
                    t(17, Nt = l[`${H.language}-${H.script}-${H.region}`] || l[`${H.language}-${H.region}`] || l[`${H.language}`] || l.en)
                }
            );
            let Ot = async()=>{
                    if (!M && (t(10, M = !0),
                        !k)) {
                        let g;
                        try {
                            g = await import(`${r}pagefind.js`)
                        } catch (O) {
                            console.error(O),
                                console.error([`Pagefind couldn't be loaded from ${this.options.bundlePath}pagefind.js`, "You can configure this by passing a bundlePath option to PagefindUI", `[DEBUG: Loaded from ${document?.currentScript?.src ?? "no known script location"}]`].join(`
`))
                        }
                        h || t(22, h = a ? 12 : 30);
                        let H = {
                            ...u || {},
                            excerptLength: h
                        };
                        await g.options(H);
                        for (let O of m) {
                            if (!O.bundlePath)
                                throw new Error("mergeIndex requires a bundlePath parameter");
                            let P = O.bundlePath;
                            delete O.bundlePath,
                                await g.mergeIndex(P, O)
                        }
                        k = g,
                            Fn()
                    }
                }
                , Fn = async()=>{
                    k && (Ht = await k.filters(),
                    (!ue || !Object.keys(ue).length) && t(16, ue = Ht))
                }
                , Hn = g=>{
                    let H = {};
                    return Object.entries(g).filter(([,O])=>O).forEach(([O])=>{
                            let[P,Bn] = O.split(/:(.*)$/);
                            H[P] = H[P] || [],
                                H[P].push(Bn)
                        }
                    ),
                        H
                }
                , ce, Nn = async(g,H)=>{
                    if (!g) {
                        t(13, Y = !1),
                        ce && clearTimeout(ce);
                        return
                    }
                    let O = Hn(H)
                        , P = ()=>On(g, O);
                    E > 0 && g ? (ce && clearTimeout(ce),
                        ce = setTimeout(P, E),
                        await jt(),
                        k.preload(g, {
                            filters: O
                        })) : P(),
                        jn()
                }
                , jt = async()=>{
                    for (; !k; )
                        Ot(),
                            await new Promise(g=>setTimeout(g, 50))
                }
                , On = async(g,H)=>{
                    t(14, Ft = g || ""),
                    typeof f == "function" && (g = f(g)),
                        t(12, U = !0),
                        t(13, Y = !0),
                        await jt();
                    let O = ++Mt
                        , P = await k.search(g, {
                        filters: H
                    });
                    Mt === O && (P.filters && Object.keys(P.filters)?.length && t(16, ue = P.filters),
                        t(11, L = P),
                        t(12, U = !1),
                        t(15, Je = 5))
                }
                , jn = ()=>{
                    let g = x.offsetWidth;
                    g != ae && t(8, F.style.paddingRight = `${g + 2}px`, F)
                }
                , Dn = g=>{
                    g?.preventDefault(),
                        t(15, Je += 5)
                }
                , zn = g=>{
                    g.key === "Escape" && (t(6, R = ""),
                        F.blur()),
                    g.key === "Enter" && g.preventDefault()
                }
            ;
            function Un() {
                R = this.value,
                    t(6, R),
                    t(21, d)
            }
            function In(g) {
                le[g ? "unshift" : "push"](()=>{
                        F = g,
                            t(8, F)
                    }
                )
            }
            function Ln(g) {
                le[g ? "unshift" : "push"](()=>{
                        x = g,
                            t(9, x)
                    }
                )
            }
            let Pn = ()=>{
                    t(6, R = ""),
                        F.blur()
                }
            ;
            function qn(g) {
                Ie = g,
                    t(7, Ie)
            }
            return n.$$set = g=>{
                "base_path"in g && t(23, r = g.base_path),
                "reset_styles"in g && t(0, i = g.reset_styles),
                "show_images"in g && t(1, o = g.show_images),
                "show_sub_results"in g && t(2, a = g.show_sub_results),
                "excerpt_length"in g && t(22, h = g.excerpt_length),
                "process_result"in g && t(3, _ = g.process_result),
                "process_term"in g && t(24, f = g.process_term),
                "show_empty_filters"in g && t(4, c = g.show_empty_filters),
                "debounce_timeout_ms"in g && t(25, E = g.debounce_timeout_ms),
                "pagefind_options"in g && t(26, u = g.pagefind_options),
                "merge_index"in g && t(27, m = g.merge_index),
                "trigger_search_term"in g && t(21, d = g.trigger_search_term),
                "translations"in g && t(5, T = g.translations)
            }
                ,
                n.$$.update = ()=>{
                    if (n.$$.dirty[0] & 2097152)
                        e: d && (t(6, R = d),
                            t(21, d = ""));
                    if (n.$$.dirty[0] & 192)
                        e: Nn(R, Ie)
                }
                ,
                [i, o, a, _, c, T, R, Ie, F, x, M, L, U, Y, Ft, Je, ue, Nt, Mn, Ot, Dn, d, h, r, f, E, u, m, zn, Un, In, Ln, Pn, qn]
        }
        var wt = class extends q {
            constructor(e) {
                super(),
                    J(this, e, Hr, Mr, V, {
                        base_path: 23,
                        reset_styles: 0,
                        show_images: 1,
                        show_sub_results: 2,
                        excerpt_length: 22,
                        process_result: 3,
                        process_term: 24,
                        show_empty_filters: 4,
                        debounce_timeout_ms: 25,
                        pagefind_options: 26,
                        merge_index: 27,
                        trigger_search_term: 21,
                        translations: 5
                    }, null, [-1, -1])
            }
        }
            , An = wt;
        var At;
        try {
            At = new URL(document.currentScript.src).pathname.match(/^(.*\/)(?:pagefind-)?ui.js.*$/)[1]
        } catch {
            At = "/pagefind/"
        }
        var We = class {
                constructor(e) {
                    this._pfs = null;
                    let t = e.element ?? "[data-pagefind-ui]"
                        , l = e.bundlePath ?? At
                        , s = e.resetStyles ?? !0
                        , r = e.showImages ?? !0
                        , i = e.showSubResults ?? !1
                        , o = e.excerptLength ?? 0
                        , a = e.processResult ?? null
                        , h = e.processTerm ?? null
                        , _ = e.showEmptyFilters ?? !0
                        , f = e.debounceTimeoutMs ?? 300
                        , c = e.mergeIndex ?? []
                        , E = e.translations ?? [];
                    delete e.element,
                        delete e.bundlePath,
                        delete e.resetStyles,
                        delete e.showImages,
                        delete e.showSubResults,
                        delete e.excerptLength,
                        delete e.processResult,
                        delete e.processTerm,
                        delete e.showEmptyFilters,
                        delete e.debounceTimeoutMs,
                        delete e.mergeIndex,
                        delete e.translations;
                    let u = t instanceof HTMLElement ? t : document.querySelector(t);
                    u ? this._pfs = new An({
                        target: u,
                        props: {
                            base_path: l,
                            reset_styles: s,
                            show_images: r,
                            show_sub_results: i,
                            excerpt_length: o,
                            process_result: a,
                            process_term: h,
                            show_empty_filters: _,
                            debounce_timeout_ms: f,
                            merge_index: c,
                            translations: E,
                            pagefind_options: e
                        }
                    }) : console.error(`Pagefind UI couldn't find the selector ${t}`)
                }
                triggerSearch(e) {
                    this._pfs.$$set({
                        trigger_search_term: e
                    })
                }
            }
        ;
        window.PagefindUI = We;
    }
)();

// STREETLAB — shared product data + screen components

const PRODUCTS = [
  { id:1, brand:"NUDGE",      name:"오버사이즈 후드 집업 (블랙)",        price:89000,  orig:129000, disc:31, sw:1, rating:4.7, likes:"2.4k", tag:"BEST" },
  { id:2, brand:"VOID OFFICE",name:"카고 와이드 데님 워싱",                price:79000,  orig:98000,  disc:19, sw:2, rating:4.6, likes:"1.8k" },
  { id:3, brand:"GRIDWORK",   name:"러프넥 헤비웨이트 티셔츠",            price:42000,  orig:55000,  disc:24, sw:3, rating:4.8, likes:"3.1k", tag:"NEW" },
  { id:4, brand:"PRESSED",    name:"플리스 짚업 자켓 그레이",              price:128000, orig:158000, disc:19, sw:6, rating:4.5, likes:"890" },
  { id:5, brand:"NUDGE",      name:"파라슈트 카고 팬츠 카키",              price:98000,  orig:128000, disc:23, sw:7, rating:4.6, likes:"1.2k" },
  { id:6, brand:"COLLAPSE",   name:"바라클라바 니트 비니 차콜",            price:38000,  orig:48000,  disc:21, sw:5, rating:4.4, likes:"640" },
  { id:7, brand:"DRY DEPT",   name:"워크웨어 셔츠 자켓 베이지",            price:118000, orig:148000, disc:20, sw:6, rating:4.7, likes:"1.5k" },
  { id:8, brand:"VOID OFFICE",name:"테크니컬 쉘 베스트",                    price:148000, orig:198000, disc:25, sw:8, rating:4.5, likes:"720", tag:"NEW" },
  { id:9, brand:"GRIDWORK",   name:"메쉬 캡 블랙",                          price:28000,  orig:38000,  disc:26, sw:5, rating:4.3, likes:"480" },
  { id:10,brand:"PRESSED",    name:"발마칸 롱코트 차콜",                    price:248000, orig:328000, disc:24, sw:5, rating:4.8, likes:"2.0k" },
];

const won = (n) => n.toLocaleString("ko-KR");

/* ─── ICONS ─── */
const Icon = {
  search: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  heart: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-4.5-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 6.5-7 11-7 11z"/></svg>,
  bag: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 7h14l-1.5 13H6.5L5 7zM8 7V5a4 4 0 018 0v2"/></svg>,
  user: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>,
  home: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2v-9z"/></svg>,
  hanger: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 8a2 2 0 110-4 2 2 0 012 2v1l-9 6h14l-9-6"/></svg>,
  feed: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  arrowRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
};

/* ─── SHARED CHROME ─── */
function TopBar({ cart=2 }) {
  return (
    <div className="sl-top">
      <div className="sl-logo">STREET<em>LAB</em></div>
      <div className="sl-top-grow" />
      <button className="sl-top-icon-btn"><Icon.search className="sl-top-icon" /></button>
      <button className="sl-top-icon-btn">
        <Icon.bag className="sl-top-icon" />
        {cart > 0 && <span className="badge">{cart}</span>}
      </button>
    </div>
  );
}

function CatTabs({ active="추천" }) {
  const cats = ["추천","랭킹","세일","스타일","브랜드","NEW"];
  return (
    <div className="sl-cats">
      {cats.map(c => <span key={c} className={`sl-cat ${c===active?"is-active":""}`}>{c}</span>)}
    </div>
  );
}

function TabBar({ active="home" }) {
  return (
    <div className="sl-tab">
      <button className={`sl-tab-btn ${active==="home"?"is-active":""}`}><Icon.home /><span>홈</span></button>
      <button className={`sl-tab-btn ${active==="cat"?"is-active":""}`}><Icon.hanger /><span>카테고리</span></button>
      <button className={`sl-tab-btn ${active==="feed"?"is-active":""}`}><Icon.feed /><span>스타일</span></button>
      <button className={`sl-tab-btn ${active==="like"?"is-active":""}`}><Icon.heart /><span>좋아요</span></button>
      <button className={`sl-tab-btn ${active==="my"?"is-active":""}`}><Icon.user /><span>마이</span></button>
    </div>
  );
}

function ProductCard({ p, big }) {
  return (
    <div className="sl-card">
      <div className={`sl-img sw-${p.sw}`}>
        {p.tag && <span className="sl-img-tag">{p.tag}</span>}
        <button className="sl-img-heart"><Icon.heart style={{ width: 18, height: 18, color: "#fff", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}/></button>
      </div>
      <div className="sl-card-brand">{p.brand}</div>
      <div className="sl-card-name">{p.name}</div>
      <div className="sl-card-price">
        <span className="sl-card-disc">{p.disc}%</span>
        <span className="sl-card-num">{won(p.price)}원</span>
        <span className="sl-card-orig">{won(p.orig)}</span>
      </div>
      <div className="sl-card-meta">
        <span className="sl-card-rating">{p.rating}</span>
        <span>·</span>
        <span className="sl-card-likes">{p.likes}</span>
      </div>
    </div>
  );
}

/* ─── HOME v1: 표준형 (히어로 + 칩 + 랭킹 + 그리드) ─── */
function HomeStandard() {
  return (
    <div className="sl-app">
      <TopBar cart={2} />
      <CatTabs active="추천" />
      <div className="sl-scroll">
        <div className="sl-hero">
          <div className="sl-hero-art" />
          <div className="sl-hero-content">
            <span className="sl-hero-tag">FW '25 NEW DROP</span>
            <h1 className="sl-hero-title">STREET<br/>UNIFORM</h1>
            <div className="sl-hero-sub">9월 신상 187개 입고 · 최대 40%</div>
            <button className="sl-hero-cta">지금 보기 <Icon.arrowRight style={{ width: 14, height: 14 }}/></button>
          </div>
          <div className="sl-hero-dots">
            <span className="is-active" /><span /><span /><span />
          </div>
        </div>

        <div className="sl-chips">
          {["전체","아우터","상의","하의","신발","액세서리","가방","모자"].map((c,i) =>
            <button key={c} className={`sl-chip ${i===0?"is-active":""}`}>{c}</button>
          )}
        </div>

        <div className="sl-sec">
          <div>
            <h3>오늘의 랭킹</h3>
            <div className="sl-sec-sub">실시간 인기 · 5월 2일 14:00</div>
          </div>
          <span className="sl-sec-link">전체 ›</span>
        </div>
        <div className="sl-rank">
          {PRODUCTS.slice(0, 6).map((p, i) => (
            <div className="sl-rank-card" key={p.id}>
              <div className={`sl-rank-img sw-${p.sw}`}>
                <span className={`sl-rank-num ${i<3?"is-top":""}`}>{i+1}</span>
              </div>
              <div className="sl-rank-brand">{p.brand}</div>
              <div className="sl-rank-name">{p.name}</div>
              <div className="sl-rank-price">
                <span className="sl-rank-disc">{p.disc}%</span>
                <span className="sl-rank-price-num">{won(p.price)}원</span>
              </div>
            </div>
          ))}
        </div>

        <div className="sl-sec">
          <div>
            <h3>지금 입을만한 신상</h3>
            <div className="sl-sec-sub">새로 들어온 187개</div>
          </div>
          <span className="sl-sec-link">전체 ›</span>
        </div>
        <div className="sl-grid">
          {PRODUCTS.slice(2, 10).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* ─── HOME v2: 매거진형 (대형 에디토리얼 + 컴팩트) ─── */
function HomeMagazine() {
  return (
    <div className="sl-app">
      <TopBar cart={2} />
      <CatTabs active="추천" />
      <div className="sl-scroll">
        <div className="sl-mag">
          <div className="sl-mag-art" />
          <div className="sl-mag-content">
            <div className="sl-mag-eye">EDITORIAL — VOL. 14</div>
            <h2 className="sl-mag-title">콘크리트<br/>오버 사이즈</h2>
          </div>
          <div className="sl-mag-meta">© 권도윤 · 22 photos</div>
        </div>

        <div className="sl-sec">
          <div>
            <h3>이번 주 픽</h3>
            <div className="sl-sec-sub">에디터가 고른 8개</div>
          </div>
          <span className="sl-sec-link">에디토리얼 ›</span>
        </div>
        <div className="sl-grid">
          {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}
        </div>

        <div style={{ height: 8, background: "#F5F5F5" }} />

        <div className="sl-sec">
          <div>
            <h3>브랜드 스토리</h3>
            <div className="sl-sec-sub">VOID OFFICE · 서울 성수</div>
          </div>
        </div>
        <div className="sl-mag" style={{ aspectRatio: "1/1", marginTop: 8 }}>
          <div className="sl-mag-art" style={{ background: "linear-gradient(135deg, #1a2a3a, #3a5a7a)" }}/>
          <div className="sl-mag-content">
            <div className="sl-mag-eye">SS — VOID OFFICE</div>
            <h2 className="sl-mag-title">수트의<br/>해체</h2>
          </div>
        </div>

        <div className="sl-sec">
          <div>
            <h3>모두의 인기</h3>
          </div>
          <span className="sl-sec-link">전체 ›</span>
        </div>
        <div className="sl-grid">
          {PRODUCTS.slice(4, 10).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* ─── HOME v3: 피드형 ─── */
function HomeFeed() {
  return (
    <div className="sl-app">
      <TopBar cart={2} />
      <CatTabs active="추천" />
      <div className="sl-scroll">
        <FeedCard
          user="@dohyun.k" tag="180cm · 72kg · 스트릿"
          look={1}
          text="후드 위에 셔츠자켓 레이어드. NUDGE 기본템 위에 PRESSED 자켓으로 톤 다운."
          items={[PRODUCTS[0], PRODUCTS[3]]}
          likes="1,284" />
        <FeedCard
          user="@minji.style" tag="172cm · 58kg · 미니멀"
          look={5}
          text="카키 팬츠에 헤비 티 매치. 가을 시즌 좋아요."
          items={[PRODUCTS[2], PRODUCTS[4]]}
          likes="892" />
        <FeedCard
          user="@seoul.uniform" tag="@official"
          look={3}
          text="이번 주 베스트 룩 5선 모음. 자세한건 프로필에서."
          items={[PRODUCTS[7], PRODUCTS[1], PRODUCTS[5]]}
          likes="3,420" />
      </div>
      <TabBar active="home" />
    </div>
  );
}

function FeedCard({ user, tag, look, text, items, likes }) {
  return (
    <article className="sl-look-card">
      <div className="sl-look-head">
        <div className="sl-look-av" />
        <div>
          <div className="sl-look-user">{user}</div>
          <div className="sl-look-tag">{tag}</div>
        </div>
      </div>
      <div className={`sl-look-img sw-${look}`}>
        <span className="sl-look-pin" style={{ top: "30%", left: "40%" }}>1</span>
        <span className="sl-look-pin" style={{ top: "62%", left: "48%" }}>2</span>
      </div>
      <div className="sl-look-actions">
        <Icon.heart style={{ width: 22, height: 22 }}/>
        <Icon.bag style={{ width: 22, height: 22 }}/>
        <span style={{ fontSize: 12, fontWeight: 700 }}>♡ {likes}</span>
        <div className="grow" />
      </div>
      <div className="sl-look-text">
        <strong>{user}</strong>  {text}
      </div>
      <div className="sl-look-products">
        {items.map(p => (
          <div className="sl-look-prod" key={p.id}>
            <div className={`sl-look-prod-img sw-${p.sw}`} />
            <div className="sl-look-prod-meta">
              <div className="sl-look-prod-brand">{p.brand}</div>
              <div className="sl-look-prod-name">{p.name}</div>
              <div className="sl-look-prod-price">{won(p.price)}원</div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

/* ─── STYLE 9-GRID ─── */
function StyleFeed() {
  const swatches = [1,2,3,4,5,6,7,8,9,10,3,7,4,2,8];
  return (
    <div className="sl-app">
      <TopBar cart={2} />
      <div className="sl-style-tabs">
        <span className="sl-style-tab is-active">추천</span>
        <span className="sl-style-tab">팔로잉</span>
        <span className="sl-style-tab">랭킹</span>
        <span className="sl-style-tab">기획전</span>
      </div>
      <div className="sl-scroll">
        <div className="sl-chips">
          {["#스트릿","#오버핏","#테크웨어","#워크웨어","#아메카지","#Y2K"].map((c,i) =>
            <button key={c} className={`sl-chip ${i===0?"is-active":""}`}>{c}</button>
          )}
        </div>
        <div className="sl-style-grid">
          {swatches.map((s, i) => (
            <div className={`sl-style-cell sw-${s}`} key={i}>
              <span className="sl-style-meta">♡ {(Math.random()*9 + 1).toFixed(1)}k</span>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="feed" />
    </div>
  );
}

/* ─── CHECKOUT ─── */
function Checkout() {
  const items = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[4]];
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const ship = 0;
  const couponA = 5000;
  const couponB = 3000;
  const total = subtotal - couponA - couponB + ship;

  return (
    <div className="sl-app">
      <div className="sl-co-head">
        <button className="sl-co-back">‹</button>
        <span className="sl-co-title">주문 / 결제</span>
        <span className="sl-co-step">2 / 3</span>
      </div>

      <div className="sl-scroll">
        <section className="sl-co-block">
          <h4 className="sl-co-h">배송지<button className="sl-co-edit">변경 ›</button></h4>
          <div className="sl-co-addr-name">권도윤 <span className="pill">기본</span></div>
          <div className="sl-co-addr-line">010-2345-6789<br/>서울 성동구 성수일로 56, 102동 1204호 (성수동, 갤러리아 포레)</div>
          <div className="sl-co-addr-msg">
            <span>배송 메모</span>
            <span style={{ color: "var(--ink)" }}>부재 시 경비실 ›</span>
          </div>
        </section>

        <section className="sl-co-block">
          <h4 className="sl-co-h">주문 상품 ({items.length}개)<button className="sl-co-edit">전체 ›</button></h4>
          {items.map(p => (
            <div className="sl-co-item" key={p.id}>
              <div className={`sl-co-item-img sw-${p.sw}`} />
              <div className="sl-co-item-meta">
                <div className="sl-co-item-brand">{p.brand}</div>
                <div className="sl-co-item-name">{p.name}</div>
                <div className="sl-co-item-opts">옵션: BLACK / L · 수량 1</div>
                <div className="sl-co-item-price">{won(p.price)}원</div>
              </div>
            </div>
          ))}
        </section>

        <section className="sl-co-block">
          <h4 className="sl-co-h">쿠폰 / 적립금</h4>
          <div className="sl-co-coupon">
            <span className="grow">쿠폰 사용</span>
            <span className="val">-{won(couponA)}원</span>
            <span className="arr">›</span>
          </div>
          <div className="sl-co-coupon">
            <span className="grow">적립금 사용</span>
            <span className="val">-{won(couponB)}원</span>
            <span className="arr">보유 24,800원 ›</span>
          </div>
        </section>

        <section className="sl-co-block">
          <h4 className="sl-co-h">결제 수단</h4>
          <div className="sl-co-pay-list">
            <div className="sl-co-pay is-active">
              간편결제
              <div className="sl-co-pay-mini">카카오페이 · 등록</div>
            </div>
            <div className="sl-co-pay">신용/체크카드</div>
            <div className="sl-co-pay">계좌이체</div>
            <div className="sl-co-pay">무통장입금</div>
          </div>
        </section>

        <section className="sl-co-summary">
          <div className="sl-co-sum-row"><span>주문 금액</span><span className="v">{won(subtotal)}원</span></div>
          <div className="sl-co-sum-row"><span>배송비</span><span className="v">무료</span></div>
          <div className="sl-co-sum-row"><span>쿠폰 할인</span><span className="v">-{won(couponA)}원</span></div>
          <div className="sl-co-sum-row"><span>적립금</span><span className="v">-{won(couponB)}원</span></div>
          <div className="sl-co-sum-row total"><span>최종 결제</span><span className="v">{won(total)}원</span></div>
        </section>

        <div className="sl-co-agree">
          위 주문 내용을 확인하였으며, 결제 진행에 동의합니다. (필수)<br/>
          개인정보 제3자 제공 · 결제대행 서비스 약관 동의
        </div>
      </div>

      <div className="sl-co-bar">
        <button className="sl-co-cta">
          <span className="price">{won(total)}원 결제하기</span>
          <span className="arr">›</span>
        </button>
      </div>
    </div>
  );
}

/* ─── DESKTOP HOME ─── */
function DesktopHome() {
  return (
    <div className="sl-desktop">
      <div className="sl-d-utility">
        <a>고객센터</a><a>매거진</a><a>스토어</a><a>로그인</a><a>회원가입</a>
      </div>
      <header className="sl-d-header">
        <div className="sl-d-cats">
          <span className="is-active">MEN</span>
          <span>WOMEN</span>
          <span>BRAND</span>
          <span>STYLE</span>
          <span>SALE</span>
        </div>
        <div className="sl-d-logo">STREET<em>LAB</em></div>
        <div className="sl-d-icons">
          <div className="sl-d-search">
            <Icon.search style={{ width: 14, height: 14 }} />
            <span>검색어 입력</span>
          </div>
          <Icon.heart style={{ width: 20, height: 20 }} />
          <Icon.bag style={{ width: 20, height: 20 }} />
        </div>
      </header>

      <div className="sl-d-hero">
        <div className="sl-d-hero-art" />
        <div className="sl-d-hero-content">
          <span className="tag">FW '25 NEW DROP</span>
          <h1>STREET<br/>UNIFORM</h1>
          <p>9월 신상 187개. 헤비웨이트 코튼, 테크니컬 쉘, 워크웨어 셔츠.<br/>일상의 유니폼을 다시 정의합니다.</p>
          <button className="sl-d-hero-cta">지금 보기 <Icon.arrowRight style={{ width: 14, height: 14 }}/></button>
        </div>
      </div>

      <section className="sl-d-section">
        <div className="sl-d-sec-h">
          <div>
            <h2>오늘의 랭킹</h2>
            <div className="sub">REALTIME · 14:00</div>
          </div>
          <span className="link">전체 보기 ›</span>
        </div>
        <div className="sl-d-rank-grid">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <div className="sl-d-rank" key={p.id}>
              <div className={`sl-rank-img sw-${p.sw}`} style={{ aspectRatio: "3/4" }}>
                <span className={`sl-rank-num ${i<3?"is-top":""}`} style={{ fontSize: 32 }}>{i+1}</span>
              </div>
              <div className="sl-rank-brand" style={{ marginTop: 12 }}>{p.brand}</div>
              <div className="sl-rank-name">{p.name}</div>
              <div className="sl-rank-price">
                <span className="sl-rank-disc">{p.disc}%</span>
                <span className="sl-rank-price-num">{won(p.price)}원</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sl-d-section" style={{ background: "#F5F5F5" }}>
        <div className="sl-d-sec-h">
          <div>
            <h2>지금 입을만한 신상</h2>
            <div className="sub">NEW ARRIVAL · 187 ITEMS</div>
          </div>
          <span className="link">전체 보기 ›</span>
        </div>
        <div className="sl-d-grid">
          {PRODUCTS.slice(2, 7).map(p => (
            <div className="sl-d-card" key={p.id}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </section>

      <footer className="sl-d-foot">
        <div className="sl-d-logo" style={{ color: "#fff", textAlign: "left", marginBottom: 16 }}>STREET<em>LAB</em></div>
        <div className="sl-d-foot-row">
          <span>고객센터 1577-0000</span>
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>사업자정보</span>
          <span>© 2025 STREETLAB</span>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { HomeStandard, HomeMagazine, HomeFeed, StyleFeed, Checkout, DesktopHome });

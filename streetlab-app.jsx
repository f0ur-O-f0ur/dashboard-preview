// STREETLAB — design canvas root

const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF2E2E",
  "ink": "#0A0A0A"
}/*EDITMODE-END*/;

function Phone({ children }) {
  return (
    <IOSDevice width={390} height={844}>
      {children}
    </IOSDevice>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const cssVars = { "--red": t.accent, "--ink": t.ink };

  return (
    <div style={{ height: "100vh", ...cssVars }}>
      <DesignCanvas title="STREETLAB" subtitle="스트릿웨어 커머스 — 5 screens">
        <DCSection id="mobile" title="Mobile · iOS">
          <DCArtboard id="home-1" label="홈 v1 — 표준형" width={390} height={844}>
            <Phone><HomeStandard /></Phone>
          </DCArtboard>
          <DCArtboard id="home-2" label="홈 v2 — 매거진형" width={390} height={844}>
            <Phone><HomeMagazine /></Phone>
          </DCArtboard>
          <DCArtboard id="home-3" label="홈 v3 — 피드형" width={390} height={844}>
            <Phone><HomeFeed /></Phone>
          </DCArtboard>
          <DCArtboard id="style" label="스타일 / 룩북" width={390} height={844}>
            <Phone><StyleFeed /></Phone>
          </DCArtboard>
          <DCArtboard id="checkout" label="결제 페이지" width={390} height={844}>
            <Phone><Checkout /></Phone>
          </DCArtboard>
        </DCSection>

        <DCSection id="desktop" title="Desktop · Web">
          <DCArtboard id="d-home" label="데스크톱 홈" width={1440} height={1800}>
            <DesktopHome />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks" defaultPosition={{ right: 24, bottom: 24 }}>
        <TweakSection title="Brand">
          <TweakColor label="Accent (red)" value={t.accent} onChange={(v) => setTweak("accent", v)} />
          <TweakColor label="Ink" value={t.ink} onChange={(v) => setTweak("ink", v)} />
        </TweakSection>
        <TweakSection title="Presets">
          <TweakButton onClick={() => setTweak({ accent: "#FF2E2E", ink: "#0A0A0A" })}>Classic Red</TweakButton>
          <TweakButton onClick={() => setTweak({ accent: "#0A0A0A", ink: "#0A0A0A" })}>Mono</TweakButton>
          <TweakButton onClick={() => setTweak({ accent: "#3A6EFF", ink: "#0A0A0A" })}>Cobalt</TweakButton>
          <TweakButton onClick={() => setTweak({ accent: "#FFD400", ink: "#0A0A0A" })}>Yellow</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

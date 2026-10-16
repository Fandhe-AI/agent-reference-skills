---
name: motion
description: >
  Motion (旧 Framer Motion) リファレンス。motion/react, vanilla JS, Vue 版 motion-v。
  AnimatePresence, AnimateView, LayoutGroup, LazyMotion, MotionConfig, Reorder,
  useAnimate, useScroll, useSpring, useTransform, useMotionValue, useInView。
  animate, animateView, scroll, inView, hover, press, stagger, spring, timeline,
  styleEffect, threeEffect。Motion+ Carousel, Cursor, Ticker, Typewriter, AnimateNumber。
  layout, drag, gestures, SVG, Tailwind, Lenis 連携。
user-invocable: false
---

# motion

対象バージョン: motion 14.3.0 / motion-v 2.8.0（docs は 2026-10-17 に motion.dev の `.md` twin から取得）。

Motion (旧 Framer Motion) のリファレンススキル。React 向け (`motion/react`) と vanilla JS (`motion`) の両 API、アニメーション概念、ガイドを収録する。

## ディレクトリ構成

```text
skills/motion/
  SKILL.md
  references/
    react-components/
      README.md
      motion.md
      animate-presence.md
      animate-view.md
      animate-activity.md
      layout-group.md
      lazy-motion.md
      motion-config.md
      reorder.md
      animate-number.md
      carousel.md
      cursor.md
      gallery.md
      scramble-text.md
      ticker.md
      typewriter.md
    react-hooks/
      README.md
      use-animate.md
      use-scroll.md
      use-spring.md
      use-transform.md
      use-motion-value.md
      use-in-view.md
      use-drag-controls.md
      use-reduced-motion.md
      use-motion-template.md
      use-velocity.md
      use-motion-value-event.md
      use-animation-frame.md
      use-time.md
      use-page-in-view.md
      use-curtains.md
    animation/
      README.md
      overview.md
      transitions.md
      layout.md
      scroll.md
      gestures.md
      hover.md
      drag.md
      svg.md
      text-animation.md
    vanilla-js/
      README.md
      quick-start.md
      animate.md
      animate-view.md
      animate-layout.md
      arc.md
      tween.md
      easing-functions.md
      css.md
      scroll.md
      in-view.md
      hover.md
      press.md
      stagger.md
      spring.md
      timeline.md
      motion-value.md
      spring-value.md
      transform-value.md
      map-value.md
      style-effect.md
      attr-effect.md
      svg-effect.md
      prop-effect.md
      three.md
      vgpu.md
      svg-animation.md
      frame.md
      delay.md
      resize.md
      resolve-elements.md
      transform.md
      mix.md
      progress.md
      clamp.md
      wrap.md
      distance.md
      pipe.md
      curtains.md
      scramble-text.md
      split-text.md
      typewriter.md
    vue/
      README.md
      overview.md
      get-started.md
      animate-view.md
      motion.md
      directive.md
      animate-presence.md
      animate-number.md
      carousel.md
      cursor.md
      radix.md
      layout-animations.md
      layout-group.md
      lazy-motion.md
      motion-config.md
      motion-value.md
      reorder.md
      scroll-animations.md
      ticker.md
      transitions.md
      typewriter.md
      gestures.md
      use-animate.md
      use-animation-frame.md
      use-drag-controls.md
      use-in-view.md
      use-motion-template.md
      use-motion-value-event.md
      use-reduced-motion.md
      use-scroll.md
      use-spring.md
      use-time.md
      use-transform.md
      use-velocity.md
    guides/
      README.md
      installation.md
      motion-ui-installation.md
      accessibility.md
      performance.md
      reduce-bundle-size.md
      3d-transforms.md
      troubleshooting.md
      upgrade-guide.md
      migrate-from-gsap.md
      tailwind.md
      radix.md
      base-ui.md
      lenis.md
      svelte.md
      framer.md
      figma.md
      webflow.md
      wordpress.md
      squarespace.md
  samples/
    README.md
    basic-animation.md
    scroll-animation.md
    gesture-animation.md
    layout-animation.md
    animate-presence.md
  scripts/
    README.md
    install.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/<category>/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

カテゴリの使い分け:

- React で `<motion.div>` やフックを使う → `react-components/` `react-hooks/`
- React に依存しない素の JS で animate / scroll などを使う → `vanilla-js/`
- transition / layout / drag / gesture / SVG / scroll の概念や prop の挙動を知る → `animation/`
- Vue (`motion-v`) で `<motion>` コンポーネント / `v-motion` ディレクティブ / composable を使う → `vue/`
- インストール / アクセシビリティ / パフォーマンス / バンドル削減 / troubleshooting / 移行 / Motion UI install / Tailwind・Radix・Base UI・Lenis・Svelte・Framer・Webflow・WordPress・Squarespace・Figma 連携 → `guides/`
- Motion+ は有料で `motion-plus` / `motion-plus-vue` パッケージになる（Carousel / Cursor / Ticker / Typewriter / AnimateNumber / ScrambleText / Gallery / splitText / useCurtains 等）。React は `react-components/` `react-hooks/`、Vue は `vue/`、vanilla は `vanilla-js/` に収録

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| `<motion.div>` で要素をアニメーションさせたい | react-components | [references/react-components/README.md](references/react-components/README.md) |
| マウント / アンマウント時の exit アニメーション (AnimatePresence) | react-components | [references/react-components/README.md](references/react-components/README.md) |
| LayoutGroup / LazyMotion / MotionConfig / Reorder / AnimateView を使いたい | react-components | [references/react-components/README.md](references/react-components/README.md) |
| useAnimate / useScroll / useSpring / useTransform などフックを使いたい | react-hooks | [references/react-hooks/README.md](references/react-hooks/README.md) |
| React の Motion+ コンポーネント (Carousel, Cursor, Ticker, Typewriter, AnimateNumber, ScrambleText, Gallery) | react-components | [references/react-components/README.md](references/react-components/README.md) |
| View Transitions (AnimateView / animateView)・AnimateActivity | react-components / vanilla-js / vue | [references/react-components/README.md](references/react-components/README.md) / [references/vanilla-js/README.md](references/vanilla-js/README.md) / [references/vue/README.md](references/vue/README.md) |
| useCurtains | react-hooks | [references/react-hooks/README.md](references/react-hooks/README.md) |
| 再レンダー無しで値を更新する motion value (useMotionValue) | react-hooks | [references/react-hooks/README.md](references/react-hooks/README.md) |
| ビューポート進入検知 (useInView) / Reduced Motion 検知 | react-hooks | [references/react-hooks/README.md](references/react-hooks/README.md) |
| transition (tween/spring/inertia/stagger) の指定方法 | animation | [references/animation/README.md](references/animation/README.md) |
| layout / layoutId による位置・サイズ・共有要素アニメーション | animation | [references/animation/README.md](references/animation/README.md) |
| スクロール連動 / hover・tap などジェスチャー / drag / SVG パス | animation | [references/animation/README.md](references/animation/README.md) |
| React 非依存の素の JS で animate / scroll / inView を使いたい | vanilla-js | [references/vanilla-js/README.md](references/vanilla-js/README.md) |
| hover / press / stagger / spring / timeline / motionValue (vanilla) | vanilla-js | [references/vanilla-js/README.md](references/vanilla-js/README.md) |
| vanilla のレイアウトアニメーション (animateLayout)・arc・tween / easing / CSS 変数 | vanilla-js | [references/vanilla-js/README.md](references/vanilla-js/README.md) |
| 値ユーティリティ (mix, transform, clamp, wrap, progress, frame 等) と effect 系 (styleEffect / attrEffect / svgEffect / propEffect) | vanilla-js | [references/vanilla-js/README.md](references/vanilla-js/README.md) |
| Three.js・vgpu 連携、splitText / scrambleText / typewriter (vanilla) | vanilla-js | [references/vanilla-js/README.md](references/vanilla-js/README.md) |
| Vue で `<motion>` / `v-motion` ディレクティブ / composable を使いたい | vue | [references/vue/README.md](references/vue/README.md) |
| Vue で Motion+ 限定コンポーネント (Carousel, Cursor, Ticker, Typewriter, AnimateNumber) を使いたい | vue | [references/vue/README.md](references/vue/README.md) |
| インストール・アクセシビリティ・パフォーマンス・バンドル削減・トラブルシューティング | guides | [references/guides/README.md](references/guides/README.md) |
| Framer Motion / GSAP からの移行・アップグレード | guides | [references/guides/README.md](references/guides/README.md) |
| Motion UI (Motion+) の install、Tailwind / Radix / Base UI / Lenis / Svelte 連携 | guides | [references/guides/README.md](references/guides/README.md) |
| Framer / Webflow / WordPress / Squarespace / Figma での利用 | guides | [references/guides/README.md](references/guides/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・import 方法を知りたい | scripts | [scripts/README.md](scripts/README.md) |

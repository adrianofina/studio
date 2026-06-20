import { useState } from 'react';
import { AuroraText } from '../components/ui/AuroraText';

// New components
import GlassSurface from '../components/ui/GlassSurface';
import StaggeredMenu from '../components/ui/StaggeredMenu';
import SpotlightCard from '../components/ui/SpotlightCard';
import BorderGlow from '../components/ui/BorderGlow';
import InfiniteMenu from '../components/ui/InfiniteMenu';
import Stepper, { Step } from '../components/ui/Stepper';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';

// Existing components
import { SungJinwooShadow } from '../components/ui/SungJinwooShadow';
import { MercuryWobbleRing } from '../components/ui/MercuryWobbleRing';
import { CradleBlade } from '../components/ui/CradleBlade';
import { LordOfTheRings } from '../components/ui/LordOfTheRings';
import { SparklineBars } from '../components/ui/SparklineBars';
import { StatusSpine } from '../components/ui/StatusSpine';
import { TheStack } from '../components/ui/TheStack';
import Dock from '../components/ui/Dock';

// Menu items for StaggeredMenu
const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'Archive', link: '/archive' },
  { label: 'Diary', link: '/diary' },
  { label: 'Settings', link: '/settings' },
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

// Dock items
const dockItems = [
  { icon: <span className="text-lg">🏠</span>, label: 'Home', onClick: () => alert('Home clicked!') },
  { icon: <span className="text-lg">📦</span>, label: 'Archive', onClick: () => alert('Archive clicked!') },
  { icon: <span className="text-lg">👤</span>, label: 'Profile', onClick: () => alert('Profile clicked!') },
  { icon: <span className="text-lg">⚙️</span>, label: 'Settings', onClick: () => alert('Settings clicked!') },
];

// Infinite menu items
const infiniteItems = [
  { image: 'https://picsum.photos/300/300?grayscale', link: '#', title: 'Item 1', description: 'This is pretty cool' },
  { image: 'https://picsum.photos/400/400?grayscale', link: '#', title: 'Item 2', description: 'This is pretty cool' },
  { image: 'https://picsum.photos/500/500?grayscale', link: '#', title: 'Item 3', description: 'This is pretty cool' },
  { image: 'https://picsum.photos/600/600?grayscale', link: '#', title: 'Item 4', description: 'This is pretty cool' },
  { image: 'https://picsum.photos/700/700?grayscale', link: '#', title: 'Item 5', description: 'This is pretty cool' },
];

export default function TestPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full h-full overflow-y-auto p-8 space-y-12 bg-[#0D0B0D]">
      <div className="sticky top-0 bg-[#0D0B0D]/80 backdrop-blur-sm z-10 py-4 -mt-8 px-8 -mx-8 mb-4 border-b border-white/5">
        <h1 className="text-3xl font-bold">
          <AuroraText>🧪 Component Test Lab</AuroraText>
        </h1>
        <p className="text-zinc-400 text-sm -mt-2">All components — new and existing</p>
      </div>

      {/* ─── NEW COMPONENTS ─── */}
      <div className="border-t border-white/5 pt-8">
        <h2 className="text-sm font-mono text-violet-400 mb-6 uppercase tracking-wider">✦ New Components</h2>
        <div className="grid gap-8">

          {/* GlassSurface */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">GlassSurface (with tear drop)</h3>
            <GlassSurface width={400} height={200} borderRadius={24} tearDrop={0.6} tearDropColor="rgba(176,0,255,0.15)">
              <div className="text-center text-white">
                <p className="text-xl font-bold">Glass Surface</p>
                <p className="text-sm text-zinc-400">Move mouse for tear drop effect</p>
              </div>
            </GlassSurface>
          </div>

          {/* StaggeredMenu */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">StaggeredMenu</h3>
            <div className="relative h-64 bg-zinc-900/30 rounded-xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="absolute top-4 right-4 z-50 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-700 transition-colors"
              >
                {showMenu ? 'Close Menu' : 'Open Menu'}
              </button>
              {showMenu && (
                <div className="absolute top-0 right-0 w-80 h-full bg-[#1A0F1A] border-l border-white/5 p-8 z-40">
                  <ul className="space-y-4 mt-12">
                    {menuItems.map((item, i) => (
                      <li key={i}>
                        <a href={item.link} className="text-2xl font-bold text-white hover:text-violet-400 transition-colors">
                          {item.label}
                          <span className="text-sm text-violet-400 ml-3 opacity-60">{String(i + 1).padStart(2, '0')}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-8 left-8">
                    <p className="text-violet-400 text-sm font-medium">Socials</p>
                    <div className="flex gap-4 mt-2">
                      {socialItems.map((s, i) => (
                        <a key={i} href={s.link} className="text-white/60 hover:text-white transition-colors">{s.label}</a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SpotlightCard */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">SpotlightCard</h3>
            <SpotlightCard spotlightColor="rgba(176,0,255,0.15)">
              <div className="text-center text-white p-4">
                <p className="text-xl font-bold">Spotlight Card</p>
                <p className="text-sm text-zinc-400">Move mouse to see spotlight</p>
              </div>
            </SpotlightCard>
          </div>

          {/* BorderGlow */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">BorderGlow</h3>
            <BorderGlow edgeSensitivity={30} glowColor="40 80 80" glowIntensity={1.2} colors={['#c084fc', '#f472b6', '#38bdf8']}>
              <div className="text-center text-white p-6">
                <p className="text-xl font-bold">Border Glow</p>
                <p className="text-sm text-zinc-400">Hover near edges</p>
              </div>
            </BorderGlow>
          </div>

          {/* InfiniteMenu */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">InfiniteMenu</h3>
            <div className="h-64 bg-zinc-900/30 rounded-xl border border-white/5 overflow-hidden">
              <InfiniteMenu items={infiniteItems} scale={0.8} />
            </div>
          </div>

          {/* Stepper */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Stepper</h3>
            <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
              <Stepper
                initialStep={1}
                backButtonText="Back"
                nextButtonText="Next"
                onStepChange={(step) => console.log('Step:', step)}
                onFinalStepCompleted={() => console.log('Complete!')}
              >
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Step 1</h3><p className="text-zinc-400">Welcome to the stepper!</p></div></Step>
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Step 2</h3><p className="text-zinc-400">Custom step content here.</p></div></Step>
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Step 3</h3><p className="text-zinc-400">Almost there!</p></div></Step>
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Final Step</h3><p className="text-zinc-400">You made it!</p></div></Step>
              </Stepper>
            </div>
          </div>

          {/* ScrollStack */}
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">ScrollStack</h3>
            <div className="h-80 bg-zinc-900/30 rounded-xl border border-white/5 overflow-hidden">
              <ScrollStack itemDistance={80} itemScale={0.03} blurAmount={2}>
                <ScrollStackItem>
                  <div className="p-6"><h3 className="text-xl font-bold text-white">Card 1</h3><p className="text-zinc-400">Scroll to stack</p></div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="p-6"><h3 className="text-xl font-bold text-white">Card 2</h3><p className="text-zinc-400">This card stacks on top</p></div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="p-6"><h3 className="text-xl font-bold text-white">Card 3</h3><p className="text-zinc-400">The stacking effect grows</p></div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="p-6"><h3 className="text-xl font-bold text-white">Card 4</h3><p className="text-zinc-400">Keep scrolling!</p></div>
                </ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </div>
      </div>

      {/* ─── EXISTING COMPONENTS ─── */}
      <div className="border-t border-white/5 pt-8">
        <h2 className="text-sm font-mono text-emerald-400 mb-6 uppercase tracking-wider">◈ Existing Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {/* Sung Jinwoo's Shadow */}
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Sung Jinwoo's Shadow</h3>
            <SungJinwooShadow progress={75} status="active" thickness={4} blur={3}>
              <div className="p-2">
                <p className="text-sm text-white">Progress: 75%</p>
                <p className="text-xs text-zinc-400">Hover to see glow</p>
              </div>
            </SungJinwooShadow>
          </div>

          {/* Mercury Wobble Ring */}
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex flex-col items-center">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Mercury Wobble Ring</h3>
            <MercuryWobbleRing progress={75} size={100} strokeWidth={8} status="active" />
            <p className="text-xs text-zinc-500 mt-2">Hover to wobble</p>
          </div>

          {/* Cradle Blade */}
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Cradle Blade</h3>
            <CradleBlade score={72} minScore={0} maxScore={100} showLabels={true} />
          </div>

          {/* Lord of the Rings */}
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex flex-col items-center">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Lord of the Rings</h3>
            <LordOfTheRings
              segments={[
                { label: 'Normal', value: 60, color: '#6366F1' },
                { label: 'Hazina', value: 40, color: '#10B981' }
              ]}
              size={120}
              strokeWidth={8}
              centerText="Split"
            />
          </div>

          {/* Sparkline Bars */}
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex flex-col items-center">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Sparkline Bars</h3>
            <SparklineBars data={[23, 45, 67, 89, 65, 78, 90]} color="#6366F1" height={48} />
          </div>

          {/* Status Spine */}
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex items-center gap-4">
            <h3 className="text-xs font-mono text-zinc-500">Status Spine</h3>
            <div className="flex gap-4 items-center h-12">
              <StatusSpine status="active" height="full" />
              <StatusSpine status="overdue" height="full" />
              <StatusSpine status="pending" height="full" />
              <StatusSpine status="completed" height="full" />
              <StatusSpine status="inactive" height="full" />
            </div>
          </div>

          {/* The Stack */}
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 col-span-full">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">The Stack</h3>
            <TheStack
              items={[
                { id: "1", title: "Item One", subtitle: "2026" },
                { id: "2", title: "Item Two", subtitle: "2025" },
                { id: "3", title: "Item Three", subtitle: "2024" },
                { id: "4", title: "Item Four", subtitle: "2023" },
                { id: "5", title: "Item Five", subtitle: "2022" },
              ]}
              overlap={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

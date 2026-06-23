import { AuroraText } from '../components/ui/AuroraText';
import GlassSurface from '../components/ui/GlassSurface';
import SpotlightCard from '../components/ui/SpotlightCard';
import BorderGlow from '../components/ui/BorderGlow';
import Stepper, { Step } from '../components/ui/Stepper';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';
import { SungJinwooShadow } from '../components/ui/SungJinwooShadow';
import { MercuryWobbleRing } from '../components/ui/MercuryWobbleRing';
import { CradleBlade } from '../components/ui/CradleBlade';
import { LordOfTheRings } from '../components/ui/LordOfTheRings';
import { SparklineBars } from '../components/ui/SparklineBars';
import { StatusSpine } from '../components/ui/StatusSpine';
import { TheStack } from '../components/ui/TheStack';

export default function TestPage() {
  return (
    <div className="w-full h-full overflow-y-auto p-8 space-y-12 bg-[#0D0B0D]">
      <div className="sticky top-0 bg-[#0D0B0D]/80 backdrop-blur-sm z-10 py-4 -mt-8 px-8 -mx-8 mb-4 border-b border-white/5">
        <h1 className="text-3xl font-bold"><AuroraText>🧪 Component Test Lab</AuroraText></h1>
        <p className="text-zinc-400 text-sm -mt-2">All components in one place</p>
      </div>

      <div className="border-t border-white/5 pt-8">
        <h2 className="text-sm font-mono text-violet-400 mb-6 uppercase tracking-wider">✦ New Components</h2>
        <div className="grid gap-8">
          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">GlassSurface (tear drop)</h3>
            <GlassSurface width={400} height={180} borderRadius={24} tearDrop={0.5}>
              <div className="text-center text-white"><p className="text-xl font-bold">Glass Surface</p><p className="text-sm text-zinc-400">Move mouse for tear drop</p></div>
            </GlassSurface>
          </div>

          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">SpotlightCard</h3>
            <SpotlightCard spotlightColor="rgba(176,0,255,0.15)">
              <div className="text-center text-white p-4"><p className="text-xl font-bold">Spotlight Card</p><p className="text-sm text-zinc-400">Move mouse to see spotlight</p></div>
            </SpotlightCard>
          </div>

          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">BorderGlow</h3>
            <BorderGlow edgeSensitivity={30} glowColor="40 80 80" glowIntensity={1.2}>
              <div className="text-center text-white p-6"><p className="text-xl font-bold">Border Glow</p><p className="text-sm text-zinc-400">Hover near edges</p></div>
            </BorderGlow>
          </div>

          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Stepper</h3>
            <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
              <Stepper initialStep={1} backButtonText="Back" nextButtonText="Next">
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Step 1</h3><p className="text-zinc-400">Welcome!</p></div></Step>
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Step 2</h3><p className="text-zinc-400">Custom content</p></div></Step>
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Step 3</h3><p className="text-zinc-400">Almost there!</p></div></Step>
                <Step><div className="p-4"><h3 className="text-xl font-bold text-white">Final</h3><p className="text-zinc-400">You made it!</p></div></Step>
              </Stepper>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-zinc-500 mb-3">ScrollStack</h3>
            <div className="h-80 bg-zinc-900/30 rounded-xl border border-white/5 overflow-hidden">
              <ScrollStack itemDistance={80} itemScale={0.03}>
                <ScrollStackItem><div className="p-6"><h3 className="text-xl font-bold text-white">Card 1</h3><p className="text-zinc-400">Scroll to stack</p></div></ScrollStackItem>
                <ScrollStackItem><div className="p-6"><h3 className="text-xl font-bold text-white">Card 2</h3><p className="text-zinc-400">Stacking</p></div></ScrollStackItem>
                <ScrollStackItem><div className="p-6"><h3 className="text-xl font-bold text-white">Card 3</h3><p className="text-zinc-400">Stacking grows</p></div></ScrollStackItem>
                <ScrollStackItem><div className="p-6"><h3 className="text-xl font-bold text-white">Card 4</h3><p className="text-zinc-400">Keep scrolling!</p></div></ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8">
        <h2 className="text-sm font-mono text-emerald-400 mb-6 uppercase tracking-wider">◈ Existing Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Sung Jinwoo's Shadow</h3>
            <SungJinwooShadow progress={75} status="active" thickness={4} blur={3}>
              <div className="p-2"><p className="text-sm text-white">Progress: 75%</p><p className="text-xs text-zinc-400">Hover for glow</p></div>
            </SungJinwooShadow>
          </div>
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex flex-col items-center">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Mercury Wobble Ring</h3>
            <MercuryWobbleRing progress={75} size={100} strokeWidth={8} status="active" />
            <p className="text-xs text-zinc-500 mt-2">Hover to wobble</p>
          </div>
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Cradle Blade</h3>
            <CradleBlade score={72} minScore={0} maxScore={100} showLabels={true} />
          </div>
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex flex-col items-center">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Lord of the Rings</h3>
            <LordOfTheRings
              segments={[
                { label: 'Normal', value: 60, color: '#6366F1', pct: 60 },
                { label: 'Hazina', value: 40, color: '#10B981', pct: 40 }
              ]}
              size={120}
              strokeWidth={8}
              centerText="Split"
            />
          </div>
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex flex-col items-center">
            <h3 className="text-xs font-mono text-zinc-500 mb-3">Sparkline Bars</h3>
            <SparklineBars data={[23, 45, 67, 89, 65, 78, 90]} color="#6366F1" />
          </div>
          <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4 flex items-center gap-4">
            <h3 className="text-xs font-mono text-zinc-500">Status Spine</h3>
            <div className="flex gap-4 items-center h-12">
              <StatusSpine status="active" />
              <StatusSpine status="overdue" />
              <StatusSpine status="pending" />
              <StatusSpine status="completed" />
              <StatusSpine status="inactive" />
            </div>
          </div>
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

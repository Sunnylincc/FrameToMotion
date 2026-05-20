import { useMemo, useState } from 'react';

const styles = ['Funny', 'Hyper Realistic', 'Sci-Fi', 'Cinematic', 'Horror', 'Adventure', 'YouTube Shorts', 'TikTok Viral'];

const styleDirection = {
  Funny: 'Playful timing, exaggerated micro-reactions, and surprising visual punchlines while preserving coherent realism.',
  'Hyper Realistic': 'Ultra-detailed surfaces, true-to-life physics, subtle emotion beats, and photoreal cinematic continuity.',
  'Sci-Fi': 'Futuristic production design, advanced tech motifs, high contrast atmosphere, and epic world-building movement.',
  Cinematic: 'Feature-film composition, dramatic pacing, emotional rise, and premium production language.',
  Horror: 'Tension-first progression, uneasy negative space, eerie anticipation, and unsettling reveal rhythm.',
  Adventure: 'Bold momentum, environmental scale shifts, discovery moments, and triumphant emotional payoff.',
  'YouTube Shorts': 'Fast hook, visual escalation every beat, and satisfying loop-friendly final frame.',
  'TikTok Viral': 'Instant attention grab, trend-aware rhythm, kinetic camera play, and replay-driving final twist.',
};

const pick = (arr, idx) => arr[idx % arr.length];

function buildPrompt(style, imageName) {
  const seed = imageName.length + style.length;
  const settings = ['rain-washed neon alley', 'windswept desert cliff at golden hour', 'abandoned theater with floating dust', 'foggy mountain pass before sunrise', 'moonlit rooftop above a cyberpunk skyline'];
  const motions = ['takes one decisive step forward as fabric and hair react to wind', 'turns toward an off-screen sound with controlled urgency', 'breaks into a precise run, then slows into a dramatic pause', 'reaches toward the light source as particles orbit around them', 'locks eyes with camera before pivoting into the unknown'];
  const cameras = ['slow dolly-in with 35mm lens and shallow depth of field', 'low-angle tracking shot, then subtle crane rise', 'orbital camera move that transitions into over-the-shoulder framing', 'handheld-intent simulation with stable cinematic smoothing', 'start wide, push to medium close-up for emotional impact'];
  const lighting = ['volumetric rim light with practical highlights and soft bounce fill', 'high-contrast chiaroscuro with selective neon reflections', 'golden-hour key light, gentle haze, and cinematic bloom', 'cold moonlight with motivated edge lights and textured shadows', 'dramatic backlight with atmospheric particles and controlled specular rolloff'];
  const hooks = ['final frame freezes on a reveal that implies a bigger story universe', 'last second introduces an unexpected object that reframes the entire scene', 'closing beat loops seamlessly back to the opening composition', 'ending lands on a visual cliffhanger just before impact', 'final glance directly to camera creates a strong replay trigger'];

  const scene = `A ${style.toLowerCase()} cinematic sequence inspired by "${imageName}" in a ${pick(settings, seed)}. ${styleDirection[style]}`;

  const characterMotion = `Primary subject ${pick(motions, seed + 2)}, with physically believable inertia and cloth dynamics.`;
  const cameraMotion = `${pick(cameras, seed + 4)}, maintaining smooth parallax and deliberate framing hierarchy.`;
  const lightingText = `${pick(lighting, seed + 6)} to emphasize depth, texture, and subject separation.`;
  const endingHook = `${pick(hooks, seed + 8)}.`;

  const fullPrompt = `Generate a 7-10 second cinematic video. ${scene} Character motion: ${characterMotion} Camera motion: ${cameraMotion} Lighting: ${lightingText} Ending hook: ${endingHook} Keep motion natural, avoid artifacts, preserve identity consistency, and output in high detail suitable for Veo, Kling, Seedance, Runway, and Sora.`;

  return { scene, characterMotion, cameraMotion, lightingText, endingHook, fullPrompt };
}

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    if (!imageFile) return null;
    return buildPrompt(selectedStyle, imageFile.name.replace(/\.[^.]+$/, ''));
  }, [selectedStyle, imageFile]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const copyPrompt = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <p className="mb-3 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">Fully Static • No API • GitHub Pages Ready</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">FrameToMotion</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">Upload one image, choose a style, and instantly generate cinematic AI video prompts tailored for Veo, Kling, Seedance, Runway, and Sora.</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card animate-fadeInUp p-5 sm:p-6">
          <h2 className="text-lg font-semibold">1) Upload Image</h2>
          <label className="mt-4 block cursor-pointer rounded-xl border border-dashed border-slate-500 p-6 text-center transition hover:border-cyan-300 hover:bg-slate-800/60">
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
            <span className="text-sm text-slate-300">Tap to select an image</span>
          </label>
          {imageUrl && <img src={imageUrl} alt="Uploaded preview" className="mt-4 h-56 w-full rounded-xl object-cover" />}

          <h2 className="mt-6 text-lg font-semibold">2) Select Style</h2>
          <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)} className="mt-3 w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm outline-none ring-cyan-300 transition focus:ring-2">
            {styles.map((style) => <option key={style}>{style}</option>)}
          </select>
        </div>

        <div className="card animate-fadeInUp p-5 [animation-delay:120ms] sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">3) Prompt Output</h2>
            <button onClick={copyPrompt} disabled={!prompt} className="rounded-lg border border-cyan-400/50 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-200 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40">{copied ? 'Copied!' : 'Copy Full Prompt'}</button>
          </div>

          {!prompt ? (
            <p className="mt-6 text-sm text-slate-400">Upload an image to generate your cinematic prompt pack.</p>
          ) : (
            <div className="mt-5 space-y-4 text-sm">
              <PromptBlock title="Scene Description" text={prompt.scene} />
              <PromptBlock title="Character Motion" text={prompt.characterMotion} />
              <PromptBlock title="Camera Motion" text={prompt.cameraMotion} />
              <PromptBlock title="Lighting" text={prompt.lightingText} />
              <PromptBlock title="Ending Hook" text={prompt.endingHook} />
              <PromptBlock title="Full Video Prompt" text={prompt.fullPrompt} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function PromptBlock({ title, text }) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-800/60 p-3">
      <h3 className="text-xs uppercase tracking-wide text-slate-400">{title}</h3>
      <p className="mt-1 text-slate-100">{text}</p>
    </article>
  );
}

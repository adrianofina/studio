import type { ProjectEntry } from "../types"

export const PROJECTS: ProjectEntry[] = [
  {
    id: "KakaFlix", status: "completed", progress: 100, date: "Completed Jan 15",
    tech: ["React", "TypeScript", "Tailwind"],
    desc: "Movie matchmaker app with personalised recommendations and a cinematic hero.",
    lessons: "Shaders are worth the WebGL effort. Build the component library before the product.",
  },
  {
    id: "Portfolio v1", status: "completed", progress: 100, date: "Completed Mar 3",
    tech: ["Next.js", "Framer Motion"],
    desc: "First personal portfolio. The Observatory hero debuted here.",
    lessons: "Atmosphere beats content. One bold phrase outperforms ten paragraphs.",
  },
  {
    id: "CIMS Dashboard", status: "completed", progress: 100, date: "Completed Apr 20",
    tech: ["React", "Recharts", "Tailwind"],
    desc: "Customer information management system. Introduced Lord of the Rings and Cradle Blade.",
    lessons: "Density with intention is beautiful. Data-heavy does not mean ugly.",
  },
  {
    id: "Finna Studio", status: "inprogress", progress: 35, date: "Due Jul 30",
    tech: ["React", "TypeScript", "Tailwind"],
    desc: "This app. Component archive, theme system, and project diary in one workspace.",
    lessons: "Phase 1 in progress -- architecture and theme system first, components after.",
  },
  {
    id: "Hotel Dashboard", status: "inprogress", progress: 20, date: "Due Aug 15",
    tech: ["React", "Recharts"], desc: "Competitive rate and occupancy dashboard.", lessons: "",
  },
  {
    id: "Shader Playground", status: "inprogress", progress: 40, date: "Due Sep 1",
    tech: ["WebGL", "Canvas 2D"], desc: "Interactive shader browser with tunable sliders.", lessons: "",
  },
  { id: "E-commerce Site", status: "todo", progress: 0, date: "Not started", tech: [], desc: "", lessons: "" },
  { id: "Mobile App", status: "todo", progress: 0, date: "Not started", tech: [], desc: "", lessons: "" },
  { id: "Portfolio v2", status: "todo", progress: 0, date: "Not started", tech: [], desc: "", lessons: "" },
  { id: "Vending Machine", status: "todo", progress: 0, date: "Not started", tech: [], desc: "", lessons: "" },
]

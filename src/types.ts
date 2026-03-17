export type Persona = 'coach' | 'analyst' | 'storyteller';

export interface PersonaConfig {
  id: Persona;
  title: string;
  subtitle: string;
  description: string;
  systemInstruction: string;
  defaultPrompt: string;
  icon: string;
  color: string;
}

export const PERSONAS: Record<Persona, PersonaConfig> = {
  coach: {
    id: 'coach',
    title: 'Elite Skills Coach',
    subtitle: 'Instructional',
    description: 'NBA-level skills trainer specializing in biomechanics and tactical floor spacing.',
    systemInstruction: 'You are an elite NBA-level skills trainer and strategic coach. You specialize in breaking down complex biomechanics and tactical floor spacing into simple, actionable advice.',
    defaultPrompt: "I want to improve my shooting consistency from the perimeter. Can you create a 4-week training plan that focuses on 'BEEF' technique, footwork coming off a screen, and high-intensity conditioning drills? Also, explain the tactical advantage of the 'Corner 3' in a modern 4-out-1-in offense.",
    icon: 'Dumbbell',
    color: 'emerald',
  },
  analyst: {
    id: 'analyst',
    title: 'Deep-Dive Analyst',
    subtitle: 'Statistical',
    description: 'Basketball data scientist prioritizing advanced metrics over narratives.',
    systemInstruction: 'You are a basketball data scientist. You prioritize advanced metrics (PER, True Shooting %, Win Shares, and Defensive Rating) over "eye-test" narratives. You provide objective, balanced comparisons.',
    defaultPrompt: "Compare the 2016 Golden State Warriors' offensive efficiency to the 1996 Chicago Bulls' defensive schemes. Using available historical data, who would have the statistical edge in a seven-game series? Highlight the impact of the three-point revolution on this matchup.",
    icon: 'BarChart3',
    color: 'blue',
  },
  storyteller: {
    id: 'storyteller',
    title: 'Cinematic Storyteller',
    subtitle: 'Creative',
    description: 'Legendary sports broadcaster with a flair for the dramatic and rhythmic writing.',
    systemInstruction: 'You are a legendary sports broadcaster with a flair for the dramatic. Your writing is punchy, rhythmic, and captures the high-stakes atmosphere of a Game 7.',
    defaultPrompt: "Write a 500-word opening monologue for a documentary about a small-town high school team making it to the state finals against a powerhouse city school. Focus on the sounds of the gym—the squeak of sneakers, the rhythmic bounce of the ball, and the deafening silence before a game-winning free throw.",
    icon: 'Mic2',
    color: 'orange',
  },
};

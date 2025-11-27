export const worksheets = [
  {
    type: 'worksheet',
    locale: 'en',
    title: 'Understanding Trauma Responses',
    description: 'Learn about Fight, Flight, Freeze, and Fawn responses',
    content: JSON.stringify({
      introduction: 'Trauma responses are automatic survival mechanisms...',
      sections: [
        {
          title: 'Fight Response',
          description: 'The fight response activates when...',
          questions: [
            'When do you notice yourself going into fight mode?',
            'What does your body feel like during fight?',
            'How has the fight response protected you?',
          ],
        },
        {
          title: 'Flight Response',
          description: 'The flight response shows up as...',
          questions: [
            'When do you feel the urge to flee or escape?',
            'What sensations accompany your flight response?',
            'What are your typical "escape routes"?',
          ],
        },
        // Continue for Freeze and Fawn
      ],
    }),
    category: 'understanding',
    tags: ['trauma', 'responses', 'fisher', 'foundational'],
    order: 1,
    isActive: true,
  },
  {
    type: 'worksheet',
    locale: 'en',
    title: 'Parts Mapping (IFS-Inspired)',
    description: 'Identify and understand your internal parts',
    content: JSON.stringify({
      introduction: 'Internal Family Systems (IFS) theory suggests...',
      instructions: [
        'Think of a recent triggering situation',
        'Notice what part of you responded',
        'Give that part a name',
        'Ask what it was trying to protect you from',
      ],
      prompts: [
        'What part of me showed up?',
        'How old does this part feel?',
        'What is this part trying to protect?',
        'What does this part need from me?',
        'How can I support this part?',
      ],
    }),
    category: 'understanding',
    tags: ['parts', 'ifs', 'self-awareness'],
    order: 2,
    isActive: true,
  },
  {
    type: 'worksheet',
    locale: 'en',
    title: 'Window of Tolerance',
    description: 'Map your nervous system states',
    content: JSON.stringify({
      introduction: 'The Window of Tolerance concept...',
      diagram: 'HYPERAROUSAL (fight/flight) → WINDOW OF TOLERANCE → HYPOAROUSAL (freeze/shutdown)',
      questions: [
        'What are signs you\'re in hyperarousal?',
        'What are signs you\'re in hypoarousal?',
        'What helps you return to your window?',
        'When is your window widest?',
        'When is your window narrowest?',
      ],
    }),
    category: 'understanding',
    tags: ['nervous-system', 'polyvagal', 'regulation'],
    order: 3,
    isActive: true,
  },
  {
    type: 'worksheet',
    locale: 'en',
    title: 'Trigger Identification',
    description: 'Identify patterns in your triggers',
    content: JSON.stringify({
      introduction: 'Triggers are sensory or emotional reminders...',
      categories: [
        'Sensory (sounds, smells, sights, tastes, textures)',
        'Situational (places, people, times of day)',
        'Emotional (feeling states)',
        'Relational (interpersonal dynamics)',
      ],
      prompts: [
        'What situations tend to trigger you?',
        'Are there patterns (time, place, people)?',
        'What early warning signs do you notice?',
        'What has helped you in the past?',
      ],
    }),
    category: 'coping',
    tags: ['triggers', 'awareness', 'patterns'],
    order: 4,
    isActive: true,
  },
];
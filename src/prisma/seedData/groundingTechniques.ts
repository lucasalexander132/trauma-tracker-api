export const groundingTechniques = [
  {
    type: 'technique',
    locale: 'en',
    title: '5-4-3-2-1 Grounding Technique',
    description: 'Use your senses to anchor to the present',
    content: JSON.stringify({
      introduction: 'This technique helps bring you back to the present moment...',
      steps: [
        {
          step: 1,
          instruction: 'Name 5 things you can see',
          guidance: 'Look around and name them out loud or in your mind',
        },
        {
          step: 2,
          instruction: 'Name 4 things you can touch',
          guidance: 'Feel the textures around you - your clothes, a chair, the ground',
        },
        {
          step: 3,
          instruction: 'Name 3 things you can hear',
          guidance: 'Listen carefully - distant sounds, nearby sounds, your breath',
        },
        {
          step: 4,
          instruction: 'Name 2 things you can smell',
          guidance: 'If you can\'t smell anything, name your favorite scents',
        },
        {
          step: 5,
          instruction: 'Name 1 thing you can taste',
          guidance: 'Or think of your favorite taste',
        },
      ],
      tips: [
        'Take your time with each sense',
        'It\'s okay if this is hard at first',
        'You can repeat this as many times as you need',
      ],
    }),
    category: 'grounding',
    tags: ['sensory', 'immediate', 'accessible'],
    order: 1,
    isActive: true,
  },
  {
    type: 'technique',
    locale: 'en',
    title: 'Box Breathing',
    description: 'Regulate your nervous system with breath',
    content: JSON.stringify({
      introduction: 'Box breathing (4-4-4-4) helps calm your nervous system...',
      pattern: [
        ['inhale', 4],
        ['hold', 4],
        ['exhale', 4],
        ['hold', 4]
      ],
      steps: [
        'Breathe in through your nose for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale slowly through your mouth for 4 counts',
        'Hold empty for 4 counts',
        'Repeat for 5-10 cycles',
      ],
      visualization: 'Imagine tracing the sides of a box as you breathe',
      tips: [
        'If 4 counts is too long, try 3',
        'Let your belly expand as you breathe',
        'This can be done anywhere, anytime',
      ],
    }),
    category: 'grounding',
    tags: ['breathing', 'regulation', 'accessible'],
    order: 2,
    isActive: true,
  },
  {
    type: 'technique',
    locale: 'en',
    title: 'Progressive Muscle Relaxation',
    description: 'Release tension from your body systematically',
    content: JSON.stringify({
      introduction: 'This technique helps release stored tension...',
      duration: '10-15 minutes',
      steps: [
        {
          area: 'Face',
          instruction: 'Scrunch your face, hold for 5 seconds, release',
        },
        {
          area: 'Shoulders',
          instruction: 'Raise shoulders to ears, hold, drop and release',
        },
        {
          area: 'Arms',
          instruction: 'Make fists, tense arms, hold, release',
        },
        {
          area: 'Chest',
          instruction: 'Take deep breath, hold, exhale slowly',
        },
        {
          area: 'Stomach',
          instruction: 'Tighten stomach muscles, hold, release',
        },
        {
          area: 'Legs',
          instruction: 'Tense legs and feet, hold, release',
        },
      ],
      tips: [
        'Find a comfortable place to sit or lie down',
        'Notice the difference between tension and relaxation',
        'Don\'t force anything - be gentle',
      ],
    }),
    category: 'grounding',
    tags: ['body', 'relaxation', 'somatic'],
    order: 3,
    isActive: true,
  },
  {
    type: 'technique',
    locale: 'en',
    title: 'Body Scan Meditation',
    description: 'Develop awareness of body sensations',
    content: JSON.stringify({
      introduction: 'Body scan helps you reconnect with physical sensations...',
      duration: '5-20 minutes',
      guidance: [
        'Find a comfortable position',
        'Close your eyes or soften your gaze',
        'Starting at your feet, notice any sensations',
        'Slowly move attention up through your body',
        'Don\'t try to change anything, just notice',
        'If you find tension, breathe into that area',
        'Complete at the top of your head',
      ],
      tips: [
        'There\'s no "right" way to feel',
        'Numbness or absence of sensation is valid',
        'You can stop anytime if it becomes overwhelming',
      ],
    }),
    category: 'grounding',
    tags: ['body', 'meditation', 'awareness'],
    order: 4,
    isActive: true,
  },
];
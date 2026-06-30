// Per-company theme objects. The deck has ONE identity (Heritage Broadsheet);
// a theme only swaps the accent + a structural flourish on the slide that
// discusses that brand. Gap is the default/global theme.

export const themes = {
  gap: {
    key: 'gap',
    name: 'Gap',
    accent: '#002A5F',
    accentDeep: '#001F47',
    onAccent: '#FFFFFF',
    paper: '#FAF8F3',
    ink: '#14110E',
    rule: '#D8D2C4',
    vibe: 'Heritage American · clean · confident',
  },
  zara: {
    key: 'zara',
    name: 'Zara',
    accent: '#000000',
    accentDeep: '#000000',
    onAccent: '#FFFFFF',
    paper: '#FBFBFA',
    ink: '#0A0A0A',
    rule: '#1A1A1A',
    vibe: 'Editorial · austere · gallery-white',
  },
  uniqlo: {
    key: 'uniqlo',
    name: 'Uniqlo',
    accent: '#FF0000',
    accentDeep: '#C8000A',
    onAccent: '#FFFFFF',
    paper: '#FAF8F3',
    ink: '#14110E',
    rule: '#E3B7B7',
    vibe: 'Functional · modular · precise',
  },
  nike: {
    key: 'nike',
    name: 'Nike',
    accent: '#111111',
    accentDeep: '#000000',
    onAccent: '#FFFFFF',
    volt: '#CEFF00',
    paper: '#F4F4F0',
    ink: '#111111',
    rule: '#C9C9BF',
    vibe: 'Bold · athletic · lifestyle',
  },
  harley: {
    key: 'harley',
    name: 'Harley-Davidson',
    accent: '#F47216',
    accentDeep: '#B5470A',
    onAccent: '#14110E',
    paper: '#F7F3EC',
    ink: '#1A1614',
    rule: '#D8C3A8',
    vibe: 'Rugged · communal · heritage-rebel',
  },
}

export const getTheme = (key) => themes[key] || themes.gap

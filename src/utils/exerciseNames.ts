import type { Lang } from '../i18n';

/**
 * Display-time translation for built-in exercise names and body parts.
 * DB always stores the English canonical name; this map is used only for rendering.
 */

const exerciseNameMap: Record<string, string> = {
  'Barbell Squat':          '杠铃深蹲',
  'Barbell Bench Press':    '杠铃卧推',
  'Barbell Deadlift':       '杠铃硬拉',
  'Overhead Press':         '过头推举',
  'Barbell Row':            '杠铃划船',
  'Pull-Up':                '引体向上',
  'Dumbbell Curl':          '哑铃弯举',
  'Dumbbell Lateral Raise': '哑铃侧平举',
  'Leg Press':              '腿举',
  'Lat Pulldown':           '高位下拉',
  'Cable Fly':              '龙门架夹胸',
  'Tricep Pushdown':        '三头肌下压',
  'Romanian Deadlift':      '罗马尼亚硬拉',
  'Bulgarian Split Squat':  '保加利亚分腿蹲',
  'Plank':                  '平板支撑',
  'Running':                '跑步',
  'Cycling':                '骑行',
  'Rowing':                 '划船机',
  'Cardio':                 '有氧',
  'Skill / Sport':          '技能 / 运动',
};

const bodyPartMap: Record<string, string> = {
  'Legs':       '腿部',
  'Chest':      '胸部',
  'Back':       '背部',
  'Shoulders':  '肩部',
  'Arms':       '手臂',
  'Core':       '核心',
  'Cardio':     '有氧',
};

const equipmentMap: Record<string, string> = {
  'Barbell':    '杠铃',
  'Dumbbell':   '哑铃',
  'Machine':    '器械',
  'Cable':      '绳索',
  'Bodyweight': '自重',
  'None':       '无',
};

/** Translate an exercise name for display. Custom exercises stay as-is. */
export function tExercise(name: string, lang: Lang): string {
  if (lang === 'en') return name;
  return exerciseNameMap[name] ?? name;
}

/** Translate a body part for display. */
export function tBodyPart(name: string, lang: Lang): string {
  if (lang === 'en') return name;
  return bodyPartMap[name] ?? name;
}

/** Translate equipment for display. */
export function tEquipment(name: string, lang: Lang): string {
  if (lang === 'en') return name;
  return equipmentMap[name] ?? name;
}

/**
 * Filter helper: returns true if the exercise name (in either language) matches the filter.
 */
export function exerciseMatchesFilter(name: string, filter: string): boolean {
  const lower = filter.toLowerCase();
  if (name.toLowerCase().includes(lower)) return true;
  const zh = exerciseNameMap[name];
  if (zh && zh.includes(filter)) return true;
  return false;
}

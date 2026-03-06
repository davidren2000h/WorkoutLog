import Dexie, { type Table } from 'dexie';
import type {
  Session,
  Activity,
  StrengthSet,
  CardioEntry,
  SkillEntry,
  ExerciseReference,
  WorkoutTemplate,
  UserProfile,
} from '../types';

class WorkoutDB extends Dexie {
  sessions!: Table<Session, number>;
  activities!: Table<Activity, number>;
  strengthSets!: Table<StrengthSet, number>;
  cardioEntries!: Table<CardioEntry, number>;
  skillEntries!: Table<SkillEntry, number>;
  exercises!: Table<ExerciseReference, number>;
  templates!: Table<WorkoutTemplate, number>;
  userProfiles!: Table<UserProfile, number>;

  constructor() {
    super('WorkoutLogDB');

    this.version(1).stores({
      sessions: '++id, date, startTime, templateId',
      activities: '++id, sessionId, type, title',
      strengthSets: '++id, activityId, setIndex',
      cardioEntries: '++id, activityId',
      skillEntries: '++id, activityId',
      exercises: '++id, name, bodyPart, equipment, isCustom',
      templates: '++id, name',
    });

    this.version(2).stores({
      sessions: '++id, date, startTime, templateId',
      activities: '++id, sessionId, type, title',
      strengthSets: '++id, activityId, setIndex',
      cardioEntries: '++id, activityId',
      skillEntries: '++id, activityId',
      exercises: '++id, name, bodyPart, equipment, isCustom',
      templates: '++id, name',
      userProfiles: '++id, name',
    });
  }
}

export const db = new WorkoutDB();

/* ── Seed default exercises on first load ── */
const DEFAULT_EXERCISES: Omit<ExerciseReference, 'id'>[] = [
  { name: 'Barbell Squat', bodyPart: 'Legs', equipment: 'Barbell', isCustom: false },
  { name: 'Barbell Bench Press', bodyPart: 'Chest', equipment: 'Barbell', isCustom: false },
  { name: 'Barbell Deadlift', bodyPart: 'Back', equipment: 'Barbell', isCustom: false },
  { name: 'Overhead Press', bodyPart: 'Shoulders', equipment: 'Barbell', isCustom: false },
  { name: 'Barbell Row', bodyPart: 'Back', equipment: 'Barbell', isCustom: false },
  { name: 'Pull-Up', bodyPart: 'Back', equipment: 'Bodyweight', isCustom: false },
  { name: 'Dumbbell Curl', bodyPart: 'Arms', equipment: 'Dumbbell', isCustom: false },
  { name: 'Dumbbell Lateral Raise', bodyPart: 'Shoulders', equipment: 'Dumbbell', isCustom: false },
  { name: 'Leg Press', bodyPart: 'Legs', equipment: 'Machine', isCustom: false },
  { name: 'Lat Pulldown', bodyPart: 'Back', equipment: 'Cable', isCustom: false },
  { name: 'Cable Fly', bodyPart: 'Chest', equipment: 'Cable', isCustom: false },
  { name: 'Tricep Pushdown', bodyPart: 'Arms', equipment: 'Cable', isCustom: false },
  { name: 'Romanian Deadlift', bodyPart: 'Legs', equipment: 'Barbell', isCustom: false },
  { name: 'Bulgarian Split Squat', bodyPart: 'Legs', equipment: 'Dumbbell', isCustom: false },
  { name: 'Plank', bodyPart: 'Core', equipment: 'Bodyweight', isCustom: false },
  { name: 'Running', bodyPart: 'Cardio', equipment: 'None', isCustom: false },
  { name: 'Cycling', bodyPart: 'Cardio', equipment: 'None', isCustom: false },
  { name: 'Rowing', bodyPart: 'Cardio', equipment: 'Machine', isCustom: false },
];

export async function seedExercisesIfEmpty() {
  const count = await db.exercises.count();
  if (count === 0) {
    await db.exercises.bulkAdd(DEFAULT_EXERCISES);
  }
}

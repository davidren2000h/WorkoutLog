import { useState, useEffect } from 'react';
import type { ExerciseReference, ActivityType } from '../types';
import { getAllExercises, addExercise } from '../db/operations';
import { useT } from '../i18n';

interface Props {
  onSelect: (type: ActivityType, title: string) => void;
  onClose: () => void;
}

export default function ExercisePicker({ onSelect, onClose }: Props) {
  const t = useT();
  const [exercises, setExercises] = useState<ExerciseReference[]>([]);
  const [filter, setFilter] = useState('');
  const [mode, setMode] = useState<'pick' | 'custom'>('pick');
  const [customName, setCustomName] = useState('');
  const [customType, setCustomType] = useState<ActivityType>('Strength');

  useEffect(() => {
    getAllExercises().then(setExercises);
  }, []);

  const filtered = exercises.filter((e) =>
    e.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleCustom = async () => {
    if (!customName.trim()) return;
    await addExercise({
      name: customName.trim(),
      bodyPart: '',
      equipment: '',
      isCustom: true,
    });
    onSelect(customType, customName.trim());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{t('picker.title')}</h2>

        {mode === 'pick' ? (
          <>
            <input
              className="input mb-8"
              placeholder={t('picker.search')}
              autoFocus
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {filtered.map((ex) => (
                <button
                  key={ex.id}
                  className="btn btn-ghost btn-block"
                  style={{ justifyContent: 'flex-start', padding: '10px 8px' }}
                  onClick={() => onSelect('Strength', ex.name)}
                >
                  <span>{ex.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
                    {ex.bodyPart}
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="empty-state" style={{ padding: 20 }}>
                  {t('picker.noMatch')}
                </div>
              )}
            </div>
            <div className="mt-16 flex-gap">
              <button className="btn btn-ghost btn-sm" onClick={() => setMode('custom')}>
                {t('picker.custom')}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => onSelect('Cardio', 'Cardio')}>
                {t('picker.cardio')}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => onSelect('Skill', 'Skill / Sport')}>
                {t('picker.skill')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="input-group">
              <label>{t('picker.exerciseName')}</label>
              <input
                className="input"
                autoFocus
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>{t('picker.type')}</label>
              <select
                className="input"
                value={customType}
                onChange={(e) => setCustomType(e.target.value as ActivityType)}
              >
                <option value="Strength">{t('type.Strength')}</option>
                <option value="Cardio">{t('type.Cardio')}</option>
                <option value="Skill">{t('type.Skill')}</option>
              </select>
            </div>
            <div className="flex-gap mt-8">
              <button className="btn btn-primary" onClick={handleCustom}>
                {t('picker.add')}
              </button>
              <button className="btn btn-ghost" onClick={() => setMode('pick')}>
                {t('picker.back')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

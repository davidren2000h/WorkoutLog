import { useState } from 'react';
import { createProfile } from '../db/operations';
import { seedExercisesIfEmpty } from '../db/database';
import { useT } from '../i18n';

interface Props {
  onCreated: () => void;
}

export default function WelcomePage({ onCreated }: Props) {
  const t = useT();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    await createProfile(trimmed);
    await seedExercisesIfEmpty();
    onCreated();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 24,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          border: '1px solid var(--border)',
        }}
      >
        <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--primary)' }}>W</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
        {t('welcome.title')}
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 32,
          lineHeight: 1.5,
        }}
      >
        {t('welcome.subtitle')}
        <br />
        {t('welcome.cta')}
      </p>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div className="input-group">
          <label>{t('welcome.nameLabel')}</label>
          <input
            className="input"
            type="text"
            autoFocus
            placeholder={t('welcome.namePlaceholder')}
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!name.trim() || saving}
          style={{ marginTop: 12, padding: 14 }}
        >
          {saving ? t('welcome.creating') : t('welcome.submit')}
        </button>
      </form>

      <p
        style={{
          marginTop: 40,
          fontSize: 11,
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        {t('welcome.privacy')}
      </p>
    </div>
  );
}

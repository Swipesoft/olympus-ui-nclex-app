export const questionTypes = [
    { id: 'MCQ', label: 'Multiple Choice', description: 'Traditional single-select questions', disabled: false },
    { id: 'SATA', label: 'SATA', description: 'Select All That Apply questions' , disabled: false },
    { id: 'priority&delegation', label: 'Priority & Delegation', description: 'Leadership and management scenarios', disabled: false },
    { id: 'NGN', label: 'NGN (coming soon)', description: 'Next Generation NCLEX format questions', disabled: true }
]


export const subjectAreas = [
    'Fundamentals', 'Pharmacology', 'Mental Health', 'Medical-Surgical',
    'Maternal-Newborn', 'Pediatrics', 'Community Health', 'Leadership'
]

export const nclexCategories = [
    'Safe and Effective Care Environment',
    'Health Promotion and Maintenance',
    'Psychosocial Integrity',
    'Physiological Integrity'
]

export const difficultyPresets = [
    { label: 'Quick Review', questions: 10 },
    { label: 'Standard Practice', questions: 25 },
    { label: 'Full Session', questions: 50 },
    { label: 'Comprehensive', questions: 75 }
]


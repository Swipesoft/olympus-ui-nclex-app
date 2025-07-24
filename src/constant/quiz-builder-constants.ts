export const questionTypes = [
    { id: 'MCQ', label: 'Multiple Choice', description: 'Traditional single-select questions' },
    { id: 'SATA', label: 'SATA', description: 'Select All That Apply questions' },
    { id: 'priority&delegation', label: 'Priority & Delegation', description: 'Leadership and management scenarios' },
    { id: 'NGN', label: 'NGN', description: 'Next Generation NCLEX format questions' }
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


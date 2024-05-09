export const BGCOLOR_CONFIG = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
];

export const BORDERCOLOR_CONFIG = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
];

export const INIT_STATS = {
    date: null,
    age: null,
    weight: null,
    body_fat: null,
    height: null,
    neck: null,
    chest: null,
    belly: null,
    butt: null,
    left_arm: null,
    right_arm: null,
    left_forearm: null,
    right_forearm: null,
    left_leg: null,
    right_leg: null
}

export const PRIMARY_MUSCLES = {
    "chest": [{ displayName: "Upper (clavicular head)" }, { displayName: "Mid (Sternocostal head)" }, { displayName: "Lower (Abdominal head)" }],
    "back": [{ displayName: "Trapeszius" }, { displayName: "Rhomboids" }, { displayName: "Latissimus dorsi" }, { displayName: "Eretor spinae" }],
    "legs": [{ displayName: "Glutes medius" }, { displayName: "Gluteus maximus" }, { displayName: "Quads" }, { displayName: "Hamstrings" }, { displayName: 'Calves' }],
    "arms": [{ displayName: "Tricep Lateral head" }, { displayName: "Tricep Long head" }, { displayName: "Tricep Medial" }, { displayName: "Bicep Long" }, { displayName: "Bicep Short" }, { displayName: "Brachialis" }, { displayName: "Prone Forearm" }, { displayName: "Supinated Forearm" }],
    "core": [{ displayName: "Upper" }, { displayName: "Lower" }, { displayName: "Obliques" }],
    "delts": [{ displayName: "Anterior" }, { displayName: "Posterior" }, { displayName: "Medial" }]
}

export const MUSCLE_GROUPS = [
    { displayName: "Chest" },
    { displayName: "Back" },
    { displayName: "Legs" },
    { displayName: "Arms" },
    { displayName: "Core" },
    { displayName: "Delts" }
]


export const MUSCLE_GROUP_LABELS = ["Delts", "Chest", "Back", "Arms", "Core", "Legs"]

export const PIE_DATA_LABEL = 'Muscle Group Distribution';


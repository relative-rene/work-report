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
    "chest": ["Upper (clavicular head)", "Mid (Sternocostal head)", "Lower (Abdominal head)"],
    "back": ["Trapeszius", "Rhomboids", "Latissimus dorsi", "Eretor spinae"],
    "legs": ["Glutes medius", "Gluteus maximus", "Quads", "Hamstrings", 'Calves'],
    "arms": ["Tricep Lateral head", "Tricep Long head", "Tricep Medial", "Bicep Long", "Bicep Short", "Brachialis", "Prone Forearm", "Supinated Forearm"],
    "core": ["Upper", "Lower", "Obliques"],
    "delts": ["Anterior", "Posterior", "Medial"]
}

export const MUSCLE_GROUPS = [
     "Chest",
     "Back" ,
     "Legs" ,
     "Arms" ,
     "Core" ,
     "Delts" 
]


export const MUSCLE_GROUP_LABELS = ["Delts", "Chest", "Back", "Arms", "Core", "Legs"]

export const PIE_DATA_LABEL = 'Muscle Group Distribution';

export const SETS_KEY_LABELS = {
    date_and_time: "Date",
    exercise_name: "Exercise",
    set_weight: "Set Weight",
    total_reps: "Total Reps",
    left_reps: "Left Reps",
    right_reps: "Right Reps"
}


export const STATS_KEY_LABELS = {
    age: "Age",
    weight: "Weight",
    height: "Height",
    chest: "Chest",
    left_leg: "Left Leg",
    right_leg: "Right Leg",
    left_forearm: "Left Forearm",
    right_forearm: "Right Forearm",
    left_arm: "Left Arm",
    right_arm: "Right Arm",
    butt: "Butt",
    belly: "Belly",
    neck: "Neck",
    body_fat: "Body Fat",
    date: "Date"
}

export const EXERCISE_KEY_LABELS = {
    name: "Exercise",
    balance: "Balance",
    muscle_group: "Muscle Group",
    primary_muscle: "Primary Muscle"
}
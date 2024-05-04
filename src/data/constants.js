
export const MUSCLE_GROUPS = [
    { displayName: "Chest" },
    { displayName: "Back" },
    { displayName: "Legs" },
    { displayName: "Arms" },
    { displayName: "Core" },
    { displayName: "Delts" }
]
export const PRIMARY_MUSCLES = {
    "chest": [{ displayName: "Upper (clavicular head)" }, { displayName: "Mid (Sternocostal head)" }, { displayName: "Lower (Abdominal head)" }],
    "back": [{ displayName: "Trapeszius" }, { displayName: "Rhomboids" }, { displayName: "Latissimus dorsi" }, { displayName: "Eretor spinae" }],
    "legs": [{ displayName: "Glutes medius" }, { displayName: "Gluteus maximus" }, { displayName: "Quads" }, { displayName: "Hamstrings" }, { displayName: 'Calves' }],
    "arms": [{ displayName: "Tricep Lateral head" }, { displayName: "Tricep Long head" }, { displayName: "Tricep Medial" }, { displayName: "Bicep Long" }, { displayName: "Bicep Short" }, { displayName: "Brachialis" }, { displayName: "Prone Forearm" }, { displayName: "Supinated Forearm" }],
    "core": [{ displayName: "Upper" }, { displayName: "Lower" }, { displayName: "Obliques" }],
    "delts": [{ displayName: "Anterior" }, { displayName: "Posterior" }, { displayName: "Medial" }]
}

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